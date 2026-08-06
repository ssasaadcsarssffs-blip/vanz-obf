module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                body = {};
            }
        }

        const script = body && body.script ? body.script.trim() : null;

        if (!script) {
            return res.status(400).json({ error: 'Isi script tidak boleh kosong' });
        }

        const response = await fetch('https://bytebin.lucko.me/post', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: script
        });

        if (!response.ok) {
            const errText = await response.text();
            return res.status(500).json({ error: `Bytebin Storage Error (${response.status}): ${errText}` });
        }

        const data = await response.json();
        if (!data || !data.key) {
            return res.status(500).json({ error: 'Response dari storage tidak valid' });
        }

        return res.status(200).json({ id: data.key });

    } catch (err) {
        return res.status(500).json({ 
            error: err.message || 'Server Internal Error'
        });
    }
};
