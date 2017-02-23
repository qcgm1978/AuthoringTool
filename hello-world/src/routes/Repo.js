import React from 'react'
import AppList from '../App-list'
import NoMatch from './NoMatch'
// import $ from 'jquery'
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
var obj={AppList,NoMatch}
export default React.createClass({
    getInitialState(){
        return {
            curModule:null
        }
    },
    componentDidMount(){
        var myRequest = new Request('/module-config.json');
        fetch(myRequest)
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                if (json.status === 1) {
                    let val = json.data[0];
                    this.setState({
                        curModule:val
                    })
                }
            });
        // $.getJSON('/module-config.json',()=>{
        //     debugger;
        // })
    },
    render() {
        let curModule=null;
        if (this.state.curModule) {
            let Name=obj[this.state.curModule]
            curModule = <Name {...props}/>
        }
        return (
            <div>
                <h2>{this.props.params.userName}/{this.props.params.repoName}</h2>
                {curModule}
            </div>
        )
    }
})