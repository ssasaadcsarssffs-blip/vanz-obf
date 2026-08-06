module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { script } = req.body || {};
    if (!script) {
        return res.status(400).json({ error: 'Script missing' });
    }

    try {
        const response = await fetch('https://bytebin.lucko.me/post', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: script
        });

        if (!response.ok) {
            return res.status(500).json({ error: 'Gagal menyimpan ke storage' });
        }

        const data = await response.json();
        return res.status(200).json({ id: data.key });
    } catch (err) {
        return res.status(500).json({ error: 'Gagal memproses script' });
    }
};
