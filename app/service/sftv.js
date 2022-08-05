const Service = require('egg').Service;

class SfTvService extends Service {

    async parse(url) {
        
        const result = await this.ctx.curl('https://sf.sftv.ml/player/analysis.php?v='+url,{dataType:'text'});

        const html =  result.data;


        var regsp = '"url": "(.*?)"';
        var urlt = html.match(regsp)[1];
       
        const data  = rc4(urlt,'97013266',1);

        return {
           message : '解析成功',
           data : data,
           status: 200
        };
    }
}
module.exports = SfTvService;

function rc4(data,key,t)
{
    var pwd = key || 'ffsirllq';
    var cipher      = '';
    var key       = [];
    var box       = [];
    var pwd_length  = pwd.length;
    if(t == 1) {
        var data = atob(data);
    }else{
        var data = encodeURIComponent(data);
    }
    
    
    var data_length = data.length;

    for (i = 0; i < 256; i++) {
        key[i] = pwd[i % pwd_length].charCodeAt();
        box[i] = i;
    }
    for (j = i = 0; i < 256; i++) {
        j = (j + box[i] + key[i]) % 256;
        tmp = box[i];
        box[i] = box[j];
        box[j] = tmp;
    }
    for (a = j = i = 0; i < data_length; i++) {
        a       = (a + 1) % 256;
        j       = (j + box[a]) % 256;
        tmp     = box[a];
        box[a] = box[j];
        box[j] = tmp;
        k       = box[((box[a] + box[j]) % 256)];
        cipher += String.fromCharCode(data[i].charCodeAt() ^ k);
    }
    if(t == 1){
            return decodeURIComponent(cipher);
    }else{
            return btoa(cipher);
    }
}