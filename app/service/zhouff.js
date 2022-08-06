const Service = require('egg').Service;
var CryptoJS = require("crypto-js");

class ZhoufService extends Service {

    async parse(url) {
        const result = await this.ctx.curl("https://jx.zhouff.com:13388/js1/analysis.php?v="+url, {headers:{
        "Pragma":"no-cache",
        "Cache-Control":"no-cache",
        "Upgrade-Insecure-Requests":"1",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Sec-Fetch-Site":"same-origin",
        "Sec-Fetch-Mode":"navigate",
        "Sec-Fetch-Dest":"iframe",
        "Referer":"https://jx.zhouff.com:13388/js1/?url=https://v.qq.com/x/cover/mzc00200vmd652y/w00439okmxo.html",
        "Accept-Encoding":"gzip, deflate, br",
        "Accept-Language":"zh-CN,zh;q=0.9"},dataType:'text'
          })
        const html =  result.data;
        var regsp = 'var urls = "(.*?)"';
        var urlt = html.match(regsp)[1];
        let data = urlt;

        return {
           message : '解析成功',
           data : data,
           code: 200
        };
    }
}
module.exports = ZhoufService;