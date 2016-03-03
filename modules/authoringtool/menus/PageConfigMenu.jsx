var React = require('react');
var postal = require("postal");

/***
 * props
 * show : visibility
 * pageSetting: page setting
 * configurationChangedCallback£º callback when change setting
 *
 * state
 *
 */

var PageConfigMenu = React.createClass({

    SCREEN_MODEL_PORTRAIT: "Portrait Mode",
    SCREEN_MODEL_EXPAND: "Landscape Mode",
    SCREEN_MODEL_EXTRA: "Extra Mode",

    getInitialState: function () {
        return {

        }
    },

    toggleHeader: function(event) {
        this.props.configurationChangedCallback({
            showHeader: event.target.checked
        });
    },

    toggleFooter: function(event) {
        this.props.configurationChangedCallback({
            showFooter: event.target.checked
        });
    },

    expandModeChanged: function(event) {
        this.props.configurationChangedCallback({
            expandMode: parseInt($(event.target).val())
        });
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    closeMe: function() {
        postal.publish({
            channel: "workspace",
            topic: "empty.clicked"
        });
    },

    stopPropagation: function(event) {
        event.stopPropagation();
    },

    render: function () {
        return (
            <div className="pageConfig" style={{
                    display: this.props.show? "inherit":"none"
            }} onClick={this.stopPropagation}>
                <div className="close glyphicon glyphicon-remove" onClick={this.closeMe}/>
                <div><input checked={this.props.pageSetting.showHeader} type="checkbox" onChange={this.toggleHeader}/><span>Show Header</span></div>
                <div><input checked={this.props.pageSetting.showFooter} type="checkbox" onChange={this.toggleFooter}/><span>Show Footer</span></div>
                <div> <span>Double Screen</span>
                    <select onChange={this.expandModeChanged}>
                        <option value="1">{this.SCREEN_MODEL_PORTRAIT}</option>
                        <option value="2">{this.SCREEN_MODEL_EXPAND}</option>
                        <option value="3">{this.SCREEN_MODEL_EXTRA}</option>
                    </select>
                </div>
                <div> Theme <select><option>Default</option></select> </div>
            </div>
        );
    }
});

module.exports = PageConfigMenu;