const puppeteer = require('puppeteer');
(async()=>{
  // 全局开启浏览器
  browser = await puppeteer.launch({
    // headless: false
  })
  page1 = await browser.newPage();
  })().catch(err=>{
    if(err)throw err;
  })
// 在一个默认的浏览器上下文中被创建一个新页面
module.exports = async (route,flag)=>{
      // 控制require引入时调用报错
      if(flag){
        // 空白页刚问该指定网址
        // console.log(page1)
        if(route!==undefined){
          console.log(`https://juejin.cn${route}`)
          await page1.goto(`https://juejin.cn${route}`);
        }
        else{
          console.log(`route${route}`)
          await page1.goto(`https://juejin.cn${route}`);
        }
        // 如果获取失败则反复重新获取
        // await page1.evaluate(()=>{
          
        //   while(document.querySelector('.entry')&&route!==undefined){
        //     page1.goto(`https://juejin.cn${route}`);
        //   }
        // })
        // 等待title节点出现
        await page1.waitForSelector('.entry');
        
        let titleDomText = await page1.evaluate(() => {
          
            
            let titleDomTextList = Array.from(document.querySelectorAll('.entry')).map((item) => {
              let exist = false
              if(item.querySelector('.content-wrapper .lazy')){
                exist = true
              }
              return {
                id:item.getAttribute('data-entry-id'),
                author:item.querySelector('.meta-container .user-popover').innerText,
                postTime:item.querySelector('.meta-container .date').innerText,
                tag:item.querySelector('.meta-container .tag').innerText,
                postTitle:item.querySelector('.content-wrapper .content-main .title-row .title').innerText,
                description:item.querySelector('.content-wrapper .content-main .abstract a').innerText,
                watchNum:item.querySelector('.content-wrapper .content-main .action-list .view span').innerText,
                thumbNum:item.querySelector('.content-wrapper .content-main .action-list .like span').innerText,
                commentNum:item.querySelector('.content-wrapper .content-main .action-list .comment span').innerText,
                // imgUrl:exist?item.querySelector('.content-wrapper img').getAttribute('data-src'):null
                imgUrl:null
    
              };
            });
            let tag = Array.from(document.querySelectorAll('.tag-nav .nav-list .nav-item')).map(item=>{
              let exist = false
              if(item.querySelector('a')){
                exist = true
              }
              return{
                tag:exist?item.querySelector('a').innerHTML:null
              }
            })
            // const titleDom = document.querySelector('.entry .meta-container .user-popover')
            return {titleDomTextList,tag};
        });
        // console.log(titleDomText.titleDomTextList.imgUrl)
        // await browser.close();
        return titleDomText;

      }

}