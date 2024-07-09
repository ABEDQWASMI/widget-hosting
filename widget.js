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
            bottom: 96px;
            right: 16px;
            display: none;
            z-index: 9999; /* Ensure widget is always on top */
        }
        #widget-icon {
            position: fixed;
            bottom: 16px;
            right: 16px;
            width: 69px;
            height: 70px;
            cursor: pointer;
            z-index: 9999; /* Ensure widget icon is always on top */
        }

        .breathing {
            animation: breathe 3s infinite;
        }

        .heartbeat {
            animation: heartbeat 1s infinite;
        }

        .wave {
            animation: wave 2s infinite;
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

        @keyframes wave {
            0%, 100% {
                transform: scale(1);
                border-radius: 50%;
            }
            50% {
                transform: scale(1.1);
                border-radius: 45%;
            }
        }

        .purple-wave {
            background-color: #c736d9;
        }

        .blue-wave {
            background-color: #bcd8fa;
        }

        .green-wave {
            background-color: #9aed66;
        }

        .gray-wave {
            background-color: #d9d9d9;
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
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec3ad13fd252c5c0acb23d9fb00ecd75dab04844fe615a32906bc0f2ee5f0f79?apiKey=6ff838e322054338a5da6863c2494c61&" alt="Home Icon" class="icon-bordered" onclick="homePage()" />
                    <svg width="29" height="132" viewBox="0 0 29 132" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" onclick="toggleLanguageMenu()">
                        <rect x="0.25" y="103.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="103.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="103.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="103.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <path d="M14.5 126.167C19.3325 126.167 23.25 122.063 23.25 117C23.25 111.937 19.3325 107.833 14.5 107.833C9.66751 107.833 5.75 111.937 5.75 117C5.75 122.063 9.66751 126.167 14.5 126.167Z" stroke="white" stroke-linecap="square"/>
                        <path d="M14.5 126.167C16.8333 123.944 18 120.889 18 117C18 113.111 16.8333 110.056 14.5 107.833C12.1667 110.056 11 113.111 11 117C11 120.889 12.1667 123.944 14.5 126.167Z" stroke="white" stroke-linecap="round"/>
                        <path d="M6.1875 114.25H22.8125M6.1875 119.75H22.8125" stroke="white" stroke-linecap="round"/>
                        <rect x="0.25" y="68.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="68.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="68.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="68.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="34.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" fill="#272626"/>
                        <rect x="0.25" y="0.25" width="28.5" height="28.5" rx="13.75" stroke="#6B6B6B" stroke-width="0.5"/>
                        <path d="M7.15909 87V78.2727H12.2216V78.9886H7.95597V82.2741H11.9531V82.9901H7.95597V86.2841H12.3068V87H7.15909ZM21.081 78.2727V87H20.3054L15.1491 79.6918H15.081V87H14.2841V78.2727H15.0554L20.2287 85.5895H20.2969V78.2727H21.081Z" fill="white"/>
                        <path d="M10.68 53.252L10.992 52.268C11.928 52.268 12.732 52.244 13.404 52.196C14.084 52.148 14.64 52.072 15.072 51.968C15.512 51.856 15.836 51.708 16.044 51.524C16.26 51.332 16.368 51.1 16.368 50.828C16.368 50.524 16.312 50.172 16.2 49.772C16.088 49.372 15.944 48.944 15.768 48.488L16.692 48.164C16.796 48.42 16.892 48.696 16.98 48.992C17.076 49.28 17.156 49.568 17.22 49.856C17.284 50.136 17.316 50.396 17.316 50.636C17.316 51.108 17.208 51.512 16.992 51.848C16.776 52.176 16.416 52.444 15.912 52.652C15.408 52.86 14.728 53.012 13.872 53.108C13.024 53.204 11.96 53.252 10.68 53.252ZM10.68 53.252C9.968 53.252 9.34 53.204 8.796 53.108C8.26 53.02 7.812 52.88 7.452 52.688C7.092 52.496 6.82 52.248 6.636 51.944C6.452 51.632 6.36 51.256 6.36 50.816C6.36 50.616 6.376 50.412 6.408 50.204C6.44 49.988 6.48 49.772 6.528 49.556C6.584 49.34 6.64 49.132 6.696 48.932L7.596 49.16C7.564 49.28 7.528 49.424 7.488 49.592C7.448 49.752 7.412 49.916 7.38 50.084C7.356 50.252 7.344 50.404 7.344 50.54C7.344 50.956 7.448 51.292 7.656 51.548C7.872 51.796 8.244 51.98 8.772 52.1C9.3 52.212 10.04 52.268 10.992 52.268L11.232 52.868L10.68 53.252ZM11.832 55.532C11.664 55.532 11.52 55.472 11.4 55.352C11.288 55.24 11.232 55.104 11.232 54.944C11.232 54.784 11.288 54.644 11.4 54.524C11.52 54.404 11.664 54.344 11.832 54.344C11.992 54.344 12.128 54.404 12.24 54.524C12.36 54.644 12.42 54.784 12.42 54.944C12.42 55.104 12.36 55.24 12.24 55.352C12.128 55.472 11.992 55.532 11.832 55.532ZM18.986 53L18.782 45.272H19.754L19.958 53H18.986ZM18.194 44.552L18.05 43.904C18.258 43.856 18.426 43.816 18.554 43.784C18.682 43.752 18.826 43.716 18.986 43.676L18.926 43.928C18.718 43.864 18.518 43.728 18.326 43.52C18.142 43.312 18.05 43.076 18.05 42.812C18.05 42.572 18.106 42.372 18.218 42.212C18.338 42.044 18.49 41.92 18.674 41.84C18.866 41.76 19.07 41.72 19.286 41.72C19.374 41.72 19.466 41.728 19.562 41.744C19.666 41.76 19.762 41.784 19.85 41.816L19.754 42.416C19.674 42.4 19.598 42.384 19.526 42.368C19.454 42.352 19.374 42.344 19.286 42.344C19.102 42.344 18.958 42.384 18.854 42.464C18.75 42.536 18.698 42.64 18.698 42.776C18.698 42.944 18.75 43.088 18.854 43.208C18.966 43.328 19.09 43.424 19.226 43.496C19.37 43.56 19.486 43.592 19.574 43.592L19.082 43.64C19.298 43.584 19.498 43.528 19.682 43.472C19.874 43.408 20.046 43.348 20.198 43.292L20.39 43.904C20.198 43.976 19.97 44.052 19.706 44.132C19.45 44.212 19.19 44.288 18.926 44.36C18.662 44.432 18.418 44.496 18.194 44.552Z" fill="white"/>
<path d="M13.7559 18.0039V19H7.48047V18.0039H11.8984V14.7754C11.8984 14.0566 11.752 13.5488 11.459 13.252C11.1699 12.9551 10.668 12.8066 9.95312 12.8066H7.75586V11.8105H9.96484C11.043 11.8105 11.8145 12.041 12.2793 12.502C12.7441 12.9629 12.9766 13.7246 12.9766 14.7871V18.0039H13.7559ZM14.4238 18.0508C15.5059 18.0508 16.3535 17.9512 16.9668 17.752L14.793 11.8105H15.9824L17.9043 17.2949C18.2715 17.0332 18.5664 16.6836 18.7891 16.2461C19.0156 15.8047 19.1797 15.2266 19.2812 14.5117C19.3867 13.7969 19.4395 12.8965 19.4395 11.8105H20.5703C20.5703 13.6152 20.3789 15.0293 19.9961 16.0527C19.7383 16.7324 19.377 17.2949 18.9121 17.7402C18.4473 18.1816 17.8477 18.5215 17.1133 18.7598C16.3828 18.9941 15.4863 19.1387 14.4238 19.1934V18.0508Z" fill="white"/>
                    </svg>
                </div>
            </section>
            <div class="history-box" id="historyBox">
                <div id="historyContent"></div>
            </div>
            <div class="language-menu" id="languageMenu" style="display: none;">
                <button onclick="setLanguage('ar')">Arabic</button>
                <button onclick="setLanguage('en')">English</button>
                <button onclick="setLanguage('he')">Hebrew</button>
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

    function convertNumberToWords(num) {
        const units = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"];
        const teens = ["عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
        const tens = ["", "عشر", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
        const hundreds = ["", "مئة", "مئتان", "ثلاثمئة", "أربعمئة", "خمسمئة", "ستمئة", "سبعمئة", "ثمانمئة", "تسعمئة"];

        if (num === 0) return "صفر";

        let words = "";
        if (num >= 100) {
            words += hundreds[Math.floor(num / 100)] + " ";
            num %= 100;
        }
        if (num >= 20) {
            words += tens[Math.floor(num / 10)] + " ";
            num %= 10;
        }
        if (num >= 10) {
            words += teens[num - 10] + " ";
        } else {
            words += units[num] + " ";
        }
        return words.trim();
    }

    function translateMathSymbols(text) {
        const symbols = {
            '+': 'زائد',
            '-': 'ناقص',
            '*': 'ضرب',
            '/': 'قسمة',
            '=': 'يساوي'
        };
        return text.replace(/[+\-*/=]/g, match => symbols[match]);
    }

    function loadWidget() {
        loadStyles(widgetStyles);
        loadHTML(widgetHTML);

        const serverUrl = 'https://leapthelimit-mz4r7ctc7q-zf.a.run.app';
        const responseText = document.querySelector('.question-text');
        let recognition;
        let history = [];
        let audioInstance;

        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'ar';

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
                const chatResponse = await axios.post(`${serverUrl}/chat`, { message: message });

                let response = chatResponse.data.response;
                response = translateMathSymbols(response);
                response = convertNumberToWords(response);
                displayRotatingText(response);
                history.push({ bot: response });

                const ttsResponse = await axios.post(`${serverUrl}/synthesize`, { text: response, language_code: 'ar-SA' });

                const audioContent = ttsResponse.data.audioContent;
                audioInstance = new Audio(`data:audio/mp3;base64,${audioContent}`);
                audioInstance.play();

                startSpeaking();

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

        window.toggleLanguageMenu = function() {
            const languageMenu = document.getElementById('languageMenu');
            if (languageMenu.style.display === 'none' || languageMenu.style.display === '') {
                languageMenu.style.display = 'block';
            } else {
                languageMenu.style.display = 'none';
            }
        };

        window.setLanguage = function(languageCode) {
            recognition.lang = languageCode;
            alert(`Language set to ${languageCode}`);
            toggleLanguageMenu();
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
    }

    loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', loadWidget);
})();
