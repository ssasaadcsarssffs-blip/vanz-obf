const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

const databaseScript = {};

app.post('/api/secure', (req, res) => {
    const { script } = req.body;
    if (!script) {
        return res.status(400).json({ error: 'Script kosong!' });
    }

    const randomId = Math.random().toString(36).substring(2, 10);
    databaseScript[randomId] = script;

    const fullUrl = `${req.protocol}://${req.get('host')}/${randomId}`;
    res.json({ url: fullUrl });
});

app.get('/:id', (req, res) => {
    const scriptId = req.params.id;
    
    if (scriptId === 'css' || scriptId === 'script' || scriptId === 'index.html') {
        return;
    }

    const userAgent = req.headers['user-agent'] || '';
    const isRoblox = userAgent.includes('Roblox') || userAgent.includes('RobloxStudio') || userAgent.includes('WinInet');

    if (isRoblox) {
        if (databaseScript[scriptId]) {
            res.setHeader('Content-Type', 'text/plain');
            return res.send(databaseScript[scriptId]);
        } else {
            res.setHeader('Content-Type', 'text/plain');
            return res.status(404).send("-- Error: Script tidak ditemukan atau sudah kadaluarsa.");
        }
    } else {
        return res.sendFile(path.join(__dirname, 'access-denied.html'));
    }
});

app.listen(3000, () => {
    console.log('Server V-Secure aktif di port 3000');
});
