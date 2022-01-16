import React, { PureComponent } from 'react'
import './index.scss'
import { withRouter } from 'react-router-dom'
import PubSub from 'pubsub-js'
import findFn from '../../utils/searchUrl'
class Nav extends PureComponent {
    state={
        checkStyle:[{color: '#1890FF'},{},{},{},{},{},{},{},{},{}],
        seqArr:['/recommended','/following','/backend','/frontend','/android','/ios','/ai','/freebie','/career','/article','/recommended'],
    }
    componentDidMount(){
        // 用于刷新时根据路由设置选中样式
        const {seqArr} = this.state
        const pathName = this.props.history.location.pathname
        let temporaryArr = [{},{},{},{},{},{},{},{},{},{}]
        seqArr.map((item,index)=>{
            // 没找到第二个/时，匹配一级路由样式
            if(findFn(pathName,'/',1)===-1){
                if(item === pathName){
                    temporaryArr[index] = {color: '#1890FF'}
                    this.props.history.push(`${item}`)
                    this.setState({checkStyle:temporaryArr})
                }
            }
            // 若有二级路由，则获取一级路由进行匹配
            else{
                if(item === pathName.substring(0,findFn(pathName,'/',1))){
                    temporaryArr[index] = {color: '#1890FF'}
                    this.setState({checkStyle:temporaryArr})
                }
            }
        })
    }
    goNav = (department)=>{
        return(()=>{
            const {seqArr} = this.state

            
            // 样式清空
            let temporaryArr = [{},{},{},{},{},{},{},{},{},{}];
            // 顺序查找匹配字段，使用匹配索引修改样式和路由
            // console.log(department)
            // api.post('/articleList').then(res=>{
            //     this.setState({data:res.data.titleDomTextList})
            //     Pubsub.publish('tag',res.data.tag)
            //     console.log(res.data.tag);
            // })
            // 回到顶部
            window.scrollTo(0,0);
            seqArr.map((item,index)=>{
                // 使用点击传入的部门名与部门数组顺序匹配
                if(item === department){
                    temporaryArr[index] = {color: '#1890FF'};
                    this.props.history.push(`${item}`)
                    this.setState({checkStyle:temporaryArr});
                }
            })
        })
    }
    render() {
        return (
            <div className='nav'>
                <div className='nav_shell'>
                    <div className="nav_container">
                        <div className="nav_outer">
                            <div className="nav_left">
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/recommended')} style={this.state.checkStyle[0]}>推荐</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/following')} style={this.state.checkStyle[1]}>关注</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/backend')} style={this.state.checkStyle[2]}>后端</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/frontend')} style={this.state.checkStyle[3]}>前端</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/android')} style={this.state.checkStyle[4]}>Android</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/ios')} style={this.state.checkStyle[5]}>IOS</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/ai')} style={this.state.checkStyle[6]}>人工智能</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/freebie')} style={this.state.checkStyle[7]}>开发工具</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/career')} style={this.state.checkStyle[8]}>代码人生</a></div>
                                <div className="nav_item"><a className='nav_a' onClick={this.goNav('/article')} style={this.state.checkStyle[9]}>阅读</a></div>
                            </div>
                            <div className="nav_right">
                                <a className="nav_item" onClick={this.goNav(10)} style={this.state.checkStyle[10]}>标签管理</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Nav);