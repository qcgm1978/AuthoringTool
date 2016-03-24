/**
 * Created by hand on 2016/2/19.
 */

var React = require('react');
var SingleChoicePanel = require("../panels/SingleChoicePanel.jsx");
var HighLightComponent = require("../panels/HighLightComponent.js");

var postal = require("postal");
var AddActivityMenu = React.createClass({
    //template code for single choice
    getInitialState: function () {
        return {}
    },
    singleChoiceCallback: function (data) {
        postal.publish({
            channel: "block",
            topic: "add",
            data: {
                type: "single-choice",
                html: SingleChoicePanel.renderHTML(data),
                json: data
            }
        });
        postal.publish({
            channel: "workspace",
            topic: "reset"
        });
    },
    handleActivity: function (url, callback) {
        $.getJSON(url, (data)=> {
            callback(data);
        })
    },
    hightlightCallback: function (data) {
        postal.publish({
            channel: "block",
            topic: "add",
            data: {
                type: "highlight",
                html: HighLightComponent.renderHTML(data),
                json: data
            }
        });
        postal.publish({
            channel: "workspace",
            topic: "reset"
        });
    },
    addActivity: function (select) {
        var value = select.currentTarget.value;
        var url = '', callback = $.noop;
        if (value === "Single Choice") {
            url = 'json/single-choice.json';
            callback = this.singleChoiceCallback
        } else if (value == 'highlight') {
            url='json/highlight.json'
            callback=this.hightlightCallback
        }
        if (url!='') {
            this.handleActivity(url, callback);
        }
    },
    render: function () {
        return (
            <div className="menuActivityList" data-show={this.props.show}>
                <div className="category">choice question</div>
                <select defaultValue='choice question' onChange={this.addActivity}>
                    <option>choice question</option>

                    <option>
                        Single Choice
                    </option>
                    <option>multiple-choice question</option>
                    <option>highlight</option>
                    <option>right or wrong</option>
                    <option>listening</option>
                </select>


            </div>
        );
    }
});
module.exports = AddActivityMenu;
