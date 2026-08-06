document.addEventListener('DOMContentLoaded', () => {
    const secureBtn = document.getElementById('secureBtn');
    const copyBtn = document.getElementById('copyBtn');
    const luaInput = document.getElementById('luaInput');
    const generatedUrl = document.getElementById('generatedUrl');
    const resultPanel = document.getElementById('resultPanel');

    if (!secureBtn) return;

    secureBtn.addEventListener('click', async () => {
        const scriptContent = luaInput.value.trim();
        if (!scriptContent) {
            alert('Silakan masukkan script Luau terlebih dahulu!');
            return;
        }

        secureBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SECURING...';
        secureBtn.disabled = true;

        try {
            const formData = new URLSearchParams();
            formData.append('content', scriptContent);
            formData.append('expiry', '365');

            const response = await fetch('https://dpaste.org/api/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });

            const rawResponse = (await response.text()).trim();
            const cleanUrl = rawResponse.replace(/"/g, '');
            const shortId = cleanUrl.split('/').filter(Boolean).pop().replace('.txt', '');

            const currentOrigin = window.location.origin;
            const finalUrl = `${currentOrigin}/v/${shortId}`;

            generatedUrl.value = finalUrl;
            resultPanel.style.display = 'block';
        } catch (err) {
            alert('Gagal mengamankan script!');
        }

        secureBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> SECURE HARD';
        secureBtn.disabled = false;
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            generatedUrl.select();
            document.execCommand('copy');
            alert('URL Secured berhasil disalin!');
        });
    }
});
