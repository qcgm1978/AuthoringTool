import React from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import App from './routes/App'
import About from './routes/About'
import Repos from './routes/Repos'
import Repo from './routes/Repo'
import Home from './routes/Home'
import NoMatch from './routes/NoMatch'
import States from './States'

var List = States(App)
export default <Router history={browserHistory}>
    <Route path="/" component={List}>
        <IndexRoute component={Home}/>
        
        {/* add it here, as a child of `/` */}
        {/* make them children of `App` */}
        <Route path="/repos" component={Repos}>
            <Route path="/repos/:userName/:repoName" component={Repo}/>
        
        </Route>
        <Route path="/about" component={About}/>
        {/*<Route path="/about" component={About}/>*/}
        <Route path="*" component={NoMatch}/>
    </Route>
</Router>