//recommend using higher-order components instead of mixins for this.
// Let the wrapping component grab something from the context, and pass it down with props to the wrapped component
//reference: https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html
import React from 'react';
// import Store from './routes/redux'
export default (WrappedComponent) => {
    return React.createClass({
        _state: '',
        componentWillMount(){
        },
        componentDidMount(){
            // var that=this;
            // Store.subscribe( ()=> {
            //     console.log(Store.getState())
            //     that._state = Store.getState()
            // })
        },
        render: function () {
            // The wrapper component reads something
            // and passes it down as a prop to the wrapped component.
            let state = this._state;
            return <WrappedComponent {...this.props} state={state}/>;
        }
    });
};
// var Link = React.createClass({
//     handleClick: function (e) {
//         e.stopPropagation();
//         // The wrapped component uses props instead of context.
//         this.props.router.push(this.props.to);
//     },
//     render: function () {
//         return (
//             <a onClick={this.handleClick}>
//                 {this.props.children}
//             </a>
//         );
//     }
// });