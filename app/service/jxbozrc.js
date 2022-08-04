const Service = require('egg').Service;
var CryptoJS = require("crypto-js");

class BozrcService extends Service {

    async parse(url) {
        const result = await fetch('https://jx.bozrc.com:4433/player/analysis.php?v='+url)
        const html = await result.text();

        var regsp = '"url": "(.*?)"';
        var regsp2 = 'name="viewport".*?id="vod_(.*?)">';
        var regsp3 = 'charset="UTF-8" id="vod_(.*?)"';
        var urlt = html.match(regsp)[1];
        var viewport_id  = html.match(regsp2)[1];
        var uft8_id  = html.match(regsp3)[1];

        const data = jsse(urlt,jsreverse(viewport_id,uft8_id),true);

        return {
           message : '解析成功',
           data : data,
           status: 200
        };
    }
}
module.exports = BozrcService;



function compare(_0x209a13){
    return function(_0x4490c6,_0x47bde8){
        var _0x11d139=_0x4490c6[_0x209a13];
        var _0x2b383f=_0x47bde8[_0x209a13];
        return _0x11d139-_0x2b383f;
    }
}

function jsreverse  (str1,str2){
    var _pr = str1
    var _pu = str2;

    var _puArr  = [];
    var _newArr = [];
    var _code   = '';

    for(var i=0;i< _pu.length; i++){
        _puArr.push({ 'id':_pu[i], 'text': _pr[i] });
    }

    //对密钥重新进行排序
    _newArr = _puArr.sort(compare("id"));

    for(var i=0;i< _newArr.length; i++){
        
        _code+=_newArr[i]['text'];
    }
    return _code;
}

function jsse(_0x141a71,_0x433196,_0x45cf51){
    _0x433196=CryptoJS.MD5(_0x433196).toString();
    var _0x4f0cf6=CryptoJS.enc.Utf8.parse(_0x433196.substring(0,16));
    var _0x1030c4=CryptoJS.enc.Utf8.parse(_0x433196.substring(16));
    if(_0x45cf51){
        return CryptoJS.AES.decrypt(_0x141a71,_0x1030c4,{'iv':_0x4f0cf6,'padding':CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
    }
    return CryptoJS.AES.encrypt(_0x141a71,_0x1030c4,{'iv':_0x4f0cf6,'mode':CryptoJS.mode.CBC,'padding':CryptoJS.pad.Pkcs7}).toString();
}

