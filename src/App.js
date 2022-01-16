import React, { PureComponent } from 'react'
import Header from './components/header'
import Nav from './pages/nav'
import { Route,Switch,Redirect,withRouter } from 'react-router-dom'
import Content from './components/Content'
import Article from './components/article'
import './index.scss'
 class App extends PureComponent {
  state={
    valve:{}
  }
  componentDidMount(){
    // 手动路由控制
    // console.log(this.props.history.location.pathname.indexOf('/post'))
    if(this.props.history.location.pathname.indexOf('/post')===0){
      this.setState({valve:{display:'none'}})

    }
    else{
      this.setState({valve:{}})
    }
    
  }
  render() {
    // console.log(this.state.valve)
    return (
      <div>
        <Header></Header>
        <div style={this.state.valve}>
          <Nav></Nav>
          {/* <></> */}
        </div>
        <Switch>
          <Route path="/post" component={Article}></Route>
          <Route path="/" component={Content}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </div>
    )
  }
}
export default withRouter(App)