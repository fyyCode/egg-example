const Service = require('egg').Service;
var CryptoJS = require("crypto-js");

class IcuService extends Service {

    async parse(url) {
        const result = await this.ctx.curl('https://json.icu/?url='+url,{dataType:'text'})
        const html =  result.data;

        var regsp = 'var le_token = "(.*?)"';
        var tok = html.match(regsp)[1];

        var regsp2 = /(?<=\(")\S+(?="\))/g;
        var urlt = html.match(regsp2)[0];

        var _token_key=CryptoJS.enc.Utf8.parse('A42EAC0C2B401928');
        var _token_iv=CryptoJS.enc.Utf8.parse(tok);
        
        
       const data = v_decrypt(urlt,_token_key,_token_iv);
       

        return {
           message : '解析成功',
           data : data,
           code: 200
        };
    }
}
function v_decrypt(_0x5c9a16,_0x3aa3e5,_0x31e4e){
    return CryptoJS.AES.decrypt(_0x5c9a16,_0x3aa3e5,{'iv':_0x31e4e}).toString(CryptoJS.enc.Utf8);
}
module.exports = IcuService;
