import React from 'react';
import Contents from './Contents';
import Buttons from './Buttons';
export default React.createClass({
    getInitialState(){
        return {
            num: [1, 2, 3],
        }
    },
    componentDidMount(){
    },
    render(){
        let question=null;
        if (this.props.state==='question') {
            question=<div>{this.props.state}</div>
        }
        return (
            <div>
                {this.props.data.map((item, ind) => {
                    return <div key={ind} className="border">
                        <Contents index={ind} data={item}/>
                        <Buttons offset={ind}/>
                    </div>
                })}
                {question}
            </div>
        )
    }
})