import React from 'react'
// import {Link} from 'react-router'
import NavLinks from './NavLinks'

export default React.createClass({
    render() {
        return (
            <div>
                <h2>Repos</h2>
                
                {/* add some links */}
                <ul>
                    <li><NavLinks to="/repos/reactjs/react-router">React Router</NavLinks></li>
                    <li><NavLinks to="/repos/facebook/react">React</NavLinks></li>
                </ul>
                {/* will render `Repo.js` when at /repos/:userName/:repoName */}
                {this.props.children}
            </div>
        )
    }
})