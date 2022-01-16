import React, { PureComponent } from 'react'
import FixedNav from '../../pages/fixed_nav'
import RightList from '../right_list'
import HiddenTag from '../../pages/hiddenTag'
import { withRouter } from 'react-router-dom'
import Mask from '../mask'
import ContentBody from '../content_body'
import PubSub from 'pubsub-js'
import api from '../../service/api'
import './index.scss'
class Content extends PureComponent {
    state={
        hiddenStyle:{},
        controlMask:[{},{display:'none'}]
    }
    // 此组件主要用于控制是否呈现
    componentDidMount(){
        // 初始状态时，消除标签
        if(this.props.history.location.pathname==='/'){
            this.setState({hiddenStyle:{display:'none'}})
        }

        // 如果跳到history路由，消除hiddentag，展示contentBody
        if(this.props.location.pathname === '/history'){
            this.setState({controlMask:[{display:'none'},{}]})
        }
        // 特定路由也消除标签
        if(this.props.history.location==='following'||'recommended'||'/'||'/history'){
            this.setState({hiddenStyle:{display:'none'}})
        }
        else{
            this.setState({hiddenStyle:{}})
        }
        PubSub.subscribe('getInfo',(msg,data)=>{
            if(data.flag){
                // console.log(this.state.controlMask)
                this.setState({controlMask:[{display:'none'},{}]})
            }
        })
        this.props.history.listen((location)=>{
            // 跳转特定路由消除标签
            if(location.pathname.indexOf('following')===1||location.pathname.indexOf('recommended')===1||location.pathname === '/'||location.pathname === '/history'){
                this.setState({hiddenStyle:{display:'none'}})
            }
            else{
                this.setState({hiddenStyle:{}})
            }
            // 如果跳到history路由，消除hiddentag，展示contentBody
            
            // 设置遮罩是否呈现
            if(location.pathname !== '/history'){
                this.setState({controlMask:[{},{display:'none'}]},()=>{
                    PubSub.subscribe('closeMask',(msg,data)=>{
                        if(data.flag){
                            this.setState({controlMask:[{display:'none'},{}]})
                            // 关掉定时器
                            PubSub.publish('flag',{flag:true})
                        }
                    })
                    // api.post('/homepage',{route:location.pathname}).then(res=>{
                    //     this.setState({data:res.data.titleDomTextList})
                    //     // 拿到数据后遮罩消失
                    //     this.setState({controlMask:[{display:'none'},{}]})
                    //     PubSub.publish('tag',res.data.tag)
                    //     // console.log(res.data.tag);
                    // })
                })
            }

        })
        
    }
    render() {
        return (
            <div>
                <div style={this.state.controlMask[0]}>
                    <Mask></Mask>
                </div>
                <div style={this.state.hiddenStyle}>
                    <HiddenTag></HiddenTag>
                </div>
                <div style={this.state.controlMask[1]}>
                    <div className="content_container">
                        <div className="content_outer">
                            <FixedNav></FixedNav>
                            <RightList></RightList>
                            <ContentBody></ContentBody>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Content)
