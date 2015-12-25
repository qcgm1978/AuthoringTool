var React = require('react');

var AddTextMenu = React.createClass({
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
            <div className="textTemplateLists" data-show={this.props.show}>
                <div onClick={this.props.addBlock}><div className="rtf" >sample paragraphs</div></div>
                <div ><h2 className="rtf">Titles</h2></div>
            </div>
        );
    }
});

module.exports = AddTextMenu;