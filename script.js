// State management
let currentTool = 'ip';
let accounts = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showTool('ip');
    typeWriter();
});

// Typewriter effect for subtitle
function typeWriter() {
    const text = ">_ 4 Advanced Tools in One Place_";
    const element = document.querySelector('.cyber-subtitle');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

// Show selected tool
function showTool(tool) {
    currentTool = tool;
    
    // Update menu buttons
    document.querySelectorAll('.cyber-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`menu-${tool}`).classList.add('active');
    
    // Load tool content with animation
    const container = document.getElementById('toolContainer');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        loadToolContent(tool);
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 300);
}

// Load tool content
function loadToolContent(tool) {
    const container = document.getElementById('toolContainer');
    
    switch(tool) {
        case 'ip':
            container.innerHTML = getIPToolHTML();
            break;
        case 'url':
            container.innerHTML = getURLToolHTML();
            break;
        case 'lyrics':
            container.innerHTML = getLyricsToolHTML();
            break;
        case 'gmail':
            container.innerHTML = getGmailToolHTML();
            break;
    }
}

// IP Lookup Tool HTML
function getIPToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🌐</div>
            <div class="tool-title">
                <h2>IP LOOKUP</h2>
                <p>>_ Track any IP address with precision_</p>
            </div>
        </div>
        
        <div class="input-group">
            <label>ENTER IP ADDRESS :</label>
            <input type="text" id="ipInput" class="input-field" placeholder="192.168.1.1" value="8.8.8.8">
        </div>
        
        <button class="btn-primary" onclick="lookupIP()">
            <i class="fas fa-search"></i> SCAN IP
        </button>
        
        <div id="ipLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>SCANNING TARGET...</span>
        </div>
        
        <div id="ipResult" class="result-box" style="display: none;">
            <div class="result-title">📡 INTELLIGENCE DATA :</div>
            <div id="ipInfo" class="result-content"></div>
        </div>
        
        <div id="ipError" class="error-message" style="display: none;"></div>
    `;
}

// URL Shortener Tool HTML
function getURLToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🔗</div>
            <div class="tool-title">
                <h2>URL SHORTENER</h2>
                <p>>_ Transform long URLs into cyber links_</p>
            </div>
        </div>
        
        <div class="input-group">
            <label>ENTER LONG URL :</label>
            <input type="url" id="urlInput" class="input-field" placeholder="https://very-long-url.com/page?param=value">
        </div>
        
        <button class="btn-primary" onclick="shortenURL()">
            <i class="fas fa-compress-alt"></i> SHORTEN URL
        </button>
        
        <div id="urlLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>GENERATING SHORT LINK...</span>
        </div>
        
        <div id="urlResult" class="result-box" style="display: none;">
            <div class="result-title">✅ SHORT LINK READY :</div>
            <div id="shortUrl" class="result-content"></div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="copyToClipboard()">
                <i class="fas fa-copy"></i> COPY TO CLIPBOARD
            </button>
        </div>
        
        <div id="urlError" class="error-message" style="display: none;"></div>
    `;
}

