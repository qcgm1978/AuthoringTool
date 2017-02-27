import React from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import App from './routes/App'
import About from './routes/About'
import Repos from './routes/Repos'
import Repo from './routes/Repo'
import SingleChoose from './routes/Single-Choose'
import FillBlank from './routes/Fill-Blank'
import Question from './routes/Question-Type'
import DynamicLoadingComponent from './routes/DynamicLoadingComponent'
import Home from './routes/Home'
import NoMatch from './routes/NoMatch'
import Wrapper from './Wrapper'

var AppWrapper = Wrapper(App)
export default <Router history={browserHistory}>
    <Route path="/" component={AppWrapper}>
        <IndexRoute component={Home}/>
        
        {/* add it here, as a child of `/` */}
        {/* make them children of `App` */}
        <Route path="/repos" component={Repos}>
            <Route path="/repos/:userName/:repoName" component={Repo}/>
        
        </Route>
        <Route path="/question-type" component={Question}>
            <Route path="/question/single-choose" component={SingleChoose}/>
            <Route path="/question/fill-blank" component={FillBlank}/>
        
        </Route>
        <Route path="/about" component={About}/>
        <Route path="/dynamic-loading-component" component={DynamicLoadingComponent}/>
        {/*<Route path="/about" component={About}/>*/}
        <Route path="*" component={NoMatch}/>
    </Route>
</Router>