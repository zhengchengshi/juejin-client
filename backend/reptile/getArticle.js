const puppeteer = require('puppeteer');
(async()=>{
  // 全局开启浏览器
    browser = await puppeteer.launch({
        headless: false
    })
    page2 = await browser.newPage();
    })().catch(err=>{
        if(err)throw err;
    }).catch(err=>{
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
            await page2.goto(`https://juejin.cn${route}`);
        }
        else{
            console.log(`route${route}`)
            await page2.goto(`https://juejin.cn/post/7050262140862595103`);
        }
    
        // 等待title节点出现
        await page2.waitForSelector('.list .comment');
        // await page2.evaluate(async () => {
        //     await new Promise((resolve, reject) => {
        //         // const commentDOMHeight = document.querySelector('.comment-list-box').getBoundingClientRect().top
        //       // 页面的当前高度
        //       let totalHeight = 0;
        //       // 每次向下滚动的距离
        //       let distance = 100;
        //       // 通过setInterval循环执行
        //       let timer = setInterval(() => {
        //         let scrollHeight = document.body.scrollHeight;
        
        //         // 执行滚动操作
        //         window.scrollBy(0, distance);
        
        //         // 如果滚动的距离大于当前元素高度则停止执行
        //         totalHeight += distance;
        //         if (totalHeight >= scrollHeight) {
        //           clearInterval(timer);
        //           resolve();
        //         }
        //       }, 10);
        //     });
        //   });
        let articleInfo = await page2.evaluate(() => {
            let articleInfoObj = {
                title:document.querySelector('.article .article-title').innerText,
                author:document.querySelector('.article .author-info-block .author-info-box .name').innerText,
                authorAvator:document.querySelector('.article .author-info-block .avatar').src,
                authorLevel:document.querySelector('.article .author-info-block .author-info-box img').src,
                postTime:document.querySelector('.article .author-info-block .author-info-box .time').innerText,
                readNum:document.querySelector('.article .author-info-block .author-info-box .views-count').innerText,
                articleContent:document.querySelector('.article .article-content .markdown-body').innerHTML,
                remarkNum:document.querySelector('#comment-box .comment-list-wrapper .title').innerText,
                remarkContent:Array.from(document.querySelectorAll('.comment-list .comment')).map(item=>{
                    let exist = false
                    if(item.querySelector('.popover .user-link img')&&item.querySelector('.content-box .comment-main .user-box .username .rank img')&&item.querySelector('.content-box .comment-main .user-box .position')){
                        exist = true
                    }
                    // console.log(item)
                    return({
                        remarkerAvator:exist?item.querySelector('.popover .user-link img').src:'',
                        remarkerName:item.querySelector('.content-box .comment-main .user-box .username .name').innerText,
                        remarkerLevel:exist?item.querySelector('.content-box .comment-main .user-box .username .rank img').src:'',
                        remarkerPosition:exist?item.querySelector('.content-box .comment-main .user-box .position').src:'',
                        remarkContent:item.querySelector('.content-box .comment-main .content').innerText,
                        secondLevelRemarker:Array.from(item.querySelectorAll('.sub-comment-list .sub-comment')).map(secondItem=>{
                                return({
                                    secondLevelRemarkerAvator:secondItem.querySelector('.popover-box .user-link img').src,
                                    secondLevelRemarkerName:secondItem.querySelector('.content-box .user-box .popover-box .name').innerText,
                                    secondLevelRemarkerContent:secondItem.querySelector('.content-box .content').innerText
                                })
                        })
                        
                    })
                })
            }
        
          return articleInfoObj;
        });
        console.log(articleInfo)
        return articleInfo;


    }

}