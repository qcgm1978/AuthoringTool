import React from 'react'
// import { Link } from 'react-router'
import { IndexLink } from 'react-router'

import NavLinks from './NavLinks'
export default React.createClass({
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul>
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><NavLinks to="/about">About</NavLinks></li>
                    <li><NavLinks to="/repos">Repos</NavLinks></li>
                
                </ul>
                
                {/* add this */}
                {this.props.children}
            
            </div>
        )
    }
})