const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { id } = req.query;
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();

    const isRoblox = userAgent.includes('roblox');

    if (!id) {
        return res.status(400).send('Error: ID Missing');
    }

    if (isRoblox) {
        try {
            const response = await fetch(`https://bytebin.lucko.me/raw/${id}`);
            if (!response.ok) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                return res.status(404).send('-- Error: Script tidak ditemukan atau telah expired');
            }
            const scriptData = await response.text();
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            return res.status(200).send(scriptData);
        } catch (err) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            return res.status(500).send('-- Error: Gagal mengunduh script');
        }
    } else {
        const filePath = path.join(process.cwd(), 'access-denied.html');
        if (fs.existsSync(filePath)) {
            const htmlContent = fs.readFileSync(filePath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(403).send(htmlContent);
        } else {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(403).send('<h1>403 ACCESS DENIED</h1><p>HANYA CLIENT ROBLOX YANG DAPAT MENGAKSES KODE INI</p>');
        }
    }
};
