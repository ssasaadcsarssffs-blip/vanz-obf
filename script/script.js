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
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ script: scriptContent })
            });

            const data = await response.json();

            if (response.ok && data.id) {
                const currentOrigin = window.location.origin;
                const finalUrl = `${currentOrigin}/v/${data.id}`;

                generatedUrl.value = finalUrl;
                resultPanel.style.display = 'block';
            } else {
                alert('Gagal mengamankan script: ' + (data.error || 'Server menolak request'));
            }
        } catch (err) {
            alert('Terjadi kesalahan koneksi ke server: ' + err.message);
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
