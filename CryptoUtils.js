// CryptoUtils.js
const crypto = require('crypto');

class CryptoUtils {
    static generateSecretKey() {
        return crypto.randomBytes(32).toString('hex'); // 256-bit key
    }

    static generateHMAC(message, key) {
        const hmac = crypto.createHmac('sha256', Buffer.from(key, 'hex'));
        hmac.update(message);
        return hmac.digest('hex').toUpperCase();
    }
}

module.exports = CryptoUtils;
