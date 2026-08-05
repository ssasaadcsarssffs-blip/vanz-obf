document.addEventListener('DOMContentLoaded', () => {
    const secureBtn = document.getElementById('secureBtn');
    const copyBtn = document.getElementById('copyBtn');
    const luaInput = document.getElementById('luaInput');
    const generatedUrl = document.getElementById('generatedUrl');
    const resultPanel = document.getElementById('resultPanel');

    if (!secureBtn) return;

    secureBtn.addEventListener('click', () => {
        const scriptContent = luaInput.value.trim();
        if (!scriptContent) {
            alert('Silakan masukkan script Luau terlebih dahulu!');
            return;
        }

        try {
            const encodedScript = btoa(encodeURIComponent(scriptContent));
            const currentOrigin = window.location.origin;
            const finalUrl = `${currentOrigin}/api/raw?script=${encodeURIComponent(encodedScript)}`;

            generatedUrl.value = finalUrl;
            resultPanel.style.display = 'block';
        } catch (err) {
            alert('Gagal memproses script!');
            console.error(err);
        }
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            generatedUrl.select();
            document.execCommand('copy');
            alert('URL Secured berhasil disalin!');
        });
    }
});
