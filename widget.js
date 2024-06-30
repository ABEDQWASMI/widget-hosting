(function() {
    const widgetHTML = `
        <div id="assistant-widget" style="display: none;">
            <section class="finlix-container">
                <h1 class="brand-name">Finlix</h1>
                <p class="powered-by">Powered by LeapTheLimit</p>
                <div class="shape-container">
                    <div class="shape"><div class="circle purple-circle" aria-hidden="true"></div></div>
                    <div class="shape"><div class="circle blue-circle" aria-hidden="true"></div></div>
                    <div class="shape"><div class="circle green-circle" aria-hidden="true"></div></div>
                    <div class="shape"><div class="circle gray-circle" aria-hidden="true"></div></div>
                </div>
                <h2 class="question-text">What do you know about <span style="color: rgba(195, 195, 195, 1)">Finance?</span></h2>
                <div class="icon-container">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5c24373f8dd5ef5131c67177bccdbef574bf3f9ed5118f4e197ea82589a22df?apiKey=6ff838e322054338a5da6863c2494c61&" alt="History Icon" class="icon" onclick="toggleHistory()" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/95dad8e994e6b876df822e962cfc87ce2b5a9d7d32d644beda1bacf1554332cc?apiKey=6ff838e322054338a5da6863c2494c61&" alt="Microphone Icon" class="icon-large" onclick="startListening()" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec3ad13fd252c5c0acb23d9fb00ecd75dab04844fe615a32906bc0f2ee5f0f79?apiKey=6ff838e322054338a5da6863c2494c61&" alt="Home Icon" class="icon-bordered" onclick="homePage()" />
                </div>
            </section>
            <div class="history-box" id="historyBox">
                <button class="close-button" onclick="toggleHistory()">Close</button>
                <div id="historyContent"></div>
            </div>
        </div>
    `;

    const widgetStyles = `
        #assistant-widget {
            width: 400px;
            height: 704px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            background-color: #000;
            color: lightgray;
            padding: 10px;
            box-sizing: border-box;
            border: 1px solid #333;
            border-radius: 10px;
            overflow: hidden;
            position: fixed;
            bottom: 120px;
            right: 20px;
            z-index: 9999;
        }
        #widget-icon {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 86px;
            height: 88px;
            cursor: pointer;
            z-index: 9999;
        }
        .finlix-container {
            border-radius: 25px;
            background-color: #000;
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
        }
        .brand-name {
            justify-content: center;
            border-radius: 18px;
            border: 1px solid #c736d9;
            background-color: rgba(199, 54, 217, 0);
            color: #fff;
            white-space: nowrap;
            padding: 8px 16px;
            font: 500 14px/140% Inter, sans-serif;
            margin-top: 10px;
        }
        .powered-by {
            color: #767676;
            margin-top: 10px;
            font: 300 12px/140% Inter, sans-serif;
        }
        .shape-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            position: relative;
            width: 100%;
            height: 300px;
        }
        .shape {
            position: absolute;
        }
        .circle {
            border-radius: 50%;
            position: absolute;
        }
        .purple-circle {
            background-color: #c736d9;
            width: 129px;
            height: 134px;
            left: calc(50% - 70px);
            top: calc(50% - 80px);
        }
        .blue-circle {
            background-color: #bcd8fa;
            width: 68px;
            height: 68px;
            left: calc(50% + 30px);
            top: calc(50% - 100px);
        }
        .green-circle {
            background-color: #9aed66;
            width: 90px;
            height: 86px;
            left: calc(50% + 40px);
            top: calc(50% + 20px);
        }
        .gray-circle {
            background-color: #d9d9d9;
            width: 61px;
            height: 58px;
            left: calc(50% - 110px);
            top: calc(50% + 40px);
        }
        .question-text {
            color: #c3c3c3;
            margin-top: 20px;
            font: 400 28px/36px Inter, sans-serif;
            text-align: center;
        }
        .icon-container {
            display: flex;
            margin-top: 20px;
            align-items: center;
            gap: 30px;
            justify-content: space-around;
            width: 100%;
            padding: 20px;
            position: absolute;
            bottom: 20px;
        }
        .icon {
            width: 45px;
            cursor: pointer;
        }
        .icon-large {
            width: 70px;
            cursor: pointer;
        }
        .icon-bordered {
            width: 45px;
            cursor: pointer;
            border-radius: 50%;
            border: 1px solid #6b6b6b;
        }
        .history-box {
            display: none;
            position: fixed;
            bottom: 10%;
            right: 10%;
            width: 300px;
            height: 400px;
            background-color: #333;
            color: white;
            padding: 20px;
            border-radius: 10px;
            overflow-y: auto;
        }
        .close-button {
            background-color: #c736d9;
            border: none;
            color: white;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
            float: right;
        }
        .history-entry {
            margin-bottom: 10px;
        }
    `;

    function loadHTML() {
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'assistant-widget';
        widgetContainer.innerHTML = widgetHTML;
        document.body.appendChild(widgetContainer);

        const widgetIcon = document.createElement('div');
        widgetIcon.id = 'widget-icon';
        widgetIcon.innerHTML = `
            <svg width="86" height="88" viewBox="0 0 86 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="43" cy="44" rx="43" ry="44" fill="black"/>
                <circle cx="32" cy="35" r="12" fill="#C736D9"/>
                <circle cx="56" cy="55" r="9" fill="#9AED66"/>
                <circle cx="37.5" cy="57.5" r="5.5" fill="#D9D9D9"/>
                <circle cx="53.5" cy="35.5" r="6.5" fill="#BCD8FA"/>
            </svg>
        `;
        widgetIcon.onclick = function() {
            toggleWidget();
        };
        document.body.appendChild(widgetIcon);
    }

    function loadStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = widgetStyles;
        document.head.appendChild(styleSheet);
    }

    function initWidget() {
        loadHTML();
        loadStyles();

        const serverUrl = 'https://leapthelimit-mz4r7ctc7q-zf.a.run.app';
        const responseText = document.querySelector('.question-text');
        const historyBox = document.getElementById('historyBox');
        const historyContent = document.getElementById('historyContent');
        let recognition;
        let history = [];

        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = function() {
                responseText.innerText = 'Listening...';
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error', event);
                responseText.innerText = 'Error occurred while listening.';
            };

            recognition.onend = function() {
                responseText.innerText = 'What do you know about Finance?';
            };

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                handleUserMessage(transcript);
            };
        } else {
            alert('Speech recognition not supported in this browser.');
        }

        window.startListening = function() {
            const languages = ['ar-AR', 'en-US'];
            const randomIndex = Math.floor(Math.random() * languages.length);
            recognition.lang = languages[randomIndex];
            recognition.start();
        };

        async function handleUserMessage(message) {
            try {
                history.push({ user: message });
                const chatResponse = await axios.post(`${serverUrl}/chat`, { message: message });

                const response = chatResponse.data.response;
                responseText.innerText = response;
                history.push({ bot: response });

                const ttsResponse = await axios.post(`${serverUrl}/synthesize`, { text: response, language_code: recognition.lang });

                const audioContent = ttsResponse.data.audioContent;
                const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
                audio.play();
            } catch (error) {
                console.error('Error handling user message', error);
                responseText.innerText = 'Error occurred while processing your message.';
            }
        }

        window.toggleHistory = function() {
            if (historyBox.style.display === 'none' || historyBox.style.display === '') {
                let historyHtml = history.map(entry => {
                    if (entry.user) {
                        return `<div class="history-entry">User: ${entry.user}</div>`;
                    } else if (entry.bot) {
                        return `<div class="history-entry">Bot: ${entry.bot}</div>`;
                    }
                }).join('');

                historyContent.innerHTML = historyHtml;
                historyBox.style.display = 'block';
            } else {
                historyBox.style.display = 'none';
            }
        };

        window.homePage = function() {
            location.href = 'home.html';
        };

        window.toggleWidget = function() {
            const widget = document.getElementById('assistant-widget');
            const widgetIcon = document.getElementById('widget-icon');

            if (widget.style.display === 'none' || widget.style.display === '') {
                widget.style.display = 'flex';
                widgetIcon.innerHTML = `
                    <svg width="86" height="88" viewBox="0 0 86 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="43" cy="44" rx="43" ry="44" fill="black"/>
                        <path d="M43.5 50.5817L28.9465 34.3393C28.5411 33.8869 27.8838 33.8869 27.4785 34.3393L26.304 35.65C25.8987 36.1024 25.8987 36.836 26.304 37.2884L42.766 55.6607C43.1714 56.1131 43.8286 56.1131 44.234 55.6607L60.696 37.2884C61.1013 36.836 61.1013 36.1024 60.696 35.65L59.5215 34.3393C59.1162 33.8869 58.4589 33.8869 58.0535 34.3393L43.5 50.5817Z" fill="url(#paint0_linear_5_74)"/>
                        <defs>
                        <linearGradient id="paint0_linear_5_74" x1="43.5" y1="34" x2="43.5" y2="56" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C736D9"/>
                            <stop offset="0.5" stop-color="#9AED66"/>
                            <stop offset="0.75" stop-color="#E9E9EB"/>
                            <stop offset="1" stop-color="#BCD8FA"/>
                        </linearGradient>
                        </defs>
                    </svg>
                `;
            } else {
                widget.style.display = 'none';
                widgetIcon.innerHTML = `
                    <svg width="86" height="88" viewBox="0 0 86 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="43" cy="44" rx="43" ry="44" fill="black"/>
                        <circle cx="32" cy="35" r="12" fill="#C736D9"/>
                        <circle cx="56" cy="55" r="9" fill="#9AED66"/>
                        <circle cx="37.5" cy="57.5" r="5.5" fill="#D9D9D9"/>
                        <circle cx="53.5" cy="35.5" r="6.5" fill="#BCD8FA"/>
                    </svg>
                `;
            }
        };
    }

    window.initializeAssistantWidget = initWidget;
})();

window.onload = function() {
    // Load Axios library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';
    script.onload = function() {
        initializeAssistantWidget();
    };
    document.head.appendChild(script);
};
