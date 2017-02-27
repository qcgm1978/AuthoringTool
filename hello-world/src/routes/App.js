import React from 'react'
// import { Link } from 'react-router'
import {IndexLink} from 'react-router'
import NavLinks from './NavLinks'
window.curModules='AppList'
export default React.createClass({
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul>
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><NavLinks to="/about">About</NavLinks></li>
                    <li><NavLinks to="/repos">Repos</NavLinks></li>
                    <li><NavLinks to="/repos">Repos</NavLinks></li>
                    <li><NavLinks to="/dynamic-loading-component">DynamicLoadingComponent</NavLinks></li>
                    <li><NavLinks to="/question-type">import questions type in router</NavLinks></li>
                
                </ul>
                
                {/* add this */}
                {this.props.children}
            
            </div>
        )
    }
})