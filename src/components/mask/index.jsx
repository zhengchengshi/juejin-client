import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import './index.scss'
import PubSub from 'pubsub-js'
class Mask extends PureComponent {
    state={
        loadingPoint:[],
        displayFlag:[{},{display:'none'}]
    }
    componentDidMount(){
        
        let num = 0
        let timer = setInterval(()=>{
            // console.log(this.state.loadingPoint.length)
            num++
            if(num>10){
                this.setState({displayFlag:[{display:'none'},{}]})
                clearInterval(timer)
            }
            else{
                this.setState({displayFlag:[{},{display:'none'}]})
            }
            // console.log(num)
        },500)

        // if(num>10){
        //     this.setState({displayFlag:[{display:'none'},{}]})
        //     clearInterval(timer)
        // }
        PubSub.subscribe('flag',(msg,data)=>{
            // console.log(data)
            if(data.flag){
                clearInterval(timer)
            }
        })
        this.props.history.listen(location=>{
            let num = 0
            let timer = setInterval(()=>{
                // console.log(this.state.loadingPoint.length)
                num++
                if(num>10){
                    clearInterval(timer)
                    this.setState({displayFlag:[{display:'none'},{}]})
                }
                else{
                    this.setState({displayFlag:[{},{display:'none'}]})
                }
                // console.log(num)
            },500)
            
            PubSub.subscribe('flag',(msg,data)=>{
                // console.log(data)
                if(data.flag){
                    clearInterval(timer)
                }
            })
        })
    }
    componentWillUnmount(){
        PubSub.unsubscribe('flag')
    }
    render() {
        return (
            <div>
                <div className="mask_outer">
                    <div className="mask" style={this.state.displayFlag[0]}>
                        <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9939bc9c1eb6492aa027d35a8819232d~tplv-k3u1fbpfcp-zoom-1.image" alt="err" id="loading_img"/>
                        {/* <span>加载中{this.state.loadingPoint}</span> */}
                        <span>加载中<span id="dot"></span></span>
                    </div>
                    <div className="mask" style={this.state.displayFlag[1]}>
                        <img src="https://s4.ax1x.com/2022/01/15/7GvY60.png" alt="err" id="loading_img"/>
                        <span>服务器失联了，请刷新页面</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Mask);