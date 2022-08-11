const Service = require('egg').Service;
var CryptoJS = require("crypto-js");
const axios = require('axios');
let cookie = '';

class JndywService extends Service {

    async parse(url) {
        const result = await this.ctx.curl('https://api.jhdyw.vip/?url=http://www.iqiyi.com/v_19rycrhak4.html',{dataType:'text'})
        const html =  result.data;
        cookie = result.headers['set-cookie'][0];
        var regsp2 = /(.*?i\()(.*?\))/g;
        const jss = html.match(regsp2)[0];
        var data = await eval(jss)

        return {
           message : '解析成功',
           data : data,
           code: 200
        };
    }

    
}
module.exports = JndywService;

async function i(url, data) {
    const config = {
        headers:{
        'cookie': cookie
        }
    };
    const result = await axios.post('https://api.jhdyw.vip/?resource',data,config).then(res => {
        return res.data;
    });
    let js = decrypt(result);
    var regsp2 = "url: '(.*?)'";
    return js.match(regsp2)[1];
}


function decrypt(str) {
    const key = CryptoJS.enc.Utf8.parse('89ffc596602d677a');
    const iv = CryptoJS.enc.Utf8.parse('d9cd43a3003d480d');
    const decrypted = CryptoJS.AES.decrypt(str, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.NoPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}