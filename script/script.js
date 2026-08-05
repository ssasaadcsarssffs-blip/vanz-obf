document.addEventListener('DOMContentLoaded', () => {
    const secureBtn = document.getElementById('secureBtn');
    const copyBtn = document.getElementById('copyBtn');
    const toggleDemoBtn = document.getElementById('toggleDemoBtn');
    const toggleBackBtn = document.getElementById('toggleBackBtn');
    const luaInput = document.getElementById('luaInput');
    const generatedUrl = document.getElementById('generatedUrl');
    const resultPanel = document.getElementById('resultPanel');
    const mainApp = document.getElementById('mainApp');
    const accessDeniedScreen = document.getElementById('accessDeniedScreen');

    checkAccessProtection();

    secureBtn.addEventListener('click', () => {
        const scriptContent = luaInput.value.trim();
        if (!scriptContent) {
            alert('Silakan masukkan script Luau terlebih dahulu!');
            return;
        }

        const encodedScript = btoa(encodeURIComponent(scriptContent));
        const currentOrigin = window.location.origin + window.location.pathname;
        const finalUrl = `${currentOrigin}?data=${encodedScript}`;

        generatedUrl.value = finalUrl;
        resultPanel.style.display = 'block';
    });

    copyBtn.addEventListener('click', () => {
        generatedUrl.select();
        document.execCommand('copy');
        alert('URL Secured berhasil disalin!');
    });

    function toggleView() {
        if (mainApp.style.display === 'none') {
            mainApp.style.display = 'block';
            accessDeniedScreen.style.display = 'none';
        } else {
            mainApp.style.display = 'none';
            accessDeniedScreen.style.display = 'flex';
        }
    }

    function checkAccessProtection() {
        const urlParams = new URLSearchParams(window.location.search);
        const dataParam = urlParams.get('data');

        if (dataParam) {
            mainApp.style.display = 'none';
            accessDeniedScreen.style.display = 'flex';

            try {
                const decodedScript = decodeURIComponent(atob(dataParam));
                console.log("Roblox Data Prepared: ", decodedScript);
            } catch (e) {
                console.error("Invalid Payload");
            }
        }
    }

    toggleDemoBtn.addEventListener('click', toggleView);
    toggleBackBtn.addEventListener('click', toggleView);
});
