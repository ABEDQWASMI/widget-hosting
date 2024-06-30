(function() {
    const widgetHTML = `
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
    `;

    function loadHTML() {
        const widgetContainer = document.getElementById('assistant-widget');
        widgetContainer.innerHTML = widgetHTML;
    }

    function initWidget() {
        loadHTML();

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
    initializeAssistantWidget();
};
