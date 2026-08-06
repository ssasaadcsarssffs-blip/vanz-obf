module.exports = async (req, res) => {
    const { id } = req.query;
    const userAgent = req.headers['user-agent'] || '';

    const isRoblox = userAgent.includes('Roblox') || 
                     userAgent.includes('RobloxStudio') || 
                     userAgent.includes('WinInet') || 
                     userAgent.includes('RobloxApp');

    if (!id) {
        return res.status(400).send('Error: ID missing');
    }

    if (isRoblox) {
        try {
            const response = await fetch(`https://dpaste.org/${id}/raw`);
            if (!response.ok) {
                res.setHeader('Content-Type', 'text/plain');
                return res.status(404).send('-- Error: Script tidak ditemukan atau kadaluarsa');
            }
            const scriptText = await response.text();
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            return res.status(200).send(scriptText);
        } catch (err) {
            res.setHeader('Content-Type', 'text/plain');
            return res.status(500).send('-- Error: Gagal mengambil script');
        }
    } else {
        res.setHeader('Content-Type', 'text/html');
        return res.status(403).send(`
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Access Denied | V-Secure</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
                <style>
                    body { background: #070b19; color: #ff4757; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; }
                    .card { background: #0f172a; padding: 40px; border-radius: 16px; border: 1px solid rgba(255, 71, 87, 0.3); box-shadow: 0 0 30px rgba(255, 71, 87, 0.2); max-width: 450px; }
                    i { font-size: 80px; margin-bottom: 20px; color: #ff4757; }
                    h1 { margin: 10px 0; font-size: 28px; letter-spacing: 2px; }
                    p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
                    .badge { background: rgba(255, 71, 87, 0.1); border: 1px solid #ff4757; color: #ff4757; padding: 6px 12px; border-radius: 20px; font-family: monospace; font-size: 12px; margin-top: 15px; display: inline-block; }
                </style>
            </head>
            <body>
                <div class="card">
                    <i class="fa-solid fa-lock"></i>
                    <h1>ACCESS DENIED</h1>
                    <p>Halaman ini dilindungi oleh sistem keamanan <strong>V-Secure</strong>. Akses langsung melalui Browser tidak diizinkan.</p>
                    <div class="badge">HANYA CLIENT ROBLOX YANG DAPAT AKSES KODE</div>
                </div>
            </body>
            </html>
        `);
    }
};
