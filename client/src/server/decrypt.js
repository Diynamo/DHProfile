const crypto = require('crypto');

const secret = process.env.REACT_APP_SECRET;
const algorithm = process.env.REACT_APP_ALGORITHM;

export default function decrypt(text) {
    const t = text;
	const textParts = t.split(':');
	const iv = textParts[0]
	const encryptedText = textParts[1]
	const decipher = crypto.createDecipheriv(algorithm, secret, iv);
	const decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    return (decrypted + decipher.final('utf8'));
}