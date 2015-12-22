var React = require('react');


var BlockTypeMenu = require("./BlockTypeMenu.jsx");

var LeftMenu = React.createClass({
    getInitialState: function () {
        return {

        }
    },

    componentDidMount: function () {
    },

    componentWillReceiveProps: function(nextProps) {

    },

    render: function () {
        return (
            <div className="leftMenu">
                {this.props.layoutable?
                    <div>
                        <span className="glyphicon glyphicon-plus" id="btn-add-block" onClick={this.props.addBlock}></span>
                        <span className="glyphicon glyphicon-edit" onClick={this.props.disableLayout}></span>
                    </div>
                    :
                    <div>
                        <span className="glyphicon glyphicon-resize-small" onClick={this.props.enableLayout}></span>
                    </div>
                }

                <BlockTypeMenu/>

            </div>
        );
    }
});

module.exports = LeftMenu;