import React, { PureComponent } from 'react'
import './index.scss'
// import fake_data from '../../service/fake_data'
// import axios from 'axios'
import api from '../../service/api'
import Pubsub from 'pubsub-js'
import { withRouter } from 'react-router-dom'
class Content_body extends PureComponent {
    state={
        data:[
            {
                author:'',
                postTime:'',
                tag:'',
                postTitle:'',
                description:'',
                watchNum:'',
                thumbNum:'',
                commentNum:'',
                imgUrl:'',
                id:''
            }
        ]
    }
    componentDidMount(){
        let that = this
        window.onscroll= function(){
            //文档内容实际高度（包括超出视窗的溢出部分）
            var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            //滚动条滚动距离
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //窗口可视范围高度
            var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
            
            if(clientHeight + scrollTop >= scrollHeight){
                if(that.props.history.location.pathname!=='/history'){
                    api.post(`/homepage`,{route:that.props.history.location.pathname}).then(res=>{
                        // console.log(res.data.titleDomTextList)
                        // console.log(that.state.data)
                        that.setState({data:[...that.state.data,...res.data.titleDomTextList]})
                        // console.log(res.data.tag);
                    })
                    console.log("===加载更多内容===");
                }
            }
        }
        // 发送非history和post请求
        if(this.props.history.location.pathname!=='/post'||this.props.history.location.pathname!=='history'){
            api.post(`/homepage`,{route:this.props.history.location.pathname}).then(res=>{

                // console.log(res)
                this.setState({data:res.data.titleDomTextList})
                Pubsub.publish('tag',res.data.tag)
                // 传给Content组件控制遮罩呈现
                Pubsub.publish('getInfo',{flag:true})
                Pubsub.publish('flag',{flag:true})

                // console.log(res.data.tag);
            })
        }
        // history请求
        if(this.props.history.location.pathname === '/history'){
            api.get('/history').then(res=>{
                this.setState({data:res.data})
                Pubsub.publish('flag',{flag:true})

            }).catch(err=>{if(err)throw err;})
        }
        
        // 路由变化一次就发送一次请求
        this.props.history.listen((location)=>{
            // console.log(location.pathname)
            if(location.pathname!=='/history'){
                api.post('/homepage',{route:location.pathname}).then(res=>{
                    // console.log(res)
                    this.setState({data:res.data.titleDomTextList})
                    Pubsub.publish('tag',res.data.tag)
                    Pubsub.publish('closeMask',{flag:true})
                    Pubsub.publish('flag',{flag:true})

                    // console.log(res.data.tag);
                })
            }
            else{
                api.get('/history').then(res=>{

                    this.setState({data:res.data})
                    Pubsub.publish('flag',{flag:true})

                }).catch(err=>{if(err)throw err;})
            }
            // console.log();
        })
        
    }
    goArticle=(item)=>{
        return()=>{
            // console.log(this.state.data.id)
            // console.log(item)
            api.put('/addHistory',{data:item})
            window.open(`http://47.99.81.255:8081/post/${item.id}`)
        }
            
    }
    render() {
        const {data} = this.state
        return (
            <div>
                <div className="content_body_container">
                    <div className="content_body_outer">
                        {
                            data.map((item,index)=>{
                                    return(
                                    <a key={index}>
                                        <div className="content_body_item" onClick={this.goArticle(item)} >
                                            <div className="content_body_item_left">
                                                <div className="content_body_item_firstline">
                                                    <span>{item.author}</span>
                                                    &emsp;&nbsp;
                                                    <span>{item.postTime}</span>
                                                    &emsp;&nbsp;
                                                    <span>{item.tag}</span>
                                                </div>
                                                <div className="content_body_item_secondpart">
                                                    <div className="content_body_item_title">
                                                        <strong>{item.postTitle}</strong>
                                                    </div>
                                                    <div className="content_body_item_description">
                                                    {item.description}
                                                    </div>
                                                    <div className="content_body_item_secondpart_bottom">
                                                        <img src="https://s4.ax1x.com/2022/01/01/TIoepV.png" alt="err" className='watch_icon'/>
                                                        <span>{item.watchNum}</span>
                                                        <img src="https://s4.ax1x.com/2022/01/01/TIoYp6.png" alt="err" className='thumb_icon'/>
                                                        <span>{item.thumbNum}</span>
                                                        <img src="https://s4.ax1x.com/2022/01/01/TIozNR.png" alt="err" className='comment_icon'/>
                                                        <span>{item.commentNum}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content_body_item_right">
                                                {
                                                    item.imgUrl?<img src={item.imgUrl} alt="err" className='content_body_item_img'/>:''
                                                }
                                                
                                            </div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Content_body)