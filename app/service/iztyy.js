const Service = require('egg').Service;
const CryptoJS = require("crypto-js");
var token_key = CryptoJS.enc.Utf8.parse("dvyYRQlnPRCMdQSe");
var token_iv = '';

class IztyyService extends Service {

    async parse(url) {
        const html = await this.ctx.curl('https://yun.iztyy.com/jx/?url='+url,{dataType:'text'});
        const res = await html.data;
        var regsp2 = 'var bt_token = "(.*?)"';
        token_iv = CryptoJS.enc.Utf8.parse(res.match(regsp2)[1]);    
        const regsp = '"url":"(.*?)"';
        const urld = res.match(regsp)[1];
        const data = decrypt(urld);

        return {    
           message : '解析成功',
           data : data,
           code: 200
        };
    }
}
module.exports = IztyyService;

function decrypt(_0x36acb1) {
    console.log(_0x36acb1+"="+token_iv+"="+token_key)
    return CryptoJS.AES.decrypt(_0x36acb1, token_key, {
      "iv": token_iv
    }).toString(CryptoJS.enc.Utf8);
  }