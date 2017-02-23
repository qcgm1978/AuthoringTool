import React from 'react';
import Contents from './Contents';
import Buttons from './Buttons';
import Store from './routes/redux'

export default React.createClass({
    getInitialState(){
        return {
            num: [1, 2, 3],
            section:Store.getState()
        }
    },
    componentDidMount(){
    },
    render(){
        let question=null;
        question = <div>{this.state.section}</div>
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