const Service = require('egg').Service;
var CryptoJS = require("crypto-js");

class Kan4Service extends Service {

    async parse(url) {
        const result = await this.ctx.curl('https://player.4kan.top/?url='+url,{dataType:'text'})
        const html =  result.data;
        var regsp = '        "url": getrandom(.*?),';
        var urlt = html.match(regsp)[1];
        console.log(urlt)

        var data = getrandom(urlt);

        return {
           message : '解析成功',
           data : data,
           code: 200
        };
    }
}
module.exports = Kan4Service;



function getrandom(_0x5522d9){
	string=_0x5522d9.substring(10,_0x5522d9.length-2);
    var b = Buffer.from(string,'base64');
    const data  = b.toString('utf8');
	return  data.substring(8,data.length-8);
}