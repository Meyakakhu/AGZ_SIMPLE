        var version = "0.0.35";

        
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
        var mess_inp = null;
        function loadscript(){
            var settings_menu = document.getElementsByClassName("right--Z4dKWq")[0];
            mess_inp = document.getElementById("message-input");
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
            create_emojies();
                
            chat = document.getElementsByClassName("chat--111wNM")[0];

            generate_message("Скрипт версии <b>"+version+"</b> был успешно загружен.");
        }

        function scan_users() {
            var groups = [];
            var counts = [];
            if(document.getElementById("currentSlideText")!=null){
             element = document.getElementById("currentSlideText");
             element.parentNode.removeChild(element);
            }
                
            var elements = document.getElementsByClassName("userNameMain--2fo2zM");
            var group_list = document.getElementsByClassName("userListColumn--6vKQL")[0];
            for (var i = 0; i < elements.length; i++) {
                var text = elements[i].getElementsByTagName("span")[0].innerText; 

                var regex = /(\S*)-(\S*)_(\S*) (\S*)/gi;
                match = regex.exec(text);
                if(match!=null){
                    elements[i].getElementsByTagName("span")[0].innerHTML = "<b>"+match[1]+"-"+match[2]+"</b> "+match[3]+" "+match[4];
                }

                if(match!=null){
                    var gr_type = match[1];
                    var gr_name = match[2].toLowerCase();
                    gr_name.replace("a","а").replace("v","в")

                    var group = gr_type+"-"+gr_name
                    
                    groups.push(group);
                    var count = 0;
                    for(var j = 0; j<groups.length; j++){
                        if(groups[j]==group){
                            if(counts[j]!=null) {counts[j] = counts[j]+1;console.log("count: "+counts[j]);} else {counts[j] = 1;console.log("count1: "+counts[j]);}
                            count = counts[j];
                            console.log("count2:"+count);
                        }
                    }
                    if(document.getElementById(group)==null){
                        var group_text = document.createElement("div");
                        group_text.id = group;
                        group_text.classList.add("group_name");
                        group_text.innerText = group+" - "+count;
                        group_list.appendChild(group_text);
                    } else {
                        var group_text = document.getElementById(group);
                        group_text.innerText = group+" - "+count;
                    }
                }

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
            style.innerText = style.innerText + ".simple_record_button {transition:0.3s;width: 40px;height: 40px;background: #fff;border-radius: 100%;border: 12px solid #f00;}.simple_record_button:hover{transition:0.3s;border: 6px solid #f00;}";
            style.innerText = style.innerText + ".simple_stop_record_button {transition:0.3s;width: 40px;height: 40px;background: #fff;border-radius: 4px;border: 12px solid #f00;}.simple_stop_record_button:hover{transition:0.3s;border: 6px solid #f00;}";
            style.innerText = style.innerText + ".simple_download_record_button {padding-top: 5px;transition:0.3s;width: 40px;height: 40px;background: rgba(160,30,30);border-radius: 4px;border-bottom-left-radius: 50%;border-bottom-right-radius: 50%;align-items: center;text-align: center;text-align-last: center;color: #fff;}.simple_download_record_button:hover{padding-top: 8px;transition:0.3s;background:rgba(141,49,49);}";
            style.innerText = style.innerText + "span{text-transform: capitalize;}a{text-decoration:none;}";
            style.innerText = style.innerText + ".group_name{padding:5px; color: #ddd;}";
            style.innerText = style.innerText + ".group_name{padding:5px; color: #ddd;}";
            style.innerText = style.innerText + ".emoji_list{color: #fff;padding:20px;background: rgba(0,0,0,0.7); border-radius: 10px;text-align: center;font-family: 'Consolas';font-size: 20px;height: 220px;overflow: auto;position:absolute;top:-250px;z-index:99;margin:20px;}";
            style.innerText = style.innerText + ".emoji{font-size: 21px;padding:3px;}div#emojies_full_list {display: flex;flex-wrap: wrap;justify-content: space-between;align-content: space-around;align-items: center;}";
            
            
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
            download_record.innerText = "🡻";
                
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

        function create_emojies(){
            var buttons = document.getElementsByClassName("wrapper--ZhSWmd")[0];
            var emoji_button = document.createElement("div");
            emoji_button.innerText = "o_o";
            emoji_button.id = "emoji_button_open";
            emoji_button.classList.add("emoji_button_open");
            buttons.appendChild(emoji_button);

            var emoji_panel = document.createElement("div");
            emoji_panel.classList.add("emoji_list");
            emoji_panel.innerHTML = "Выберите ниже <div id=\"emojies_full_list\"></div>";
            buttons.appendChild(emoji_panel);
            load_emojies();
        }
        
        async function load_emojies(){
            var id = document.getElementById("emojies_full_list");

            for(var i=128511;i<=128591;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=127744;i<=127776;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=127789;i<=127891;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=127903;i<=127955;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=127968;i<=127984;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=128000;i<=128317;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=128331;i<=128359;i++){
              if(i!=128335){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
              }
            }
            for(var i=128507;i<=128510;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=128640;i<=128709;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=128756;i<=128764;i++){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
            }
            for(var i=129292;i<=129535;i++){
              if(i!=129350){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
              
              }
            }
            for(var i=129648;i<=129670;i++){
              if((i<129653 || i>129655) && (i<129661 || i>129663)){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
              }
            }
            for(var i=129680;i<=129782;i++){
              if((i<129709 || i>129711) && (i<129723 || i>129727) && (i<129734 || i>129743) && (i<129754 || i>129759) && (i<129768 || i>129775)){
              var emoji = document.createElement("div");
              emoji.classList.add("emoji")
              emoji.innerHTML = "&#"+i+";";
              emoji.onclick = function(){
                add_emoji(this);
              }
              id.appendChild(emoji);
              }
            }
            
                                
        }

        function add_emoji(docum){
            navigator.clipboard.WriteText(docum.innerText);
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
                
            var message = document.createElement("div");
            message.innerHTML = '<div class="item--ZfUxvS"><div class="item--ZfUxvS"><div class="wrapper--1nuR8g"><div class="avatarWrapper--22Egh5"><div aria-hidden="true" data-test="userAvatar" class="avatar--Z2lyL8K avatar--Z20xpIn" style="border-radius: 10%;background-color: rgb(145, 49, 49); color: rgb(255,255,255);"><div class=""></div><div class="content--6H8et">sys</div></div></div><div class="content--BYIui"><div class="meta--ZfU5fg"><div class="name--ZfTXko"><span>Система</span></div><time class="time--ZfT9e6"></time></div><div class="messages--ZTkmon"><p class="message--CeFIW" data-test="chatUserMessageText">'+text+'</p></div></div></div></div></div>';
            chat.appendChild(message);
    }