import React, { PureComponent } from 'react'
import './index.scss'
export default class index extends PureComponent {
    state={
        now:''
    }
    componentDidMount(){
        const date = new Date();
        let now = date.getHours()
        if(now>=8&&now<11){
            this.setState({now:'上午好'})
        }
        if(now>=11&&now<13){
            this.setState({now:'中午好'})
        }
        if(now>=13&&now<19){
            this.setState({now:'下午好'})
        }
        if(now>=19||now<8){
            this.setState({now:'早上好'})
        }
        
    }
    render() {
        return (
            <div>
                <div className="right_list_container">
                    <div className="right_list_outer">
                        <div className="right_list_box1">
                            <div className="right_list_box1_front">
                                <img src="https://s4.ax1x.com/2022/01/01/TIu03R.png" alt="err" id="calender_icon"/>
                                <span className='right_list_box1_front_font'>{this.state.now}</span>
                                <div className="right_list_box1_front_gosign">去签到</div>
                            </div>
                            <div className="right_list_box1_under">点亮你在社区的每一天</div>
                        </div>
                        <div className="right_list_box2">
                            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.e8f8c43.png" alt="err" id="right_list_box2_qrcode"/>
                            <div className="right_list_box2_right">
                                <span className='right_list_box2_firstline'>下载稀土掘金APP</span>
                                <span className='right_list_box2_secondline'>一个帮助开发者成长的社区</span>
                            </div>
                        </div>
                        <div className="right_list_box3">
                            <div className="right_list_box3_title">
                                🎖️作者榜
                            </div>
                            <div className="right_list_box3_authors">
                                <div className="right_list_box3_author">
                                    <img className="right_list_box3_author_avator" src="https://p6-passport.byteacctimg.com/img/user-avatar/ceff4560c9a0b128a71587e297ef2617~300x300.image" alt="err"/>
                                    <div className="right_list_box3_author_rightpart">
                                        <span className="right_list_box3_author_rightpart_fisrtline">
                                            阿里巴巴云原生
                                            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg" alt="err" className='level_icon'/>
                                        </span>
                                        <span className="right_list_box3_author_rightpart_secondline">
                                            阿里巴巴云原生公众号@...
                                        </span>
                                    </div>
                                </div>
                                <div className="right_list_box3_author">
                                    <img className="right_list_box3_author_avator" src="https://p6-passport.byteacctimg.com/img/mosaic-legacy/3793/3114521287~300x300.image" alt="err"/>
                                    <div className="right_list_box3_author_rightpart">
                                        <span className="right_list_box3_author_rightpart_fisrtline">
                                            源码超级联盟
                                            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f597b88d22ce5370bd94495780459040.svg" alt="err" className='level_icon'/>
                                        </span>
                                        <span className="right_list_box3_author_rightpart_secondline">
                                            技术专家
                                        </span>
                                    </div>
                                </div>
                                <div className="right_list_box3_author">
                                    <img className="right_list_box3_author_avator" src="https://p6-passport.byteacctimg.com/img/user-avatar/14c650b3b51a604323bc6b9ffac795b5~300x300.image" alt="err"/>
                                    <div className="right_list_box3_author_rightpart">
                                        <span className="right_list_box3_author_rightpart_fisrtline">
                                            Jimmy_fx
                                            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg" alt="err" className='level_icon'/>
                                        </span>
                                        <span className="right_list_box3_author_rightpart_secondline">
                                            前端工程师 @ 不知名公司
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="right_list_box3_footer">
                                <span>完整榜单</span>
                                <img src="https://s4.ax1x.com/2022/01/01/TIavuD.png" alt="err"/>
                            </div>
                        </div>
                        <div className="right_list_box4">
                            <div className="right_list_box4_item">
                                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-tutu.d58819c.png" alt="err" className='right_list_box4_item_img'/>
                                <span>稀土掘金漫游指南</span>
                            </div>
                            <div className="right_list_box4_item">
                                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-extension-icon.4b79fb4.png" alt="err" className='right_list_box4_item_img'/>
                                <span>安装掘金浏览器插件</span>
                            </div>
                            <div className="right_list_box4_item">
                                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-miner.b78347c.png" alt="err" className='right_list_box4_item_img'/>
                                <span>前往掘金翻译计划</span>
                            </div>
                        </div>
                        <div className="right_list_box5">
                            <ul>

                                <li><a>关于</a></li>
                                
                                <li><a>营业执照</a></li>
                                
                                <li><a>友情链接</a></li>
                                <li><a>更多文章</a></li>
                                <li><a>用户协议</a></li>
                                <li><a>隐私政策</a></li>
                                <li><a>使用指南</a></li>
                                <li><a>京ICP备18012699号-3</a></li>
                                <li><a><img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/police.d0289dc.png" alt="err" /> 京公网安备11010802026719号 </a></li>

                                <span>版权所有：北京北比信息技术有限公司</span>
                                <span>公司地址：北京市海淀区信息路甲28号13层B座13B-5</span>
                                <span>公司座机：010-83434395</span>
                                <span>举报邮箱： <a>feedback@xitu.io</a></span>
                                <li><a>©2022 稀土掘金</a></li>

                            </ul>
                            <br></br>
                            <li>
                                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/weibo.0cd39f5.png" alt="err" id="weibo_icon"/>
                            </li>
                            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/wechat.ce329e6.png" alt="err" id="weixin_icon"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
