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

    addTextBlock: function(event) {
        var sizex = $(event.target).data("sizex");
        var sizey = $(event.target).data("sizey");
        if (sizex) sizex = parseInt(sizex);
        if (sizey) sizey = parseInt(sizey);
        var template = $(event.target).removeAttr("data-reactid").prop('outerHTML');
        this.props.addBlock(template, sizex, sizey);
        this.props.parentStateChange({showBlockTypes: false});
    },

    render: function () {
        return (
            <div className="textTemplateLists" data-show={this.props.show}>
                <div onClick={this.addTextBlock}><div className="rtf">sample paragraphs</div></div>
                <div onClick={this.addTextBlock}><h2 data-sizex="12" data-sizey="1" className="rtf">Titles</h2></div>
            </div>
        );
    }
});

module.exports = AddTextMenu;