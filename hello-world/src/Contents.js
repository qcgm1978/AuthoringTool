import React from 'react';
// import ReactDOM from 'react-dom';
export default React.createClass({
    render(){
        return (
            <div className="c_b">
                <ul>
                    <li className="no-list">{this.props.index + 1}</li>
                    {this.props.data.content.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                    }
                </ul>
            </div>
        )
    }
})