// Lyrics Finder Tool HTML
function getLyricsToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🎵</div>
            <div class="tool-title">
                <h2>LYRICS FINDER</h2>
                <p>>_ Find song lyrics instantly_</p>
            </div>
        </div>
        
        <div class="input-group">
            <label>SONG NAME :</label>
            <input type="text" id="songInput" class="input-field" placeholder="Believer, Shape of You, etc...">
        </div>
        
        <button class="btn-primary" onclick="searchLyrics()">
            <i class="fas fa-music"></i> FIND LYRICS
        </button>
        
        <div id="lyricsLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>SEARCHING LYRICS...</span>
        </div>
        
        <div id="lyricsResult" class="result-box" style="display: none;">
            <div class="result-title">📝 LYRICS FOUND :</div>
            <div id="lyricsContent" class="result-content" style="max-height: 400px; overflow-y: auto; white-space: pre-wrap;"></div>
        </div>
        
        <div id="lyricsError" class="error-message" style="display: none;"></div>
    `;
}

// Gmail Generator Tool HTML
function getGmailToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">📧</div>
            <div class="tool-title">
                <h2>GMAIL GENERATOR</h2>
                <p>>_ Generate random email accounts_</p>
            </div>
        </div>
        
        <div class="button-group" style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button class="btn-secondary" onclick="generateAccounts(1)" style="flex: 1;">
                <i class="fas fa-envelope"></i> 1 ACCOUNT
            </button>
            <button class="btn-secondary" onclick="generateAccounts(5)" style="flex: 1;">
                <i class="fas fa-envelopes-bulk"></i> 5 ACCOUNTS
            </button>
            <button class="btn-secondary" onclick="generateAccounts(10)" style="flex: 1;">
                <i class="fas fa-layer-group"></i> 10 ACCOUNTS
            </button>
        </div>
        
        <div class="button-group" style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button class="btn-secondary" onclick="generateStrongPassword()" style="flex: 1;">
                <i class="fas fa-lock"></i> STRONG PASS
            </button>
            <button class="btn-secondary" onclick="generateUsername()" style="flex: 1;">
                <i class="fas fa-gamepad"></i> USERNAME
            </button>
        </div>
        
        <div id="gmailLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>GENERATING ACCOUNTS...</span>
        </div>
        
        <div id="gmailResult" class="result-box" style="display: none;">
            <div class="result-title">📧 GENERATED ACCOUNTS :</div>
            <div id="accountsList" class="account-list"></div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="exportAccounts()">
                <i class="fas fa-download"></i> EXPORT AS TXT
            </button>
        </div>
        
        <div id="gmailError" class="error-message" style="display: none;"></div>
    `;
}

// IP Lookup Function
async function lookupIP() {
    const ip = document.getElementById('ipInput').value.trim();
    
    if (!ip) {
        showError('ipError', '⚠️ PLEASE ENTER IP ADDRESS');
        return;
    }

    showLoading('ipLoading', true);
    hideElement('ipResult');
    hideElement('ipError');

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,timezone,lat,lon`);
        const data = await response.json();

        if (data.status !== 'success') {
            throw new Error('Invalid IP Address');
        }

        const info = `┌─────────────────────┐
│   IP INFORMATION    │
└─────────────────────┘

🌐 IP TARGET   : ${ip}
📍 COUNTRY     : ${data.country}
🗺️  REGION      : ${data.regionName}
🏙️  CITY        : ${data.city}
📡 ISP         : ${data.isp}
⏰ TIMEZONE    : ${data.timezone}
📌 COORDINATES : ${data.lat}, ${data.lon}`;

        document.getElementById('ipInfo').textContent = info;
        showElement('ipResult');
    } catch (error) {
        showError('ipError', '⚠️ INVALID IP ADDRESS');
    } finally {
        showLoading('ipLoading', false);
    }
}

// URL Shortener Function
async function shortenURL() {
    const url = document.getElementById('urlInput').value.trim();
    
    if (!url) {
        showError('urlError', '⚠️ PLEASE ENTER URL');
        return;
    }

    if (!url.startsWith('http')) {
        showError('urlError', '⚠️ URL MUST START WITH http:// OR https://');
        return;
    }

    showLoading('urlLoading', true);
    hideElement('urlResult');
    hideElement('urlError');

    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('API Error');
        }
        
        const shortUrl = data.contents;
        document.getElementById('shortUrl').textContent = shortUrl;
        showElement('urlResult');
    } catch (error) {
        showError('urlError', '⚠️ CANNOT SHORTEN URL');
    } finally {
        showLoading('urlLoading', false);
    }
}

// Lyrics Search Function
async function searchLyrics() {
    const song = document.getElementById('songInput').value.trim();
    
    if (!song) {
        showError('lyricsError', '⚠️ PLEASE ENTER SONG NAME');
        return;
    }

    showLoading('lyricsLoading', true);
    hideElement('lyricsResult');
    hideElement('lyricsError');

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${song.replace(' ', '%20')}`);
        
        if (!response.ok) {
            throw new Error('Lyrics not found');
        }
        
        const data = await response.json();
        document.getElementById('lyricsContent').textContent = data.lyrics;
        showElement('lyricsResult');
    } catch (error) {
        const sampleLyrics = getSampleLyrics(song);
        document.getElementById('lyricsContent').textContent = sampleLyrics;
        showElement('lyricsResult');
    } finally {
        showLoading('lyricsLoading', false);
    }
}

