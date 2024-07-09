(function() {
    const widgetStyles = `
      #assistant-widget {
          width: 320px;
          height: 563px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          background-color: #000;
          color: lightgray;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #333;
          border-radius: 10px;
          overflow: hidden;
          position: fixed;
          bottom: 106px;
          right: 16px; z-index: 900;
          display: none;
        }
        #widget-icon {
            position: fixed;
            bottom: 16px;
            right: 16px;
            width: 69px;
            height: 70px;
            cursor: pointer;
        }

        .breathing {
            animation: breathe 3s infinite;
        }

        .heartbeat {
            animation: heartbeat 1s infinite;
        }

        @keyframes breathe {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }

        @keyframes heartbeat {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(1.1);
            }
            50% {
                transform: scale(1);
            }
            75% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }

        .language-menu {
            position: absolute;
            top: 50px;
            right: 10px;
            display: none;
            flex-direction: column;
            background-color: #333;
            border: 1px solid #666;
            border-radius: 10px;
            padding: 10px;
            z-index: 1000;
        }

        .language-menu.active {
            display: flex;
        }

        .language-menu button {
            background: none;
            border: none;
            color: white;
            padding: 5px 10px;
            text-align: left;
            cursor: pointer;
            width: 100%;
        }

        .language-menu button:hover {
            background-color: #555;
        }
    `;

    const widgetHTML = `
        <div id="assistant-widget">
            <section class="finlix-container">
                <h1 class="brand-name">
                    <svg width="54" height="29" viewBox="0 0 67 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="66" height="35" rx="17.5" stroke="url(#paint0_linear_37_323)"/>
                        <path d="M17.1186 23V12.8182H23.4325V14.1406H18.6548V17.2429H22.9801V18.5604H18.6548V23H17.1186ZM25.2024 23V15.3636H26.6889V23H25.2024ZM25.9531 14.1854C25.6946 14.1854 25.4725 14.0992 25.2869 13.9268C25.1046 13.7512 25.0135 13.5424 25.0135 13.3004C25.0135 13.0552 25.1046 12.8464 25.2869 12.674C25.4725 12.4983 25.6946 12.4105 25.9531 12.4105C26.2116 12.4105 26.4321 12.4983 26.6143 12.674C26.8 12.8464 26.8928 13.0552 26.8928 13.3004C26.8928 13.5424 26.8 13.7512 26.6143 13.9268C26.4321 14.0992 26.2116 14.1854 25.9531 14.1854ZM30.1752 18.4659V23H28.6887V15.3636H30.1156V16.6065H30.21C30.3857 16.2022 30.6608 15.8774 31.0353 15.6321C31.4132 15.3868 31.8888 15.2642 32.4622 15.2642C32.9825 15.2642 33.4383 15.3736 33.8294 15.5923C34.2205 15.8078 34.5237 16.1293 34.7392 16.5568C34.9546 16.9844 35.0623 17.513 35.0623 18.1428V23H33.5758V18.3217C33.5758 17.7682 33.4316 17.3357 33.1433 17.0241C32.8549 16.7093 32.4589 16.5518 31.9551 16.5518C31.6104 16.5518 31.3038 16.6264 31.0353 16.7756C30.7702 16.9247 30.5597 17.1435 30.4039 17.4318C30.2515 17.7169 30.1752 18.0616 30.1752 18.4659ZM38.5424 12.8182V23H37.0559V12.8182H38.5424ZM40.5423 23V15.3636H42.0288V23H40.5423ZM41.293 14.1854C41.0344 14.1854 40.8124 14.0992 40.6268 13.9268C40.4445 13.7512 40.3533 13.5424 40.3533 13.3004C40.3533 13.0552 40.4445 12.8464 40.6268 12.674C40.8124 12.4983 41.0344 12.4105 41.293 12.4105C41.5515 12.4105 41.7719 12.4983 41.9542 12.674C42.1398 12.8464 42.2326 13.0552 42.2326 13.3004C42.2326 13.5424 42.1398 13.7512 41.9542 13.9268C41.7719 14.0992 41.5515 14.1854 41.293 14.1854ZM45.2019 15.3636L46.8873 18.3366L48.5875 15.3636H50.2132L47.8319 19.1818L50.2331 23H48.6074L46.8873 20.1463L45.1721 23H43.5414L45.9178 19.1818L43.5712 15.3636H45.2019Z" fill="white"/>
                        <defs>
                        <linearGradient id="paint0_linear_37_323" x1="33.5" y1="0" x2="33.5" y2="36" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C736D9"/>
                            <stop offset="0.5" stop-color="#BCD8FA"/>
                            <stop offset="0.75" stop-color="#E9E9EB"/>
                            <stop offset="1" stop-color="#9AED66"/>
                        </linearGradient>
                        </defs>
                    </svg>
                </h1>
                <p class="powered-by"><a href="https://leapthelimit.com" target="_blank">Powered by LeapTheLimit</a></p>
                <div class="shape-container">
                    <div class="shape"><div class="circle purple-circle" aria-hidden="true"></div></div>
                    <div class="shape"><div class="circle blue-circle" aria-hidden="true"></div></div>
                    <div class="shape"><div class="circle green-circle" aria-hidden="true"></div></div>
                    <div class="shape"><div class="circle gray-circle" aria-hidden="true"></div></div>
                </div>
                <h2 class="question-text">How can I help you?</h2>
                <div class="icon-container">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5c24373f8dd5ef5131c67177bccdbef574bf3f9ed5118f4e197ea82589a22df?apiKey=6ff838e322054338a5da6863c2494c61&" alt="History Icon" class="icon" onclick="toggleHistory()" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/95dad8e994e6b876df822e962cfc87ce2b5a9d7d32d644beda1bacf1554332cc?apiKey=6ff838e322054338a5da6863c2494c61&" alt="Microphone Icon" class="icon-large" onclick="startListening()" />
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" onclick="toggleLanguageMenu()">
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <path d="M14.5 23.1667C19.3325 23.1667 23.25 19.0626 23.25 14C23.25 8.9374 19.3325 4.83334 14.5 4.83334C9.66751 4.83334 5.75 8.9374 5.75 14C5.75 19.0626 9.66751 23.1667 14.5 23.1667Z" stroke="white" stroke-linecap="square"/>
                        <path d="M14.5 23.1667C16.8333 20.9445 18 17.8889 18 14C18 10.1111 16.8333 7.05557 14.5 4.83334C12.1667 7.05557 11 10.1111 11 14C11 17.8889 12.1667 20.9445 14.5 23.1667Z" stroke="white" stroke-linecap="round"/>
                        <path d="M6.1875 11.25H22.8125M6.1875 16.75H22.8125" stroke="white" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="language-menu" id="languageMenu">
                    <button onclick="setLanguage('ar')">Arabic</button>
                    <button onclick="setLanguage('en')">English</button>
                    <button onclick="setLanguage('he')">Hebrew</button>
                </div>
            </section>
            <div class="history-box" id="historyBox">
                <button class="close-button" onclick="toggleHistory()">Close</button>
                <div id="historyContent"></div>
            </div>
        </div>
        <div id="widget-icon" onclick="toggleWidget()">
            <svg width="69" height="70" viewBox="0 0 86 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="43" cy="44" rx="43" ry="44" fill="black"/>
                <circle cx="32" cy="35" r="12" fill="#C736D9"/>
                <circle cx="56" cy="55" r="9" fill="#9AED66"/>
                <circle cx="37.5" cy="57.5" r="5.5" fill="#D9D9D9"/>
                <circle cx="53.5" cy="35.5" r="6.5" fill="#BCD8FA"/>
            </svg>
        </div>
    `;

       function loadStyles(styles) {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    function loadHTML(html) {
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = html;
        document.body.appendChild(widgetContainer);
    }

    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    async function handleUserMessage(message) {
        try {
            history.push({ user: message });
            const chatResponse = await axios.post(`${serverUrl}/chat`, { message: message, language: selectedLanguage });

            let response = chatResponse.data.response;
            response = translateMathSymbols(response);
            response = convertNumbersToWords(response);
            displayRotatingText(response);
            history.push({ bot: response });

            const ttsResponse = await axios.post(`${serverUrl}/synthesize`, { text: response, language_code: selectedLanguage });

            const audioContent = ttsResponse.data.audioContent;
            audioInstance = new Audio(`data:audio/mp3;base64,${audioContent}`);
            audioInstance.play();

            await saveChatMessage(message, "general");
        } catch (error) {
            console.error('Error handling user message', error);
            responseText.innerText = 'Error occurred while processing your message.';
        }
    }

    function convertNumbersToWords(text) {
        const numberMap = {
            "0": "صفر",
            "1": "واحد",
            "2": "اثنان",
            "3": "ثلاثة",
            "4": "أربعة",
            "5": "خمسة",
            "6": "ستة",
            "7": "سبعة",
            "8": "ثمانية",
            "9": "تسعة",
            "10": "عشرة"
        };
        for (const [digit, word] of Object.entries(numberMap)) {
            text = text.replace(new RegExp(digit, 'g'), word);
        }
        return text;
    }

    function translateMathSymbols(text) {
        const mathSymbols = {
            "+": "زائد",
            "-": "ناقص",
            "*": "ضرب",
            "/": "قسمة",
            "=": "يساوي"
        };
        for (const [symbol, word] of Object.entries(mathSymbols)) {
            text = text.replace(new RegExp(`\\${symbol}`, 'g'), ` ${word} `);
        }
        return text;
    }

    function initWidget() {
        loadStyles(widgetStyles);
        loadHTML(widgetHTML);
  

        const cssStyles = `
            .finlix-container {
                border-radius: 25px;
                background-color: #000;
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                padding: 16px;
                box-sizing: border-box;
            }

            .brand-name {
                justify-content: center;
                border-radius: 18px;
                border: none;
                background-color: rgba(199, 54, 217, 0);
                color: #fff;
                white-space: nowrap;
                padding: 6.4px 12.8px;
                font: 500 11.2px/112% Inter, sans-serif;
                margin-top: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .brand-name svg {
                display: inline-block;
                vertical-align: middle;
            }

            .powered-by {
                color: #767676;
                margin-top: 8px;
                font: 300 9.6px/112% Inter, sans-serif;
            }

            .powered-by a {
                color: #767676;
                text-decoration: none;
            }

            .powered-by a:hover {
                text-decoration: underline;
            }

            .shape-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
                position: relative;
                width: 100%;
                height: 240px;
            }

            .shape {
                position: absolute;
            }

            .circle {
                border-radius: 50%;
                position: absolute;
                animation: breathe 3s infinite;
            }

            .circle-listening {
                animation: heartbeat 1s infinite;
            }

            .purple-circle {
                background-color: #c736d9;
                width: 103.2px;
                height: 107.2px;
                left: calc(50% - 84px);
                top: calc(50% - 80px);
            }

            .blue-circle {
                background-color: #bcd8fa;
                width: 54.4px;
                height: 54.4px;
                left: calc(50% + 32px);
                top: calc(50% - 64px);
            }

            .green-circle {
                background-color: #9aed66;
                width: 72px;
                height: 68.8px;
                left: calc(50% + 16px);
                top: calc(50% + 8px);
            }

            .gray-circle {
                background-color: #d9d9d9;
                width: 48.8px;
                height: 46.4px;
                left: calc(50% - 48px);
                top: calc(64% + 40px);
            }

            .question-text {
                color: #c3c3c3;
                margin-top: 16px;
                font: 400 22.4px/28.8px Inter, sans-serif;
                text-align: center;
            }

            .icon-container {
                display: flex;
                margin-top: 16px;
                align-items: center;
                gap: 24px;
                justify-content: space-around;
                width: 100%;
                padding: 16px;
                position: absolute;
                bottom: 16px;
            }

            .icon {
                width: 36px;
                cursor: pointer;
            }

            .icon-large {
                width: 56px;
                cursor: pointer;
            }

            .icon-bordered {
                width: 36px;
                cursor: pointer;
                border-radius: 50%;
                border: 1px solid #6b6b6b;
            }

            .history-box {
                display: none;
                position: fixed;
                bottom: 8%;
                right: 8%;
                width: 240px;
                height: 320px;
                background-color: #333;
                color: white;
                padding: 16px;
                border-radius: 10px;
                overflow-y: auto;
            }

            .close-button {
                background-color: #c736d9;
                border: none;
                color: white;
                padding: 4px 8px;
                cursor: pointer;
                border-radius: 5px;
                float: right;
            }

            .history-entry {
                margin-bottom: 8px;
            }
        `;

                loadStyles(cssStyles);

        const serverUrl = 'https://my-flask-app-mz4r7ctc7q-zf.a.run.app';
        const responseText = document.querySelector('.question-text');
        let recognition;
        let history = [];
        let audioInstance;
        let selectedLanguage = 'ar';

        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'ar-SA';

            recognition.onstart = function() {
                if (audioInstance) {
                    audioInstance.pause();
                    audioInstance = null;
                }
                responseText.innerText = 'Listening...';
                document.querySelectorAll('.circle').forEach(circle => {
                    circle.classList.add('circle-listening');
                });
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error', event);
                responseText.innerText = 'Error occurred while listening.';
                document.querySelectorAll('.circle').forEach(circle => {
                    circle.classList.remove('circle-listening');
                });
            };

            recognition.onend = function() {
                responseText.innerText = 'How can I help you?';
                document.querySelectorAll('.circle').forEach(circle => {
                    circle.classList.remove('circle-listening');
                });
            };

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                handleUserMessage(transcript);
            };
        } else {
            alert('Speech recognition not supported in this browser.');
        }

        window.startListening = function() {
            recognition.start();
        };

        async function handleUserMessage(message) {
            try {
                history.push({ user: message });
                const chatResponse = await axios.post(`${serverUrl}/chat`, { message: message, language: selectedLanguage });

                let response = chatResponse.data.response;
                response = translateMathSymbols(response);
                response = convertNumbersToWords(response);
                displayRotatingText(response);
                history.push({ bot: response });

                const ttsResponse = await axios.post(`${serverUrl}/synthesize`, { text: response, language_code: selectedLanguage });

                const audioContent = ttsResponse.data.audioContent;
                audioInstance = new Audio(`data:audio/mp3;base64,${audioContent}`);
                audioInstance.play();

                await saveChatMessage(message, "general");
            } catch (error) {
                console.error('Error handling user message', error);
                responseText.innerText = 'Error occurred while processing your message.';
            }
        }

        async function saveChatMessage(message, category) {
            try {
                await axios.post(`${serverUrl}/save-chat-message`, {
                    message: message,
                    category: category
                });
            } catch (error) {
                console.error('Error saving chat message', error);
            }
        }

        async function scrapeWebsite(url) {
            try {
                const scrapeResponse = await axios.post(`${serverUrl}/scrape`, { url: url });
                const explanation = scrapeResponse.data.explanation;
                handleUserMessage(`The page says: ${explanation}`);
            } catch (error) {
                console.error('Error scraping website', error);
                alert('Failed to scrape the website.');
            }
        }

        function displayRotatingText(text) {
            const chunks = text.match(/.{1,50}/g);
            let currentIndex = 0;
            responseText.innerText = chunks[currentIndex];

            const intervalId = setInterval(() => {
                currentIndex++;
                if (currentIndex < chunks.length) {
                    responseText.innerText = chunks[currentIndex];
                } else {
                    clearInterval(intervalId);
                }
            }, 6000);
        }

        window.toggleHistory = function() {
            const historyBox = document.getElementById('historyBox');
            const historyContent = document.getElementById('historyContent');

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
            alert("Coming Soon");
        };

        window.toggleWidget = function() {
            const widget = document.getElementById('assistant-widget');
            const widgetIcon = document.getElementById('widget-icon');

            if (widget.style.display === 'none' || widget.style.display === '') {
                widget.style.display = 'flex';
                widgetIcon.innerHTML = `
                    <svg width="69" height="70" viewBox="0 0 86 88" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <svg width="69" height="70" viewBox="0 0 86 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="43" cy="44" rx="43" ry="44" fill="black"/>
                        <circle cx="32" cy="35" r="12" fill="#C736D9"/>
                        <circle cx="56" cy="55" r="9" fill="#9AED66"/>
                        <circle cx="37.5" cy="57.5" r="5.5" fill="#D9D9D9"/>
                        <circle cx="53.5" cy="35.5" r="6.5" fill="#BCD8FA"/>
                    </svg>
                `;
            }
        };

        window.toggleLanguageMenu = function() {
            const languageMenu = document.getElementById('languageMenu');
            languageMenu.classList.toggle('active');
        };

        window.setLanguage = function(lang) {
            selectedLanguage = lang;
            console.log(`Language set to: ${lang}`);
            recognition.lang = lang === 'en' ? 'en-US' : lang === 'he' ? 'he-IL' : 'ar-SA';
            toggleLanguageMenu();
        };
    }

    loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', initWidget);
})();
