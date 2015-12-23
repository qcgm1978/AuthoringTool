var React = require('react');


var BlockTypeMenu = require("./BlockTypeMenu.jsx");

var LeftMenu = React.createClass({
    getInitialState: function () {
        return {
            showBlockTypes: false
        }
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    showBlockTypes: function() {
      this.setState({
          showBlockTypes: !this.state.showBlockTypes
      }) ;
    },

    render: function () {
        return (
            <div className="leftMenu">
                {this.props.layoutable?
                    <div>
                        <span className="glyphicon glyphicon-plus" data-clicked={this.state.showBlockTypes} id="btn-add-block" onClick={this.showBlockTypes}></span>
                        <span className="glyphicon glyphicon-edit" onClick={this.props.disableLayout}></span>
                    </div>
                    :
                    <div>
                        <span className="glyphicon glyphicon-arrow-left" data-clicked="true" onClick={this.props.enableLayout}></span>
                    </div>
                }

                <BlockTypeMenu addBlock={this.props.addBlock}  show={this.state.showBlockTypes}/>

            </div>
        );
    }
});

module.exports = LeftMenu;