import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import findFn from '../../utils/searchUrl'
import PubSub from 'pubsub-js'
import './index.scss'
class HiddenTag extends PureComponent {
    state={
        checkStyle:[{backgroundColor: '#007FFF'},{},{},{},{},{},{},{},{}],
        fontStyle:[{color:'white'},{},{},{},{},{},{},{},{}],
        // 二级路由数组（后面是动态的）
        seqArr:[],
        // 一级路由数组
        firstPathArr:['/recommended','/following','/backend','/frontend','/android','/ios','/ai','/freebie','/career','/article','/recommended'],
        unfold:{}
    }

    componentDidMount(){
        // 清空对应的两个样式
        // 接收传过来的标签
        PubSub.subscribe('tag',(mag,data)=>{
            let temporaryArr1 = [];
            let temporaryArr2 = [];
            // console.log(data)
            
            this.setState({seqArr:data},()=>{
                const {seqArr,firstPathArr} = this.state
                const pathName = this.props.history.location.pathname
                
                // 二级路由顺序匹配，刷新时根据路由保持对应标签样式
                seqArr.map((item,index)=>{
                    // console.log(item)
                    if(item.tag === pathName.substring(findFn(pathName,'/',1)+1)){
                        temporaryArr1[index] = {backgroundColor: '#007FFF'};
                        temporaryArr2[index] = {color:'white'};
                        this.setState({checkStyle:temporaryArr1,fontStyle:temporaryArr2});
                    }
                })
                // console.log(temporaryArr1)
                // 如果二级路由不存在，则将样式置于第一个标签上
            })
        })
        let temporaryArr1 = [];
        let temporaryArr2 = [];
        this.props.history.listen((location)=>{
            // 无二级路由默认选中第一个
            // console.log(location.pathname)
            if(findFn(location.pathname,'/',1)===-1){
                
                // console.log('二级路由不存在')
                temporaryArr1[0] = {backgroundColor: '#007FFF'};
                temporaryArr2[0] = {color:'white'};
            }
            this.setState({checkStyle:temporaryArr1,fontStyle:temporaryArr2});
        })

    }
    componentWillUnmount(){
        PubSub.unsubscribe('tag')
    }
    goTag = (department)=>{
        return(()=>{
            // console.log(department)
            const {seqArr} = this.state
            let pathName = this.props.history.location.pathname
            
            const p1 = Promise.resolve();
            window.scrollTo(0,0); 
            // 如果没有一级路由，则默认修改为recommend路由(放pathname不匹配报错)
            if(pathName==='/'){
                pathName = '/recommended'
            }
            
            // 不存在二级路由时，将标签置于首位
            
            // 当第二个/不存在时，直接用pathname进行路由拼串
            if(findFn(pathName,'/',1)===-1&&department!=='全部'){
                this.props.history.push(pathName+'/'+department)
            }
            
            // 存在二级路由时，就获取一级路由进行拼串
            // 不能用pathname进行后续拼串的原因是路由会越来越多
            if(findFn(pathName,'/',1)!==-1){
                let firstPathName = pathName.substring(0,findFn(pathName,'/',1))
                this.props.history.push(firstPathName+'/'+department)
            }

            // 如果选中全部，则跳至一级路由
            if(department==='全部'){
                // 不存在
                if(findFn(pathName,'/',1)!==-1){
                    this.props.history.push(pathName.substring(findFn(pathName,'/',0),findFn(pathName,'/',1)))
                }
            }
            // 
            let temporaryArr1 = [];
            let temporaryArr2 = [];
            // 修改对应标签样式
            seqArr.map((item,index)=>{
                if(item.tag===department){
                    temporaryArr1[index] = {backgroundColor: '#007FFF'};
                    temporaryArr2[index] = {color:'white'};
                }
            })
            // if(findFn(pathName,'/',1)===-1){
            //     temporaryArr1[0] = {backgroundColor: '#1890FF'};
            //     temporaryArr2[0] = {color:'white'};
            // }
            // console.log(temporaryArr1)
            this.setState({checkStyle:temporaryArr1,fontStyle:temporaryArr2});    
        })
    }
    render() {
        const {checkStyle,fontStyle,seqArr} = this.state
        return (
            <div>
                <div className="hiddenTag_container">
                    <div className="hiddenTag_outer">
                        <div className="hiddenTag_left">
                            {
                                seqArr.map((item,index)=>{
                                    // console.log(item)
                                    return(<span className='hiddenTag_item_outer' key={index} style={checkStyle[index]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[index]} onClick={this.goTag(`${item.tag}`)}>{item.tag}</a></div></span>)
                                })
                            }
                            
                            {/* <span className='hiddenTag_item_outer' style={checkStyle[1]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[1]} onClick={this.goTag('后端')}>后端</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[2]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[2]} onClick={this.goTag('Java')}>Java</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[3]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[3]} onClick={this.goTag('算法')}>算法</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[4]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[4]} onClick={this.goTag('Python')}>Python</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[5]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[5]} onClick={this.goTag('Go')}>Go</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[6]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[6]} onClick={this.goTag('MySQL')}>MySQL</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[7]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[7]} onClick={this.goTag('数据库')}>数据库</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[8]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[8]} onClick={this.goTag('Spring-Boot')}>Spring Boot</a></div></span>
                            <span className='hiddenTag_item_outer' style={checkStyle[9]}><div className="hiddenTag_item"><a className='nav_a'  style={fontStyle[9]} onClick={this.goTag('LeetCode')}>LeetCode</a></div></span> */}
                            <span className='hiddenTag_item_outer' style={this.state.unfold}><div className="hiddenTag_item"><a className='nav_a'>展开</a><img src="https://s4.ax1x.com/2021/12/29/T68xxO.png" alt="err" id="fold" onClick={this.goTag(10)}></img></div></span>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(HiddenTag)