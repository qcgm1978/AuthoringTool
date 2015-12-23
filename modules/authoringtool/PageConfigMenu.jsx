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



    resolution: function(event) {
        var value = $(event.target).val();
        console.log("resolution " + value);
        if (value === "1920x1080(16:9)") {
            this.props.configurationChange({width: 1920, minHeight: 1080});
        } else if (value === "1200x800(16:10)") {
            this.props.configurationChange({width: 1280, minHeight: 800});
        } else if (value === "1024x768(4:3)") {
            this.props.configurationChange({width: 1024, minHeight: 768});
        }
    },



    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {
    },

    render: function () {
        return (
            <div className="pageConfig" style={{
                    display: this.props.show? "inherit":"none"
            }}>
                <div> <input type="checkbox"/> <span>Show Header</span> </div>
                <div> <input type="checkbox"/> <span>Show Footer</span> </div>
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