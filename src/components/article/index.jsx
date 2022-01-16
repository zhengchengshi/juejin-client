import React, { PureComponent } from 'react'
import './index.scss'
import api from '../../service/api'
import Mask from '../mask'
import { withRouter } from 'react-router-dom'
import PubSub from 'pubsub-js'
class Article extends PureComponent {
    state={
        data:{
            title:'',
            author:'',
            authorAvator:'',
            authorLevel:'',
            postTime:'',
            readNum:'',
            articleContent:``,
            remarkNum:'',
            remarkContent:[
                {
                    remarkerAvator:'',
                    remarkerName:'',
                    remarkerLevel:'',
                    remarkerPosition:'',
                    remarkContent:'',
                    secondLevelRemarker:[
                        {
                            secondLevelRemarkerAvator:"",
                            secondLevelRemarkerName:'',
                            secondLevelRemarkerContent:''
                        }
                    ],
                }
            ],
        },
        contentDOM:{},
        markdownStyle:{},
        controlPresent:{display:'none'},
        controlPresent2:{},
    }
    componentDidMount(){
        // const {data} = this.state
        api.post('/article',{Route:this.props.history.location.pathname}).then(res=>{
            console.log(res)
            this.setState({data:res.data},()=>{
                // console.log(this.state.data.remarkNum.indexOf(`最`))
                // console.log(this.state.data.articleContent)
                PubSub.publish('flag',{flag:true})

                this.article_content.innerHTML = this.state.data.articleContent.toString()
                this.setState({controlPresent:{},controlPresent2:{display:'none'}})
                // PubSub.publish('flag',{flag:true})
                // this.setState({contentDOM:parseDom(this.state.data.articleContent)},()=>{
                //     console.log(this.state.contentDOM)
                //     const articleArr = []
                //     const styleArr = []
                //     // 将元素存入空数组并转为字符串
                //     this.state.contentDOM.forEach((item,index,arr)=>{
                //         console.log(item.innerHTML)
                //         // 过滤第一条和最后一条
                //         // if(index!==0&&index!==arr.length-1){
                //             articleArr.push(item.innerHTML)
                //         // }
                //         // else{
                //         //     styleArr.push(item.innerHTML.toString())
                //         // }
                //     })
                //     this.article_content.innerHTML = articleArr.toString()
                //     // this.setState({markdownStyle:styleArr[0]})
                //     console.log()
                //     //  = this.state.contentDOM
                // })
            })
        })
    }
    render() {
        const {data,controlPresent,controlPresent2} = this.state
        // console.log(contentDOM)
        return (
            <div>
                <div style={controlPresent2}>
                    <Mask></Mask>
                </div>
                <div className="article_container" style={controlPresent}>
                    <div className="article_outer">
                        <h1>{data.title}</h1>
                        <div className="article_information">
                            <div className="article_information_leftpart">
                                <img src={data.authorAvator} alt="err" className="avator"/>
                            </div>
                            <div className="article_information_rightpart">
                                <div className='user_information'>{data.author}<img src={data.authorLevel} alt="err" className='level'/></div>
                                <div className="article_post_information">
                                    <span className="post_time">{data.postTime}</span>
                                    <span className="read_num">{data.readNum}</span>
                                </div>
                            </div>
                        </div>
                        {/* 插入markdown */}
                        <div className="article_content" ref={currentNode =>this.article_content = currentNode} style={this.state.markdownStyle}></div>
                        <div className="remark">
                                        <h2>{data.remarkNum.substring(0,data.remarkNum.indexOf("最"))}</h2>
                        {
                            data.remarkContent.map((item,index)=>{
                                return(
                                    
                                        <div className="remarker_information" key={index}>
                                            <img className="remarker_avator" src={item.remarkerAvator} alt="err"/>
                                            <div className="right_part">
                                                <div className="right_part_header">
                                                    <span className='remarker_name'>{item.remarkerName}</span>
                                                    <img src={item.remarkerLevel} alt="err" />
                                                    <span className='remarker_position'>{item.remarkerPosition}</span>
                                                </div>
                                                <div className="remark_content">
                                                    {item.remarkContent}
                                                </div>
                                                {
                                                    item.secondLevelRemarker.map((item,index)=>{
                                                        return(
                                                            <div className="second_level_remarker_outer" key={index}>
                                                                <div className="second_level_remarker">
                                                                    <div className="second_level_remarker_information">
                                                                        <img src={item.secondLevelRemarkerAvator} alt="err" className='second_level_remarker_avator'/>
                                                                        <div className="second_level_remarker_right_part">
                                                                            <span className='second_level_remarker_name'>{item.secondLevelRemarkerName}</span>
                                                                            <div className="second_level_remarker_content">
                                                                                {item.secondLevelRemarkerContent}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                            </div>
                                        </div>
                                    
                                )
                            })
                        }
                        </div> 
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Article);