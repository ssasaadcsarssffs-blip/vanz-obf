document.addEventListener('DOMContentLoaded', () => {
    const secureBtn = document.getElementById('secureBtn');
    const copyBtn = document.getElementById('copyBtn');
    const luaInput = document.getElementById('luaInput');
    const generatedUrl = document.getElementById('generatedUrl');
    const resultPanel = document.getElementById('resultPanel');

    secureBtn.addEventListener('click', async () => {
        const scriptContent = luaInput.value.trim();
        if (!scriptContent) {
            alert('Silakan masukkan script Luau terlebih dahulu!');
            return;
        }

        try {
            const response = await fetch('/api/secure', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ script: scriptContent })
            });

            const data = await response.json();
            if (data.url) {
                generatedUrl.value = data.url;
                resultPanel.style.display = 'block';
            } else {
                alert('Gagal menghasilkan secure URL!');
            }
        } catch (err) {
            alert('Terjadi kesalahan koneksi ke server.');
        }
    });

    copyBtn.addEventListener('click', () => {
        generatedUrl.select();
        document.execCommand('copy');
        alert('URL Secured berhasil disalin!');
    });
});
