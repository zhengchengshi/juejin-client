import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import './index.scss'
class FixedNav extends PureComponent {
    state={
        checkStyle:[{color: '#1890FF'},{},{}],
        seqArr:['','newest','history']
    }
    componentDidMount(){
        if(this.props.history.location.pathname==='/history'){
            this.setState({checkStyle:[{},{},{color: '#1890FF'}]}); 
        }
        this.props.history.listen(location=>{
            let temporaryArr = [{},{},{}];
            if(location.pathname!=='/history'){
                temporaryArr[0] = {color: '#1890FF'};
                this.setState({checkStyle:temporaryArr});   
            }
        })
        // console.log(this.props.history.location.pathname)
    }
    showPage=(nav_item)=>{
        
        return(()=>{
            let temporaryArr = [{},{},{}];
            this.state.seqArr.map((item,index)=>{
                if(item === nav_item){
                    temporaryArr[index] = {color: '#1890FF'};
                    this.setState({checkStyle:temporaryArr});   
                }
            })
            if(nav_item==='history'){
                this.props.history.push(`/history`)
            }
            // 如果传进来的不是history且当前不处于/history路由上（防止一来就在history上）
            if(nav_item!=='history'&&this.props.history.location.pathname==='/history'){
                console.log(111)
                this.props.history.goBack()
            }
            
        })
    }
    
    render() {
        return (
            <Fragment>
                <div className="fixed_nav_outer">
                    <a className='fixed_nav_item' id="fixed_nav_item1" onClick={this.showPage('')} style={this.state.checkStyle[0]}>热门</a>
                    <a className='fixed_nav_item' onClick={this.showPage('newest')} style={this.state.checkStyle[1]}>最新</a>
                    <a className='fixed_nav_item' onClick={this.showPage('history')} style={this.state.checkStyle[2]}>历史</a>
                </div>
            </Fragment>
        )
    }
}
export default withRouter(FixedNav)