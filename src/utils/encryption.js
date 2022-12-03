import CryptoJS from 'crypto-js'
import JSEncrypt from 'encryptlong'

//默认的AesKEY
const AES_KEY_SIZE = 128 / 8;
let aesKey = "68r7jExnnPDPYmWd";
let aesIv = "ey8D2IXzh6UT1eTQ";
let key = CryptoJS.enc.Utf8.parse(aesKey); 
let iv = CryptoJS.enc.Utf8.parse(aesIv); 
let pubKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zd6/TfX6/eWUhYmSg/0F0n7zOYc+i/PDhWhAmlW/eXjRFsphuxJEHvzbcDaCBvG92eD1xZl83iRikWYSpBEmXFKm28QS1C+iZi7dUxm+btmodVxUzzG2sNemnZLMis0svy7YCQMsW2ScZqiFQ6yGj9yQ1VgqeZjNc6e0oVNVvQklx1zLqQPl5Gup3aC7dEo4BNn6MkZMizspgHyAVUhXCRjVMgF4p6jNanfY+sVjz09OVckjWL/ioc3LfcPhznsIWnybI5rQFWw+ofpn/mfa679xgoXWffPRxSlWavTaxfre26K7M/fXCmbIfcrA4Jz5/bwbVw5oGBPSFPEXmtfkQIDAQAB";
export default {
    /**
     * 初始化
     */
    init() {
        this.createAesKey();
        this.createAesIv();
    },
    /**
     * 获得 128位的AES 密钥
     */
    createAesKey() {
        let library = "abcdef123456";
        let key = "";
        for (var i = 0; i < AES_KEY_SIZE; i++) {
            let randomPoz = Math.floor(Math.random() * library.length);
            key += library.substring(randomPoz, randomPoz + 1);
        }
        this.aesKey = CryptoJS.enc.Hex.parse(key);
    },
    /**
     * 获得 128位的AES Iv
     */
    createAesIv() {
        let library = "abcdef123456";
        let Iv = "";
        for (var i = 0; i < AES_KEY_SIZE; i++) {
            let randomPoz = Math.floor(Math.random() * library.length);
            Iv += library.substring(randomPoz, randomPoz + 1);
        }
        this.aesIv = CryptoJS.enc.Hex.parse(Iv);
    },
    //TODO 解密失败
    aesDecrypt(data) {
        this.iv = CryptoJS.enc.Utf8.parse(this.getAesIv);
        this.key = CryptoJS.enc.Utf8.parse(this.getAesKey)
        
        //let encryptedHexStr = CryptoJS.enc.Hex.parse(data);
        let srcs = CryptoJS.enc.Base64.parse(data);        
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { 
            iv: iv, 
            mode: CryptoJS.mode.CBC, 
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },
    /**
     * 使用aes进行加密
     * @param {string} data 
     * @returns 加密后的数据
     */
    aesEncrypt(data) {
        this.iv = CryptoJS.enc.Utf8.parse(this.getAesIv);
        this.key = CryptoJS.enc.Utf8.parse(this.getAesKey);

        let srcs = CryptoJS.enc.Utf8.parse(data);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { 
            iv: this.iv, 
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString();
    },


    /**
     * 
     * @param {string} aesKey 
     */
    setAesKey(aesKey) {
        this.aesKey = aesKey;
    },
    /**
 * 
 * @param {string} aesIv
 */
    setAesIv(aesIv) {
        this.aesIv = aesIv;
    },
    /**
     * @returns 获取AesKEY
     */
    getAesKey() {
        return this.aesKey;
    },

    /**
     * 
     * @returns 获取aesiv
     */
    getAesIv() {
        return this.aesIv;
    },
    /**
     * @returns 获取加密后的AesKEY
     */
    getAesKeyByRsa() {
        return this.encryptionByPublicKey(this.aesKey);
    },

    /**
     * @returns 获取加密后的AesIv
     */
    getAesIvByRsa() {
        return this.encryptionByPublicKey(this.aesIv);
    },


    /**
     * 根据公钥对明文进行加密
     * @param {String} plaintext 明文
     * @returns {String|boolean}
     */
    encryptionByPublicKey(plaintext) {
        let encryptor = new JSEncrypt(2048);
        encryptor.setPublicKey(pubKey);
        return encryptor.encryptLong(encodeURI(plaintext));
    },
    //TODO 解密失败
    /**
     * 根据私钥对密文进行解密
     * @param {String} ciphertext 密文
     * @returns {String|boolean}
     */
    decryptByPublicKey(ciphertext) {

        let encryptor = new JSEncrypt(2048);
        encryptor.setPublicKey(pubKey);
        return encryptor.decrypt(ciphertext);

    }

}