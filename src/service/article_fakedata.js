export default{
   title:'使用React Hooks模拟生命周期',
   author:'王二球',
   authorAvator:'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/1/16c4cf8ae57c447e~tplv-t2oaga2asx-no-mark:100:100:100:100.awebp',
   authorLevel:'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg',
   postTime:'2019年08月22日 09:18',
   readNum:20971,
   artivleContent:`<div className="article_cover">
   <img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/22/16cb6e40ef607716~tplv-t2oaga2asx-watermark.awebp" alt="err" className='article_cover_img'/>
</div>
<div className="article_content">
   <h2>前言</h2>
   <p>在 React 16.8 之前，函数组件只能是无状态组件，也不能访问 react 生命周期。hook 做为 react 新增特性，可以让我们在不编写 class 的情况下使用 state 以及其他的 react 特性，例如生命周期。接下来我们便举例说明如何使用 hooks 来模拟比较常见的 class 组件生命周期。</p>
</div>`,
    remarkNum:2,
    remarkContent:[
        {
            remarkerAvator:'https://p3-passport.byteacctimg.com/img/user-avatar/18253b9594b334a96b75a2e4359588ec~300x300.image',
            remarkerName:'止于暴富',
            remarkerLevel:'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f597b88d22ce5370bd94495780459040.svg',
            remarkerPosition:'FE @ 笔记本',
            remarkContent:'componentWillUnmount 并不能用 useEffect 仿写，useEffect 返回的方法会在更新和卸载时调用，而useEffect 只在卸载时调用',
            secondLevelRemarker:[
                {
                    secondLevelRemarkerAvator:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/16/170e14ba994fb8ec~tplv-t2oaga2asx-no-mark:100:100:100:100.awebp",
                    secondLevelRemarkerName:'叶子成才之路',
                    secondLevelRemarkerContent:'可以传入空数组旨在把卸载时调用'
                }
            ],
        }
    ],
}