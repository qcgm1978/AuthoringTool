var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent');
var postal = require("postal");
var ChooseImageMenu = React.createClass({
    getTemplate: function (str) {
        return "<div class='rtf'><img src='" +
            str +
            "'</div>"
    },
    getInitialState: function () {
        return {}
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps: function (nextProps) {
    },
    onDrop: function (files) {
        var src = files[0].preview, widthHeight = {};
        $('<img>')
            .attr('src', src)
            .load(function () {
                widthHeight = {
                    width: this.width,
                    height: this.height
                }
                $(this)
                    .height(300)
                    .css('max-width', 400)
            })
            .appendTo('.zone')
            .data('template', this.getTemplate(src))
            .click(function (event) {
                var ele = $(event.target);
                while (!ele.data("template")) {
                    ele = ele.parent();
                }
                var size_x = widthHeight.width;
                var size_y = widthHeight.height;
                if (size_x) size_x = parseInt(size_x);
                if (size_y) size_y = parseInt(size_y);
                var template = ele.data("template");
                postal.publish({
                    channel: "block",
                    topic: "add",
                    data: {
                        type: "img",
                        html: template,
                        size_x: size_x,
                        size_y: size_y
                    }
                });
                postal.publish({
                    channel: "workspace",
                    topic: "reset"
                });
                return false;
            })
        //request.post('/attach/upload')
        //    .attach(files[0].name, files[0])
        //    .end(function(err, res) {
        //
        //    });
    },
    handleFile: function (file) {
    },
    render: function () {
        return (
            <div className="chooseImage" data-show={this.props.show}>
                <Dropzone className="zone" onDrop={this.onDrop} multiple={false}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </div>
        );
    }
});
module.exports = ChooseImageMenu;