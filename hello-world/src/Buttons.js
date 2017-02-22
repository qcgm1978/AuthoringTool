import React from 'react';
import './buttons.css'
// import ReactDOM from 'react-dom';
export default React.createClass({
    render(){
        return (
            <ul className="buttons">
                <li>player1</li>
                <li>player2</li>
                <li>player3</li>
                <li>{93+this.props.offset}</li>
            </ul>
        )
    }
})