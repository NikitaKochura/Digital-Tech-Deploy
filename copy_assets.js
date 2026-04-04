const fs = require('fs');
const path = require('path');
const targetDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
fs.copyFileSync('C:/Users/zxcfo/.gemini/antigravity/brain/28b78451-061c-4b96-aba2-5de979587208/dp_keyb_1775223727300.png', path.join(targetDir, 'keyboard.png'));
fs.copyFileSync('C:/Users/zxcfo/.gemini/antigravity/brain/28b78451-061c-4b96-aba2-5de979587208/dp_mouse_1775223742285.png', path.join(targetDir, 'mouse.png'));
fs.copyFileSync('C:/Users/zxcfo/.gemini/antigravity/brain/28b78451-061c-4b96-aba2-5de979587208/dp_headset_1775223755680.png', path.join(targetDir, 'headset.png'));
