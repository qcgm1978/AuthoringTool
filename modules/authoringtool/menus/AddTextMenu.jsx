var React = require('react');

var AddTextMenu = React.createClass({
    getInitialState: function () {
        return {

        }
    },

    BLOCK_PARAGRAPH : "<div class='rtf'>You can edit text on your website by double clicking on a text box on your website. Alternatively, when you select a text box a settings menu will appear. Selecting 'Edit Text' from this menu will also allow you to edit the text within this text box. Remember to keep your wording friendly, approachable and easy to understand as if you were talking to your customer</div>",
    BLOCK_H1: "<h1 class='rtf'>Heading 1</h1>",
    BLOCK_H2: "<h2 class='rtf'>Heading 2</h2>",
    BLOCK_H3: "<h3 class='rtf'>Heading 3</h3>",

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    addTextBlock: function(event) {
        var ele = $(event.target);
        while(!ele.data("template")) {
            ele = ele.parent();
        }
        var sizex = ele.data("width");
        var sizey = ele.data("height");
        if (sizex) sizex = parseInt(sizex);
        if (sizey) sizey = parseInt(sizey);

        var template = ele.data("template");
        this.props.addBlock(template, sizex, sizey);
        this.props.parentStateChange({showBlockTypes: false});
    },
    render: function () {
        return (
            <div className="textTemplateLists" data-show={this.props.show}>
                <div onClick={this.addTextBlock} data-template={this.BLOCK_PARAGRAPH}><span className="glyphicon glyphicon-align-justify"/><div className="rtf">Paragraph</div></div>
                <div onClick={this.addTextBlock} data-width="12" data-height="1" data-template={this.BLOCK_H1}><span className="glyphicon">H1</span><div className="rtf">Heading 1</div></div>
                <div onClick={this.addTextBlock} data-width="12" data-height="1" data-template={this.BLOCK_H2}><span className="glyphicon">H2</span><div className="rtf">Heading 2</div></div>
                <div onClick={this.addTextBlock} data-width="12" data-height="1" data-template={this.BLOCK_H3}><span className="glyphicon">H3</span><div className="rtf">Heading 3</div></div>
            </div>
        );
    }
});

module.exports = AddTextMenu;