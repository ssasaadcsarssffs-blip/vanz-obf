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

    secureBtn.addEventListener('click', () => {
        const scriptContent = luaInput.value.trim();
        if (!scriptContent) {
            alert('Silakan masukkan script Luau terlebih dahulu!');
            return;
        }

        const currentOrigin = window.location.origin;
        const randomPath = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
        const finalUrl = `${currentOrigin}/${randomPath}`;

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

    toggleDemoBtn.addEventListener('click', toggleView);
    toggleBackBtn.addEventListener('click', toggleView);
});
