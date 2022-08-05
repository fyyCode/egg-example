const Service = require('egg').Service;
const puppeteer = require('puppeteer');


class UniverSalService extends Service {

    async parse(url) {
        let data = '';
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            
            await page.goto(url);
            const finalRequest = await page.waitForRequest(request => request.url().indexOf(".mp4")!=-1 && request.method() === 'GET');
            data = finalRequest.url();
            await browser.close();
          }catch(error){
            throw error;
          }

        return {
            message : '解析成功',
            data : data,
            code: 200
         };
    }
}
module.exports = UniverSalService;