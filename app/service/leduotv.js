const Service = require('egg').Service;

class LeDuoService extends Service {

    async parse(url) {
        const result = await fetch('https://api.leduotv.com/wp-api/ifrgf.php?isDp=1&vid='+url)
        const html = await result.text();
        console.log(html)

        var regsp = "var url1='(.*?)'";
        var urlt = html.match(regsp)[1];
        urlt = urlt.replace('RGlkLnBewqocD9WQ9WED92aWQ9WE1NVFU12awD92aWQ9WE19WE1NVFU1TWNVFU1TWQ9WE1NVFU1TWpaNrdt05','');
        var b = Buffer.from(urlt,'base64');
        const data  = b.toString('utf8'); // hex => 转成十六进制

        return {
           message : '解析成功',
           data : data,
           status: 200
        };
    }
}
module.exports = LeDuoService;