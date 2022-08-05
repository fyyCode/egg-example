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
    }
    if(res.data == ''){
      res.message =  '解析失败';
      res.code =  404;
    }
    ctx.body = res;
  }
}

module.exports = JxController;
