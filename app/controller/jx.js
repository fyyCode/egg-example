'use strict';

const Controller = require('egg').Controller;

class JxController extends Controller {
 
  async data() {
    const { ctx } = this;
    const url = this.ctx.query.url;
    const site = this.ctx.params.site;
    this.logger.debug("receive site is %s , and url is %s", site,url);

    let res ={};

    if('jx.bozrc' == site){
        res = await this.ctx.service.jxbozrc.parse(url);
    }else if('api.leduotv' == site){
        res = await this.ctx.service.leduotv.parse(url);
    }else if('universal' == site){
        res = await this.ctx.service.universal.parse(url);
    }else if('sf.sftv' == site){
      res = await this.ctx.service.sftv.parse(url);
    }else if('4kan' == site){
      res = await this.ctx.service.kan4.parse(url);
    }else if('zhouff' == site){
      res = await this.ctx.service.zhouff.parse(url);
    }else if('icu' == site){
      res = await this.ctx.service.icu.parse(url);
    }else if('iztyy' == site){
      res = await this.ctx.service.iztyy.parse(url);
    }else if('jhdyw' == site){
      res = await this.ctx.service.jhdyw.parse(url);
    }
    if(!res.data){
      res.message =  '解析失败';
      res.code =  404;
    }else{
      res.url = res.data;
    }
    ctx.body = res;
  }
}

module.exports = JxController;
