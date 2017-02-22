import React from 'react'
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import App from '../../build/example/build/App'
import About from '../../build/example/build/About'
import Repos from '../../build/example/build/Repos'
import Repo from '../../build/example/build/Repo'
import Home from '../../build/example/build/Home'
import NoMatch from '../../build/example/build/NoMatch'
export default <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        {/* add it here, as a child of `/` */}
        {/* make them children of `App` */}
        <Route path="/repos" component={Repos}>
            <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
        <Route path="*" component={NoMatch}/>
    </Route>
</Router>