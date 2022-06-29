
        console.log("version: 0.0.8");
        var loaded = false;
        scan_users();
        setInterval(function () {
            scan_users();
        }, 10000);
        setTimeout(function () {
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
            add_record_button()
        }, 1000);

        function scan_users() {
            var elements = document.getElementsByClassName("userNameMain--2fo2zM");
            for (var i = 0; i < elements.length; i++) {
                var text = elements[i].getElementsByTagName("span")[0].innerText;
                if (text.includes("Дмитрий Поляков")) {
                    elements[i].getElementsByTagName("span")[0].innerText = "👑 Димитрий ";
                }
                if (text.includes("Коvпак Илья")) {
                    elements[i].getElementsByTagName("span")[0].innerText = "🦠 Илюшка ";
                }
                if (text.includes("Павлов Алексей")) {
                    elements[i].getElementsByTagName("span")[0].innerText = "🦠 Лешка ";
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
            style.innerText = style.innerText + ".simple_record_button {transition:0.3s;width: 40px;height: 40px;background: #f00;border-radius: 100%;border: 12px solid #fff;}.simple_record_button:hover{transition:0.3s;border: 6px solid #fff;}";
            style.innerText = style.innerText + ".simple_stop_record_button {transition:0.3s;width: 40px;height: 40px;background: #f00;border-radius: 4px;border: 12px solid #fff;}.simple_stop_record_button:hover{transition:0.3s;border: 6px solid #fff;}";
            
            head.appendChild(style);
        }

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
            screen_recorder.id = "simple_display_recorder";
            screen_recorder.autoplay = true;
            settings.appendChild(screen_recorder);
            settings.appendChild(title);
            settings.appendChild(made);
            content.appendChild(settings);
            var wrapper = document.getElementsByClassName("main--Z1w6YvE")[0];
            wrapper.appendChild(content);
        }
        let recorder, stream;
        const video = document.getElementById("simple_display_recorder");
        var stop = null;
        var start = null;

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
         buttons_panel.appendChild(record);
         buttons_panel.appendChild(stop_record);     
        }

        async function startRecording() {
                stream = await navigator.mediaDevices.getDisplayMedia({
                        audio:true,
                        video: { mediaSource: "screen" }
                });
        recorder = new MediaRecorder(stream);

        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = e => {
                 const completeBlob = new Blob(chunks, { type: chunks[0].type });
                 video.src = URL.createObjectURL(completeBlob);
        };

        recorder.start();
        }
