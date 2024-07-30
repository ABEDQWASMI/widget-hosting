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
            right: 16px;
            z-index: 900;
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

    const homePageHTML = `
        <div id="widget-home" style="display: flex;">
            <div class="widget">
                <div class="menu-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>How may I help you today!</h1>
                <div class="card-container">
                    <div class="card purple" onclick="showTalkWidget()">
                        <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="17" cy="17.5" rx="17" ry="17.5" fill="white" fill-opacity="0.47"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4362 6.11596C23.3962 5.96135 23.2088 5.96135 23.1688 6.11596C22.762 7.68248 21.7085 8.90718 20.3608 9.37995C20.2278 9.42645 20.2278 9.64438 20.3608 9.69088C21.7085 10.1637 22.762 11.3884 23.1688 12.9549C23.2088 13.1095 23.3962 13.1095 23.4362 12.9549C23.8429 11.3884 24.8965 10.1637 26.2441 9.69088C26.3772 9.64438 26.3772 9.42645 26.2441 9.37995C24.8965 8.90718 23.8429 7.68248 23.4362 6.11596ZM16.4094 8.65081C13.9606 8.65081 11.975 10.958 11.975 13.8046V18.397C11.975 21.2435 13.9606 23.5516 16.4094 23.5516C18.8581 23.5516 20.8438 21.2435 20.8438 18.397V13.8046C20.8438 10.9581 18.8581 8.65081 16.4094 8.65081ZM14.7163 14.9142C14.9831 14.9142 15.2001 15.1655 15.2001 15.4766V17.1634C15.2001 17.4735 14.9832 17.7257 14.7163 17.7257C14.4496 17.7257 14.2326 17.4736 14.2326 17.1634V15.4766C14.2326 15.1657 14.4494 14.9142 14.7163 14.9142ZM16.8931 14.0708C16.8931 13.7599 16.6763 13.5085 16.4094 13.5085C16.1426 13.5085 15.9256 13.7597 15.9256 14.0708V18.5692C15.9256 18.8793 16.1425 19.1315 16.4094 19.1315C16.6761 19.1315 16.8931 18.8795 16.8931 18.5692V14.0708ZM18.1025 15.4766C18.3692 15.4766 18.5862 15.7278 18.5862 16.0389V16.6013C18.5862 16.9113 18.3694 17.1636 18.1025 17.1636C17.8357 17.1636 17.6187 16.9115 17.6187 16.6013V16.0389C17.6187 15.728 17.8356 15.4766 18.1025 15.4766ZM10.9675 18.1098C10.9675 17.7997 10.7514 17.5474 10.4838 17.5474C10.217 17.5474 10 17.7995 10 18.1098V18.397C10 22.3225 12.6121 25.539 15.9256 25.8263V27.4377C15.9256 27.7477 16.1425 28 16.4094 28C16.6769 28 16.8931 27.7479 16.8931 27.4377V25.8263C20.2067 25.5391 22.8188 22.3226 22.8188 18.397V18.1098C22.8188 17.7997 22.6027 17.5474 22.335 17.5474C22.0683 17.5474 21.8512 17.7995 21.8512 18.1098V18.397C21.8512 21.8903 19.4145 24.7228 16.4093 24.7228C13.4042 24.7228 10.9674 21.8903 10.9674 18.397L10.9675 18.1098ZM25.412 13.1677C25.4324 13.0903 25.5261 13.0903 25.5465 13.1677C25.749 13.9505 26.2766 14.5638 26.9501 14.7993C27.0166 14.823 27.0166 14.9319 26.9501 14.9556C26.2766 15.191 25.749 15.8043 25.5465 16.5872C25.5261 16.6646 25.4324 16.6646 25.412 16.5872C25.2095 15.8044 24.6819 15.1911 24.0084 14.9556C23.9418 14.9319 23.9418 14.823 24.0084 14.7993C24.6818 14.5639 25.2094 13.9506 25.412 13.1677Z" fill="black"/>
                            <span style="display: block;line-height: 3.7;">
                                <span>Talk to</span>
                                <span style="display: block; margin-top: 10px;">Finlix</span>
                            </span>
                        </svg>
                    </div>
                    <div class="card blue">
                        <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="17" cy="17.5" rx="17" ry="17.5" fill="white" fill-opacity="0.47"/>
                            <path d="M24.9999 17.5C24.9999 12.8145 21.1855 9 16.5 9C11.8144 9 8 12.8144 8 17.5V25.468C8 25.761 8.239 26 8.53198 26H16.5C21.1855 26 25 22.1856 25 17.5L24.9999 17.5ZM12.2507 15.9058C13.1276 15.9058 13.8449 16.623 13.8449 17.5C13.8449 18.3768 13.1276 19.0942 12.2507 19.0942C11.3738 19.0942 10.6565 18.3769 10.6565 17.5C10.6565 16.6231 11.3738 15.9058 12.2507 15.9058ZM22.3434 17.5C22.3434 18.3768 21.6261 19.0942 20.7492 19.0942C19.8723 19.0942 19.155 18.3769 19.155 17.5C19.155 16.6231 19.8723 15.9058 20.7492 15.9058C21.6261 15.9058 22.3434 16.623 22.3434 17.5ZM18.0942 17.5C18.0942 18.3768 17.377 19.0942 16.5 19.0942C15.6231 19.0942 14.9058 18.3769 14.9058 17.5C14.9058 16.6231 15.6231 15.9058 16.5 15.9058C17.3769 15.9058 18.0942 16.623 18.0942 17.5Z" fill="black"/>
                        </svg>
                        <span>Chat with Finlix</span>
                    </div>
                    <div class="card green">
                        <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="17" cy="17.5" rx="17" ry="17.5" fill="white" fill-opacity="0.47"/>
                            <path d="M20.3211 13.2241C20.0188 13.0469 19.7236 12.9573 19.4903 12.9573C19.2583 12.9573 19.0886 13.0469 19.0372 13.2241C18.9323 13.5788 19.3401 14.1536 19.9454 14.5084C20.2484 14.6862 20.5433 14.7748 20.7759 14.7748C21.0079 14.7748 21.1777 14.6862 21.2304 14.5084C21.3342 14.1536 20.9271 13.5788 20.3211 13.2241Z" fill="black" stroke="black"/>
                            <path d="M15.5295 22.9591C15.3114 22.881 15.004 22.8655 14.6584 22.9307C13.9686 23.063 13.3924 23.4687 13.3711 23.8377C13.3603 24.022 13.4908 24.163 13.7099 24.2404C13.9287 24.3185 14.2364 24.3334 14.581 24.2678C15.2712 24.1366 15.8477 23.7311 15.869 23.3612C15.8798 23.1769 15.7493 23.0362 15.5295 22.9591Z" fill="black" stroke="black"/>
                            <path d="M18.8677 22.2081C18.6493 22.1307 18.3409 22.1144 17.9967 22.1804C17.3072 22.3119 16.7313 22.7167 16.71 23.0866C16.6999 23.2713 16.83 23.4116 17.0488 23.4894C17.2676 23.5671 17.5757 23.5824 17.9199 23.5174C18.6108 23.3856 19.1853 22.9804 19.2073 22.6108C19.2167 22.4262 19.0869 22.2862 18.8677 22.2081Z" fill="black" stroke="black"/>
                            <path d="M22.068 21.5541C21.8499 21.4767 21.5412 21.4611 21.1963 21.5267C20.5075 21.6583 19.9309 22.0634 19.9103 22.4333C19.9001 22.6176 20.03 22.7583 20.2491 22.8361C20.4676 22.9138 20.776 22.929 21.1209 22.8634C21.811 22.7319 22.3862 22.3268 22.4075 21.9575C22.4177 21.7726 22.2872 21.6322 22.068 21.5541Z" fill="black" stroke="black"/>
                            <path d="M12.9088 15.5658C12.7262 15.7091 12.5487 15.9614 12.4188 16.2881C12.1612 16.9414 12.1957 17.6441 12.4956 17.8595C12.6464 17.967 12.8351 17.9328 13.0177 17.7895C13.2013 17.6461 13.3789 17.3938 13.508 17.0675C13.7657 16.4145 13.7315 15.7108 13.4313 15.4954C13.2808 15.3879 13.0918 15.422 12.9088 15.5658Z" fill="black" stroke="black"/>
                            <path d="M9.18913 14.4333C9.00551 14.5767 8.82798 14.8283 8.69881 15.1549C8.44046 15.8079 8.47461 16.5116 8.77624 16.7263C8.92571 16.8342 9.1144 16.7993 9.29801 16.656C9.48062 16.5126 9.65815 16.2607 9.78732 15.934C10.0457 15.2814 10.0112 14.5777 9.71056 14.3619C9.56042 14.2547 9.37173 14.2892 9.18913 14.4333Z" fill="black" stroke="black"/>
                            <path d="M26.5404 18.7589L24.3238 12.0743C23.9891 11.0646 22.9361 10.0106 21.9257 9.67582L15.2404 7.45922C14.8231 7.32092 14.4481 7.3216 14.1593 7.45787C13.8468 7.54275 13.4898 7.67733 13.1239 7.84776C12.6237 8.08075 12.007 8.43479 11.7452 8.74285C11.7158 8.7681 11.6873 8.79438 11.6597 8.82164L7.1761 13.3062C6.47917 14.0028 6.16908 15.3284 6.47038 16.3242L8.41882 22.7776C8.45432 22.8956 8.49828 23.0068 8.54968 23.1086C8.70658 23.5861 9.34975 24.2553 9.54723 24.4528C9.74539 24.6506 10.4156 25.2954 10.8931 25.452C10.9945 25.5024 11.1058 25.5464 11.2231 25.5819L17.6761 27.5303C17.9263 27.6064 18.2012 27.6446 18.4937 27.6446C19.332 27.6446 20.1957 27.3227 20.6934 26.8249L25.178 22.34C25.2064 22.3116 25.2321 22.2832 25.2571 22.2544C25.5655 21.9917 25.9196 21.3749 26.1519 20.8765C26.3233 20.5089 26.4579 20.1508 26.5428 19.838C26.6794 19.5475 26.6787 19.1755 26.5404 18.7589ZM9.5709 23.508C9.32507 23.209 9.19488 22.9875 9.16884 22.8956L9.14382 22.8333C9.10352 22.755 9.07069 22.673 9.04575 22.5885L7.09664 16.1349C6.86703 15.3757 7.11524 14.2923 7.6387 13.7692L12.1233 9.28424C12.1463 9.2609 12.1706 9.24061 12.194 9.22032L12.2372 9.17501C12.3137 9.0783 12.5209 8.92072 12.8185 8.74556C13.1022 8.83517 13.3437 9.10299 13.4745 9.53785L15.423 15.9915C15.6881 16.8683 15.4088 18.0742 14.7991 18.6839L10.3152 23.1685C10.071 23.4123 9.81201 23.5181 9.5709 23.508ZM24.824 21.7631L24.7776 21.8081C24.7577 21.8311 24.7381 21.8544 24.7147 21.8774L20.2308 26.3623C19.8555 26.7377 19.1572 26.9896 18.4941 26.9896C18.2815 26.9919 18.0693 26.9629 17.8651 26.9037L11.4121 24.9553C11.3277 24.9301 11.2457 24.8971 11.1673 24.8569L11.1048 24.8325C11.0131 24.8068 10.7916 24.6759 10.4927 24.4301C10.4822 24.1887 10.5874 23.93 10.8319 23.6855L15.3154 19.2012C15.9255 18.5912 17.1307 18.3119 18.0078 18.577L24.4608 20.5258C24.8963 20.6573 25.1642 20.8991 25.2534 21.1828C25.0789 21.4797 24.9207 21.6863 24.824 21.7631ZM25.9446 19.5719L25.9189 19.6395C25.8871 19.7602 25.8435 19.8941 25.7931 20.0328C25.6115 20.0676 25.3883 20.0487 25.1297 19.9628L18.4447 17.7462C17.5358 17.4452 16.5544 16.4639 16.2542 15.5553L14.0376 8.87034C13.952 8.61165 13.9327 8.38881 13.9676 8.20688C14.1055 8.15717 14.2384 8.11355 14.3588 8.08176L14.4275 8.05505C14.486 8.02462 14.5614 8.00906 14.6517 8.00906C14.7639 8.00906 14.8928 8.03307 15.0351 8.08007L21.7201 10.2967C22.5276 10.5645 23.4352 11.4728 23.7027 12.2799L25.9196 18.9645C26.0034 19.2195 26.0129 19.4403 25.9446 19.5719Z" fill="black" stroke="black"/>
                        </svg>
                        <span>Play a game</span>
                    </div>
                </div>
                <div class="history">
                    <div class="history-header">
                        <h2>History</h2>
                        <a href="#">See all</a>
                    </div>
                    <div class="history-item">
                        <span>I need help creating a budget...</span>
                    </div>
                    <div class="history-item">
                        <span>How can I invest...</span>
                    </div>
                    <div class="history-item">
                        <span>Add this to my expenses report...</span>
                    </div>
                </div>
                <div class="footer">
                    <a href="https://leapthelimit.com" target="_blank" style="color: #767676; text-decoration: none;">
                        Powered by LeapTheLimit AI
                    </a>
                </div>
            </div>
        </div>
    `;

    const talkWidgetHTML = `
        <div id="widget-talk" style="display: none;">
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

    function showTalkWidget() {
        document.getElementById('widget-home').style.display = 'none';
        document.getElementById('widget-talk').style.display = 'flex';
    }

    function showHomeWidget() {
        document.getElementById('widget-home').style.display = 'flex';
        document.getElementById('widget-talk').style.display = 'none';
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
            if (audioInstance) {
                audioInstance.pause();
            }
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
        loadHTML(homePageHTML);
        loadHTML(talkWidgetHTML);

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
                if (audioInstance) {
                    audioInstance.pause();
                }
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

        function initializeAssistantWidget() {
            loadStyles(widgetStyles);
            loadHTML(homePageHTML);
            loadHTML(talkWidgetHTML);
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

        initializeAssistantWidget();
    }

    loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', initWidget);
})();
