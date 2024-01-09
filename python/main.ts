

//% color="#1296db" iconWidth=50 iconHeight=40
namespace pyFlaskWeb{


    //% block="初始化Flask" blockType="command"
    export function flask_init(parameter: any, block: any) {
        Generator.addImport(`from flask import Flask,Response,render_template,request\nflask_app = Flask(__name__)`)
 
    }

    //% block="启动Flask服务器 端口[PORT]" blockType="command"
    //% PORT.shadow="number" PORT.defl="8000"
    export function flask_run(parameter: any, block: any) {
        let port=parameter.PORT.code;
        Generator.addCode(`flask_app.run(host='0.0.0.0', port=${port}, threaded=True)`)
 
    }


    //% block="增加一个网页路由 标签[URL] 执行函数[FUNC] 方法[GP]" blockType="command"
    //% URL.shadow="normal" URL.defl="index"
    //% FUNC.shadow="normal" FUNC.defl="route_func"
    //% GP.shadow="dropdown" GP.options="GP"
    export function add_route(parameter: any, block: any) {
        let url=parameter.URL.code;
        let func=parameter.FUNC.code;
        let gp=parameter.GP.code;
        let url_route='/';
        if(url.length>0){//兼容/开头和非/开头的标签
            if(url[0]!='/'){
                url_route='/'+url
            }else{
                url_route=url
            }
        }
        let url_funcname = url.replace(/\//g,"_")//将/替代为_，兼容多级/标签
        //console.log(`url_funcname=${url_funcname}`)
        //console.log(`url_route=${url_route}`)
        Generator.addInit(`add_route_${url}`,`@flask_app.route('${url_route}',methods=${gp})
def route_${url_funcname}():
    return rec_${func}()`)
    
    }




    //% block="执行函数[FUNC]" blockType="hat"
    //% FUNC.shadow="normal" FUNC.defl="route_func"
    export function add_route_fun(parameter: any, block: any) {
        let func=parameter.FUNC.code;
        Generator.addEvent(`add_route_${func}`,`rec_${func}`,``)
    
    }
    //% block="返回数据[FUNC]" blockType="command"
    //% FUNC.shadow="string" FUNC.defl="route_func"
    export function add_route_fn(parameter: any, block: any) {
        let func=parameter.FUNC.code;
        Generator.addCode(`return ${func}`)
    
    }






    //% block="返回网页文件[HTML].html" blockType="command"
    //% HTML.shadow="normal" HTML.defl="index"
    export function add_route_html(parameter: any, block: any) {
        let html=parameter.HTML.code;
        Generator.addCode(`return render_template("${html}.html")`)
    
    }

    //% block="获取网络请求[REQ]" blockType="reporter"
    //% REQ.shadow="dropdown" REQ.options="REQ"
    export function get_request(parameter: any, block: any) {
        let req=parameter.REQ.code;
        Generator.addCode(`request.${req}`)
    
    }

   //% block="---"
   export function noteSep() {

}

    //% block="新建一个网页对象[DOC] 页面标题[TXT] [ALIGN]" blockType="command"
    //% DOC.shadow="normal" DOC.defl="doc"
    //% TXT.shadow="string" TXT.defl="我的第一个网页"
    //% ALIGN.shadow="dropdown" ALIGN.options="ALIGN"
    export function html_init(parameter: any, block: any) {
        let doc=parameter.DOC.code;
        let title=parameter.TXT.code;
        let align=parameter.ALIGN.code;
        align=align.replace(/"/g,"")
        Generator.addImport(`import dominate\nfrom dominate.tags import *`)
        Generator.addCode(`${doc} = dominate.document(title=${title})`)
        Generator.addCode(`${doc}.body['style']="text-align:${align};"`)
        Generator.addDeclaration("ls","sc=''")
        Generator.addCode(`with ${doc}.head:
    script(sc)
        `)
    
    }
  

    //% block="开始给网页对象[DOC]中添加内容：" blockType="command"
    //% DOC.shadow="normal" DOC.defl="doc"
    export function html_doc_with(parameter: any, block: any) {
        let doc=parameter.DOC.code;
        Generator.addCode(`with ${doc}:`)
    
    }
    //% block="|- 添加[TITLETYPE] [TXT] [ALIGN][COLOR]" blockType="command"
    //% TXT.shadow="string" TXT.defl="标题文字"
    //% TITLETYPE.shadow="dropdown" TITLETYPE.options="TITLETYPE"
    //% ALIGN.shadow="dropdown" ALIGN.options="ALIGN"
    //% COLOR.shadow="colorPalette" 
    export function html_add_title(parameter: any, block: any) {
        let type=parameter.TITLETYPE.code;
        let txt=parameter.TXT.code;
        let align=parameter.ALIGN.code;
        let color=parameter.COLOR.code;
        align=align.replace(/"/g,"")
        color=color.replace(/"/g,"")
        color=color.replace("0x","#")
        type=type.replace(/"/g,"")
        Generator.addCode(`    ${type}(${txt})['style']="text-align:${align};color:${color}"`)
    
    }
    
    //% block="|- 添加正文[TXT]" blockType="command"
    //% TXT.shadow="string" TXT.defl="正文文字"
    export function html_add_p(parameter: any, block: any) {
        let txt=parameter.TXT.code;
        Generator.addCode(`    p(${txt})`)
    
    }
    //% block="|- 添加加粗文字[TXT]" blockType="command"
    //% TXT.shadow="string" TXT.defl="加粗文字"
    export function html_add_b(parameter: any, block: any) {
        let txt=parameter.TXT.code;
        Generator.addCode(`    b(${txt})`)
    
    }

    //% block="|- 添加[HB]" blockType="command"
    //% HB.shadow="dropdown" HB.options="HB"
    export function html_add_br(parameter: any, block: any) {
        let hb=parameter.HB.code;
        Generator.addCode(`    ${hb}()`)
    
    }

    //% block="|- 添加图片 路径/static/[TXT] 宽度[WIDTH]" blockType="command"
    //% TXT.shadow="normal" TXT.defl="img.png"
    //% WIDTH.shadow="number" WIDTH.defl="600"
    export function html_add_image(parameter: any, block: any) {
        let txt=parameter.TXT.code;
        let width=parameter.WIDTH.code;
        Generator.addCode(`    img(src="./static/${txt}",width="${width}" )`)

    }


    //% block="|- 添加视频 " blockType="command"
    export function html_add_input_video(parameter: any, block: any) {
        Generator.addCode(`    img(id="cam",src="{{url_for('route_video_feed')}}",alt="视频图像" ) `)
        Generator.addInit(`add_route_video_feed`,`@flask_app.route('/video_feed')
def route_video_feed():
    global video
    return Response(gen(video),
                    mimetype='multipart/x-mixed-replace; boundary=frame')`)
 
    }



    //% block="|- 添加链接[LINK] 文字[TXT] " blockType="command"
    //% LINK.shadow="string" LINK.defl="https://unihiker.com"
    //% TXT.shadow="string" TXT.defl="点击跳转"
    export function html_add_a(parameter: any, block: any) {
        let txt=parameter.TXT.code;
        let link=parameter.LINK.code;
        Generator.addCode(`    a(${txt},target="_blank",href=${link})`)
    
    }
    //% block="|- 添加按钮 文字[TXT] 字号[SIZE] 执行函数为[ID]" blockType="command"
    //% TXT.shadow="string" TXT.defl="A"
    //% ID.shadow="normal" ID.defl="route_func"
    //% SIZE.shadow="number" SIZE.defl="20"
    export function html_add_input(parameter: any, block: any) {
        let txt=parameter.TXT.code;
        let id=parameter.ID.code;
        let size=parameter.SIZE.code;
        Generator.addCode(`    input_(id="${id}", type="button", value=${txt}, style="font-size:${size}px", onclick="button_${id}_Click()")`)

        Generator.addDeclaration(`lsadd${id}`,`sc=sc+"function button_${id}_Click(){console.log('${id} click');let xhr = new XMLHttpRequest();xhr.open('post','/${id}');xhr.send('${id}');}"`)
    
        id=id.replace(/"/g,"")

        Generator.addInit(`add_route_${id}`,`@flask_app.route('/${id}',methods=["POST"])
def route_${id}():
    return rec_${id}()`)
    }



    //% block="将网页对象[DOC]生成html代码并保存为文件[FILE].html" blockType="command"
    //% DOC.shadow="normal" DOC.defl="doc"
    //% FILE.shadow="normal" FILE.defl="index"
    export function html_save_html(parameter: any, block: any) {
        let file=parameter.FILE.code;
        let doc=parameter.DOC.code;
        Generator.addImport(`import os`)
        Generator.addCode(`if not os.path.exists('./templates'):
    os.makedirs('./templates')`)
        Generator.addCode(`if not os.path.exists('./static'):
    os.makedirs('./static')`)

        Generator.addCode(`with open("./templates/${file}.html", "w", encoding="UTF8") as fileObj:
    fileObj.write(str(${doc}))`)
    
    }


    //% block="打开[ID]号摄像头，传输视频流数据" blockType="command"
    //% ID.shadow="number" ID.defl="0"
    export function open_carema(parameter: any, block: any) {
        let id=parameter.ID.code;
        Generator.addCode(`print("init camera")`)
        Generator.addImport(`import cv2`)
        Generator.addCode(`cap = cv2.VideoCapture(${id}) `)
        Generator.addCode(`cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)`)
        Generator.addCode(`cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)`)
        Generator.addCode(`cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)`)
        Generator.addCode(`while not cap.isOpened():
    continue `)         
        Generator.addCode(`print("cap opened")`)
        Generator.addCode(`video=None`)
        Generator.addCode(`def gen(video): 
    print("genvideo")
    while True:
        cv2.waitKey(10)
        success, image = cap.read()
        image = cv2.flip(image,-1) #旋转180°
        ret, jpeg = cv2.imencode('.jpg', image)
        frame = jpeg.tobytes()
        yield (b'--frame\\r\\n'
               b'Content-Type: image/jpeg\\r\\n\\r\\n' + frame + b'\\r\\n\\r\\nhello')
                   `)
    }


}
