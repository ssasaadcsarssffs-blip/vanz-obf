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

    secureBtn.addEventListener('click', async () => {
        const scriptContent = luaInput.value.trim();
        if (!scriptContent) {
            alert('Silakan masukkan script Luau terlebih dahulu!');
            return;
        }

        secureBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SECURING...';
        secureBtn.disabled = true;

        try {
            const encodedScript = btoa(encodeURIComponent(scriptContent));
            const currentOrigin = window.location.origin + window.location.pathname;
            const longUrl = `${currentOrigin}?data=${encodedScript}`;

            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
            if (response.ok) {
                const shortUrl = await response.text();
                generatedUrl.value = shortUrl;
                resultPanel.style.display = 'block';
            } else {
                generatedUrl.value = longUrl;
                resultPanel.style.display = 'block';
                alert('Gagal memendekkan URL, menggunakan URL panjang sebagai cadangan.');
            }
        } catch (error) {
            const encodedScript = btoa(encodeURIComponent(scriptContent));
            const currentOrigin = window.location.origin + window.location.pathname;
            generatedUrl.value = `${currentOrigin}?data=${encodedScript}`;
            resultPanel.style.display = 'block';
            alert('Koneksi ke pemendek URL gagal, menggunakan URL standar.');
        }

        secureBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> SECURE HARD';
        secureBtn.disabled = false;
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
                console.log("Roblox Data Secured.");
            } catch (e) {
                console.error("Invalid Payload");
            }
        }
    }

    if (toggleDemoBtn) toggleDemoBtn.addEventListener('click', toggleView);
    if (toggleBackBtn) toggleBackBtn.addEventListener('click', toggleView);
});
