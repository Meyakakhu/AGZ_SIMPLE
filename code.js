        var version = "0.0.29_7";

        
        console.log("version: "+version);
        var loaded = false;
        scan_users();
        setInterval(function () {
            scan_users();
        }, 10000);
        setTimeout(function () {
                var timeout = setInterval(function(){
                if(document.getElementsByClassName("right--DUFDc")[0]!=null){
                 clearInterval(timeout);
                 loadscript();
                }
                },1000)
                
        }, 5000);
        var chat = null;
        function loadscript(){
            var settings_menu = document.getElementsByClassName("right--Z4dKWq")[0];
            var simple_settings = document.createElement("div");
            simple_settings.id = "simple_settings_f23f23f";
            simple_settings.innerText = "⚙️";
            simple_settings.classList.add("simple_settings_button");
            simple_settings.onclick = function () {
                document.getElementById("simple_settings_content").classList.remove("hidden");
            }
            settings_menu.appendChild(simple_settings);
            load_css();
            create_settings_panel();
            add_record_button();
                
            chat = document.getElementsByClassName("ReactVirtualized__Grid__innerScrollContainer")[1];
            chat.style = "width: auto;  max-width: 362px;  overflow: hidden; pointer-events: none; position: relative;";
            generate_message("Скрипт версии <b>"+version+"</b>. Был успешно загружен.");
        }

        function scan_users() {
            if(document.getElementById("currentSlideText")!=null){
             element = document.getElementById("currentSlideText");
             element.parentNode.removeChild(element);
            }
                
            var elements = document.getElementsByClassName("userNameMain--2fo2zM");
            for (var i = 0; i < elements.length; i++) {
                var text = elements[i].getElementsByTagName("span")[0].innerText;
                if (text.includes("Дмитрий Поляков")) {
                    elements[i].getElementsByTagName("span")[0].innerText = "👑 ДимДимыч ";
                }
                if (text.includes("Коvпак Илья")) {
                    elements[i].getElementsByTagName("span")[0].innerText = "🦠 Илюшка ";
                }
                if (text.includes("20V") || text.includes("20v") || text.includes("20в") || text.includes("20В")) {
                    elements[i].getElementsByTagName("span")[0].innerText = "☭"+text;
                }

                var regex = /(\S*)-(\S*)_(\S*) (\S*)/gi;
                match = regex.exec(text);
                    
                var gr_type = match[1];
                var gr_name = match[2];
                var st_snam = match[3];
                var st_init = match[4];
                
                if(gr_name=="20v") {gr_name="20в";}
                if(gr_name=="20V") {gr_name="20в";}
                if(gr_name=="20а") {gr_name="20а";}
                if(gr_name=="20А") {gr_name="20а";}
                if(gr_name=="20В") {gr_name="20в";}
                if(gr_name=="20б") {gr_name="20б";}
                if(gr_name=="20Б") {gr_name="20б";}
                if(gr_name=="20Г") {gr_name="20г";}
                if(gr_name=="20г") {gr_name="20Г";}

            }
        }
        
        function load_css() {
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.innerText = style.innerText + ".simple_settings_button{transition: 0.2s;background: rgba(0,0,0,0);border-radius: 3px;cursor: pointer;}.simple_settings_button:hover{transition: 0.2s;background: rgba(0,0,0,0.3);}";
            style.innerText = style.innerText + ".hidden{visibility: hidden;}.simple_settings_content{backdrop-filter: blur(25px);position: absolute; width: 100%; height: 100%;z-index:99;display: flex;align-content: center;justify-content: center;align-items: center;}";
            style.innerText = style.innerText + ".content_settings_closer{background: rgba(151,49,49,0.5);padding: 20px;position:absolute;right:30px;top:30px;color:#fff;border-radius: 6px; cursor: pointer;}.content_settings_closer:hover{background: rgba(151,49,49,0.3);}";
            style.innerText = style.innerText + ".settings_panel {position:relative;width: 50%;height: 65%;background: #fff;border-radius: 42px;box-shadow: 0 2px 3px #ddd;font-family: 'Consolas', sans-serif;}";
            style.innerText = style.innerText + ".settings_title{width:100%;text-align: center; color:#000;font-size: 24px;padding-top:30px;padding-bottom:30px;}";
            style.innerText = style.innerText + ".made{position:absolute;bottom:20px;right:45px;color:#acb1b7;}";
            style.innerText = style.innerText + ".simple_record_button {transition:0.3s;width: 40px;height: 40px;background: #f00;border-radius: 100%;border: 12px solid #fff;}.simple_record_button:hover{transition:0.3s;border: 6px solid #fff;}";
            style.innerText = style.innerText + ".simple_stop_record_button {transition:0.3s;width: 40px;height: 40px;background: #f00;border-radius: 4px;border: 12px solid #fff;}.simple_stop_record_button:hover{transition:0.3s;border: 6px solid #fff;}";
            style.innerText = style.innerText + ".simple_download_record_button {transition:0.3s;width: 40px;height: 40px;background: #f00;border-radius: 4px;border: 12px solid #fff;}.simple_download_record_button:hover{transition:0.3s;border: 6px solid #fff;}";
            style.innerText = style.innerText + "span{position:relative !important;top: auto !important;}";
            
            head.appendChild(style);
        }
        let recorder, stream;
        var video = null;
        var stop = null;
        var start = null;
        var download = null;

        function create_settings_panel() {
            var content = document.createElement("div");
            content.id = "simple_settings_content";
            content.classList.add("simple_settings_content");
            content.classList.add("hidden");
            var c_bttn = document.createElement("div");
            c_bttn.id = "content_settings_closer";
            c_bttn.classList.add("content_settings_closer");
            c_bttn.innerText = "❌";
            c_bttn.onclick = function () {
                document.getElementById("simple_settings_content").classList.add("hidden");
            }
            content.appendChild(c_bttn);
            var settings = document.createElement("div");
            settings.id = "settings_panel";
            settings.classList.add("settings_panel");
            var title = document.createElement("div");
            title.innerText = "Дополнительные настройки";
            title.classList.add("settings_title");
            var made = document.createElement("div");
            made.innerText = "Made by Поляков Дмитрий";
            made.classList.add("made");
            var screen_recorder = document.createElement("video");
            video = screen_recorder;
            screen_recorder.id = "simple_display_recorder";
            screen_recorder.controls = true;
            screen_recorder.width = 800;
            screen_recorder.height = 400;
            settings.appendChild(screen_recorder);
            settings.appendChild(title);
            settings.appendChild(made);
            content.appendChild(settings);
            var wrapper = document.getElementsByClassName("main--Z1w6YvE")[0];
            wrapper.appendChild(content);
        }

        function add_record_button() {
            var buttons_panel = document.getElementsByClassName("right--DUFDc")[0];
            var record = document.createElement("div");
            start = record;
            record.id = "simple_record_button";
            record.classList.add("simple_record_button");
            record.onclick = function(){
                start.setAttribute("hidden", true);
                stop.removeAttribute("hidden");
                startRecording();    
            }
                
            var stop_record = document.createElement("div");
            stop = stop_record;
            stop_record.id = "simple_stop_record_button";
            stop_record.classList.add("simple_stop_record_button");
            stop_record.setAttribute("hidden",true);
            stop_record.onclick = function () {
                stop.setAttribute("hidden", true);
                start.removeAttribute("hidden");
                recorder.stop();
                stream.getVideoTracks()[0].stop();
            }
            var download_record = document.createElement("div");
            download_record.id = "simple_download_record_button";
            download_record.classList.add("simple_download_record_button");
                
            var url_down = document.createElement("a");
            url_down.href = "#";
            url_down.id = "download_record";
            url_down.appendChild(download_record);
            url_down.setAttribute("hidden",true);
            url_down.setAttribute("download",true);
            download = url_down;
          
         buttons_panel.appendChild(record);
         buttons_panel.appendChild(stop_record);   
         buttons_panel.appendChild(url_down);
        }

        async function startRecording() {
                document.getElementsByTagName("title")[0].innerText = "Лекция - Текущая вкладка";
                if(download!=null) {download.setAttribute("hidden",true)};
                stream = await navigator.mediaDevices.getDisplayMedia({
                        audio:true,
                        video: { mediaSource: "screen" }
                });
        const options = {
                audioBitsPerSecond : 128000,
                videoBitsPerSecond : 2500000,
                mimeType : 'video/webm',
                codecs : 'H264'
        }
               
        recorder = new MediaRecorder(stream,options);

        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = e => {
                 const completeBlob = new Blob(chunks, { type: chunks[0].type });
                 var url = URL.createObjectURL(completeBlob);
                 video.src = url;
                 download.href = url;
                 download.download = "lection.webm";
                 download.removeAttribute("hidden");
        };

        recorder.start();
        }

        
        function generate_message(text){
                
                var message = document.createElement("span");
                message.stlye = "height: 65px; left: 0px; position: absolute; top: 65px; width: 100%;";
                message.innerHTML = '<div class="item--ZfUxvS"><div class="item--ZfUxvS"><div class="wrapper--1nuR8g"><div class="avatarWrapper--22Egh5"><div aria-hidden="true" data-test="userAvatar" class="avatar--Z2lyL8K avatar--Z20xpIn" style="border-radius: 10%;background-color: rgb(145, 49, 49); color: rgb(255,255,255);"><div class=""></div><div class="content--6H8et">sys</div></div></div><div class="content--BYIui"><div class="meta--ZfU5fg"><div class="name--ZfTXko"><span>Система</span></div><time class="time--ZfT9e6"></time></div><div class="messages--ZTkmon"><p class="message--CeFIW" data-test="chatUserMessageText">'+text+'</p></div></div></div></div></div>';
                chat.appendChild(message);
        }
