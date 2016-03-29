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
    addImgToWorkspace: function (event) {
        var template = this.getTemplate(this.src);

        var size_x = $('.zone img').width();
        var size_y = $('.zone img').height();
        if (size_x) {
            var number = parseInt(size_x);
            //size_x = number>984?984:number;
        }
        if (size_y) size_y = parseInt(size_y);
        postal.publish({
            channel: "block",
            topic: "add",
            data: {
                type: "img",
                html: template,
                //size_x: size_x,
                //size_y: size_y
            }
        });
        postal.publish({
            channel: "workspace",
            topic: "reset"
        });
        return false;
    },
    onDrop: function (files) {
        this.src = files[0].preview
        $('<img>')
            .attr('src', this.src)
            .load(function () {

                $(this)
                    .css('max-height', 300)
                    .css('max-width', 400)
            })
            .appendTo('.zone')
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
            <div className="chooseImage text-center" data-show={this.props.show}>
                <Dropzone className="zone" onDrop={this.onDrop} multiple={false}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.addImgToWorkspace}></span>
            </div>
        );
    }
});
module.exports = ChooseImageMenu;