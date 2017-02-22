import React from 'react'
import AppList from '../App-list'
import States from '../States'
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
var List = States(AppList)
export default React.createClass({
    render() {
        return (
            <div>
                <h2>{this.props.params.userName}/{this.props.params.repoName}</h2>
             <List {...props}/>
            </div>
        )
    }
})