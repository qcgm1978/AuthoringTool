import React from 'react'
import AppList from '../App-list'
let data = [
    {
        content: ['A...', 'B...']
    },
    {
        content: ['C...', 'D...']
    },
    {
        content: ['E...', 'F...']
    }
];
var props = {data}

export default React.createClass({
    render() {
        return (
            <div>
                <h2>{this.props.params.userName}/{this.props.params.repoName}</h2>
             <AppList {...props}/>
            </div>
        )
    }
})