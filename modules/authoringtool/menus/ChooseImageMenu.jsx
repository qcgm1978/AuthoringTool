var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent');
var postal = require("postal");
var ChooseImageMenu = React.createClass({
    getTemplate: function (str) {
        return "<div class='rtf'><img src='" +
            str +
            "'></div>"
    },
    getInitialState: function () {
        return {}
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps: function (nextProps) {
    },
    addImgToWorkspace: function () {
        if (!this.hasImg) {
            return;
        }
        var template = this.getTemplate(this.src);
        window.globalSrc = this.src;
        var size_x = $('.zone img').width();
        var size_y = this.heightByUnit;
        if (size_x) {
            var number = parseInt(size_x);
            //size_x = number>984?984:number;
        }
        if (size_y) size_y = parseInt(size_y);
        //$("#" + 'main-grid' + ">ul").height('auto')
        postal.publish({
            channel: "block",
            topic: "add",
            data: {
                type: "img",
                html: template,
                index: this.imgIndex,
                size_x: 20,
                size_y: 13
            }
        });
        postal.publish({
            channel: "workspace",
            topic: "reset"
        });
        return false;
    },
    imgIndex: 0,
    onDrop: function (files) {
        this.src = files[0].preview
        var that=this;
        $('.zone')
            .find('img')
            .remove()
            .end()
            .next('span')
            .addClass('btn-high-color')
        $('<img>')
            .attr('src', this.src)
            .load(function () {
                that.heightByUnit=$(this).height()/54.8
                $(this)
                    //.data('src', "path/to/image")
                    .css('max-height', 280)
                    .css('max-width', 400)
            })
            .appendTo('.zone')
        this.hasImg = true;
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