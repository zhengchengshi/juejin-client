import React, { PureComponent } from 'react'
import { Input} from 'antd'
import { withRouter } from 'react-router-dom';
import './index.scss'
const { Search } = Input;
class Header extends PureComponent {

    state={
        checkStyle:[{color: '#1890FF'},{},{},{},{}]
    }
    
    onSearch = value => console.log(value);

    goHeader = (index)=>{
        return(()=>{
            // 记录一个顶部导航切换状态的方法
            let temporaryArr = [{},{},{},{},{}];
            temporaryArr[index] = {color: '#1890FF'};
            this.setState({checkStyle:temporaryArr});     
            this.props.history.push('/')
        })
    }
    render() {
        return (
            <div className='header'>
                <div className='header_shell'>
                    <div className="adaptive">
                        <div className="header_container">
                            <div className="header_outer">
                                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/7abc2b532f725d394feaf0141547ade7.svg" alt="err" id="logo"/>
                                <div className="header_nav">
                                    <div className='header_nav_item'><a className='header_a' onClick={this.goHeader(0)} style={this.state.checkStyle[0]}>首页</a></div>
                                    <div className='header_nav_item'><a className='header_a' onClick={this.goHeader(1)} style={this.state.checkStyle[1]}>沸点</a></div>
                                    <div className='header_nav_item'><a className='header_a' onClick={this.goHeader(2)} style={this.state.checkStyle[2]}>资讯</a></div>
                                    <div className='header_nav_item'><a className='header_a' onClick={this.goHeader(3)} style={this.state.checkStyle[3]}>课程</a></div>
                                    <div className='header_nav_item'><a className='header_a' onClick={this.goHeader(4)} style={this.state.checkStyle[4]}>活动</a></div>
                                </div> 
                                <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78b127f77a0949e497c9052a7c6a9e69~tplv-k3u1fbpfcp-zoom-1.image" alt="err" id="header_list"/>
                                <Search placeholder="探索稀土掘金" onSearch={this.onSearch} style={{ width: 160 }} />
                                <div className="header_creator_outer">
                                    <a className='header_creator'>创作者中心</a>
                                </div>
                                <div className="write_article_outer">
                                    <a className="write_article">写文章</a>
                                </div>
                                <div id="header_notice_outer">
                                    <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/c7f91fad712592633383df6aa430c93c.svg" alt="err" id='header_notice'/>
                                </div>
                                <div id="header_avatar_outer">
                                    <img src="https://p9-passport.byteacctimg.com/img/mosaic-legacy/3797/2889309425~300x300.image" alt="err" id="header_avatar"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)