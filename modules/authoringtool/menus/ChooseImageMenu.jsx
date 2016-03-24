var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent');
var ChooseImageMenu = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps: function (nextProps) {
    },
    onDrop: function (files) {
        $('<img>')
            .attr('src', files[0].preview)
            .height(300)
            .css('max-width',400)
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
            <div className="chooseImage" data-show={this.props.show}>
                <Dropzone className="zone" onDrop={this.onDrop} multiple={false}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </div>
        );
    }
});
module.exports = ChooseImageMenu;