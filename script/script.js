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

    function generateShortCode(length = 7) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    secureBtn.addEventListener('click', () => {
        const scriptContent = luaInput.value.trim();
        if (!scriptContent) {
            alert('Silakan masukkan script Luau terlebih dahulu!');
            return;
        }

        const shortCode = generateShortCode(7);
        const currentOrigin = window.location.origin;
        const shortUrl = `${currentOrigin}/${shortCode}`;

        generatedUrl.value = shortUrl;
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
        const path = window.location.pathname;
        if (path !== '/' && path !== '/index.html' && path.length > 1) {
            mainApp.style.display = 'none';
            accessDeniedScreen.style.display = 'flex';
        }
    }

    if (toggleDemoBtn) toggleDemoBtn.addEventListener('click', toggleView);
    if (toggleBackBtn) toggleBackBtn.addEventListener('click', toggleView);
});