// Gmail Generator Functions
function generateAccounts(amount) {
    showLoading('gmailLoading', true);
    hideElement('gmailResult');
    hideElement('gmailError');

    setTimeout(() => {
        let html = '┌─────────────────────┐\n';
        html += '│ GENERATED ACCOUNTS  │\n';
        html += '└─────────────────────┘\n\n';

        for (let i = 0; i < amount; i++) {
            const email = generateEmail();
            const password = generatePassword();
            accounts.push({email, password});
            html += `📧 [${i+1}] ${email}\n🔑 PASS : ${password}\n───────────────\n`;
        }

        document.getElementById('accountsList').innerHTML = html.replace(/\n/g, '<br>');
        showElement('gmailResult');
        showLoading('gmailLoading', false);
    }, 500);
}

function generateEmail() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let name = '';
    let num = '';
    
    for (let i = 0; i < 6; i++) {
        name += letters[Math.floor(Math.random() * letters.length)];
    }
    for (let i = 0; i < 3; i++) {
        num += numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    return `${name}${num}@gmail.com`;
}

function generatePassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

function generateStrongPassword() {
    const password = generatePassword(24);
    accounts.push({email: 'STRONG PASSWORD', password});
    document.getElementById('accountsList').innerHTML = `
        ┌─────────────────────┐<br>
        │  STRONG PASSWORD    │<br>
        └─────────────────────┘<br><br>
        🔐 ${password}
    `;
    showElement('gmailResult');
}

function generateUsername() {
    const names = ['shadow','ghost','dragon','ninja','storm','phoenix','tiger','wolf','eagle','knight','cyber','phantom'];
    const name = names[Math.floor(Math.random() * names.length)];
    const number = Math.floor(Math.random() * 9000) + 1000;
    const username = name + number;
    accounts.push({email: 'USERNAME', password: username});
    document.getElementById('accountsList').innerHTML = `
        ┌─────────────────────┐<br>
        │   COOL USERNAME     │<br>
        └─────────────────────┘<br><br>
        🎮 ${username}
    `;
    showElement('gmailResult');
}

function exportAccounts() {
    if (accounts.length === 0) {
        showError('gmailError', '⚠️ NO ACCOUNTS GENERATED YET');
        return;
    }

    let text = '╔════════════════════════╗\n';
    text += '║  GENERATED ACCOUNTS    ║\n';
    text += '╚════════════════════════╝\n\n';
    
    accounts.forEach((acc, index) => {
        text += `[${index + 1}] EMAIL : ${acc.email}\n`;
        text += `    PASS  : ${acc.password}\n`;
        text += '────────────────────────\n';
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts_${new Date().getTime()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Sample lyrics data (same as before)
function getSampleLyrics(song) {
    const lyrics = {
        'believer': `🎵 IMAGINE DRAGONS - BELIEVER 🎵

First things first
I'ma say all the words inside my head
I'm fired up and tired of the way that things have been, oh-ooh
The way that things have been, oh-ooh

Second thing second
Don't you tell me what you think that I could be
I'm the one at the sail, I'm the master of my sea, oh-ooh
The master of my sea, oh-ooh

[CHORUS]
Pain!
You made me a, you made me a believer, believer
Pain!
You break me down and build me up, believer, believer
Pain!
Oh let the bullets fly, oh let them rain
My life, my love, my drive, it came from...
Pain!
You made me a, you made me a believer, believer`,
        'shape of you': `🎵 ED SHEERAN - SHAPE OF YOU 🎵

The club isn't the best place to find a lover
So the bar is where I go
Me and my friends at the table doing shots
Drinking faster and then we talk slow

[CHORUS]
I'm in love with the shape of you
We push and pull like a magnet do
Although my heart is falling too
I'm in love with your body
And last night you were in my room
And now my bedsheets smell like you`
    };

    const lowerSong = song.toLowerCase();
    for (let key in lyrics) {
        if (lowerSong.includes(key)) {
            return lyrics[key];
        }
    }
    
    return `🎵 "${song.toUpperCase()}" 🎵\n\n⚠️ LYRICS NOT FOUND IN DATABASE\n\nPlease try another song like:\n• Believer\n• Shape of You\n• Someone Like You`;
}

// Utility Functions
function showLoading(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'flex' : 'none';
    }
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = message;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }
}

async function copyToClipboard() {
    const shortUrl = document.getElementById('shortUrl').textContent;
    try {
        await navigator.clipboard.writeText(shortUrl);
        alert('✅ LINK COPIED TO CLIPBOARD!');
    } catch (err) {
        alert('❌ COPY FAILED');
    }
}