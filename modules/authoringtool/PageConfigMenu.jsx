var React = require('react');

var PageConfigMenu = React.createClass({

    SCREEN_MODEL_PORTRAIT: "Portrait Mode",
    SCREEN_MODEL_EXPAND: "Landscape Mode",
    SCREEN_MODEL_EXTRA: "Extra Mode",

    getInitialState: function () {
        return {

        }
    },

    screenModel: function(event) {
        var value = $(event.target).val();
        var mode = 1;
        if (value===this.SCREEN_MODEL_PORTRAIT) {
            mode = 1
        }
        if (value===this.SCREEN_MODEL_EXPAND) {
            mode = 2;
        }
        if (value===this.SCREEN_MODEL_EXTRA) {
            mode = 3;
        }
        this.props.configurationChange({
            expandMode: mode
        });
    },

    toggleHeader: function(event) {
        this.props.configurationChange({
            showHeader: event.target.checked
        });
    },

    toggleFooter: function(event) {
        this.props.configurationChange({
            showFooter: event.target.checked
        });
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    closeMe: function() {
        this.props.showConfigMenu(false);
    },

    render: function () {
        return (
            <div className="pageConfig" style={{
                    display: this.props.show? "inherit":"none"
            }}>
                <div className="close glyphicon glyphicon-remove" onClick={this.closeMe}/>
                <div><input checked={this.props.showHeader} type="checkbox" onChange={this.toggleHeader}/><span>Show Header</span></div>
                <div><input checked={this.props.showFooter} type="checkbox" onChange={this.toggleFooter}/><span>Show Footer</span></div>
                <div> <span>Double Screen</span>
                    <select onChange={this.screenModel}>
                        <option>{this.SCREEN_MODEL_PORTRAIT}</option>
                        <option>{this.SCREEN_MODEL_EXPAND}</option>
                        <option>{this.SCREEN_MODEL_EXTRA}</option>
                    </select>
                </div>
                <div> Theme <select><option>Default</option></select> </div>
            </div>
        );
    }
});

module.exports = PageConfigMenu;