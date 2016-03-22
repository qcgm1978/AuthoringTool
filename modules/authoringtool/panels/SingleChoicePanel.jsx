var React = require('react');
var RightPanelMixin = require("./RightPanelMixin.jsx");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthoringInfo = require("../AuthoringInfo");
var postal = require("postal");
require('../../../src/styles/SingleChoicePanel.css');
var SingleChoicePanel = React.createClass({
    NAME: '',
    mixins: [RightPanelMixin, LinkedStateMixin], // Use the mixin
    statics: {
        renderHTML: function (json) {
            /*use handdlebar template later */
            var html = '<div class="activity_single_choice generated questions_list">';
            html += '<div class="list">';
            html += '<ul class="check_list right_side">';
            html += '<p class="question_tit pb20"><span></span>' + json.text + '</p>';
            json.choices.map(function (choice, index) {
                html += '<li><i></i>';
                html += '<span class="letters">' + index + '</span>';
                html += '<a href="javascript:;" class="choose' +
                    (choice.flag=='right'?' active':'') +
                    '">';
                html += '<input type="radio" name="name11"/></a>'
                html += '<span>' + choice.text + '</span>';
                html += '</li>';
            });
            html += '</ul>';
            html += "</div>";
            html += '</div>';
            return html;
        }
    },
    getInitialState: function () {
        return {
            width: 640,
            answer: this.props.json
        }
    },
    getName: function () {
        return "Single Choice";
    },
    componentDidMount: function () {
    },
    deleteChoice: function (index) {
        this.state.answer.choices.splice(index, 1);
        this.setState({
            answer: this.state.answer
        });
        this.publishChange(this.state.answer);
    },
    publishChange: function (json) {
        var obj = {
            channel: "block",
            topic: "modified",
            data: {
                id: this.props.blockId,
                type: "single-choice",
                html: SingleChoicePanel.renderHTML(json)
            }
        };
        postal.publish(obj);
        AuthoringInfo.data.widgetJSON[this.props.blockId] = json;
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            answer: nextProps.json
        });
    },
    questionChanged: function (event) {
        this.state.answer.text = event.target.value;
        this.setState({
            answer: this.state.answer
        });
        this.publishChange(this.state.answer);
    },
    answerChanged: function (event) {
        var target = $(event.target);
        var selected=target.nextAll('input').data('index')
        var choices = this.state.answer.choices;
        choices.map(function (choice,index) {
            if(index==selected){
                choices[index].flag = 'right';
            }else{
                choices[index].flag='wrong'
            }
        });
        this.setState({
            answer: this.state.answer
        });
        this.publishChange(this.state.answer);
    },
    choiceChanged: function (event) {
        var target = $(event.target);
        this.state.answer.choices[parseInt(target.data("index"))].text = event.target.value;
        this.setState({
            answer: this.state.answer
        });
        this.publishChange(this.state.answer);
    },
    renderHTML: function () {
        var mm = (<ul className="check_list">
            <li className="">
                <i></i>
                <span className="letters">A</span>
                <a href="javascript:;" className="choose">
                    <input type="radio" name="name11"/>
                </a>
                <span>monkeys are not usually right-handed.</span>
            </li>
        </ul>);
        return mm;
    },
    getUniqueId: (choice)=> {
        return choice.key;
    },
    renderEditor: function () {
        var panel = this;
        var choices = this.state.answer.choices.map(function (choice, index) {
            return <div key={panel.getUniqueId(choice)} className="form-group">
                <input type="radio" name="sc" defaultChecked={choice.flag=='right'?'checked':false} onClick={panel.answerChanged} /> <input type="text" value={choice.text}
                                                       data-index={index} onChange={panel.choiceChanged}/> <a
                className="delete" onClick={panel.deleteChoice.bind(panel, index)}>Del</a>
            </div>
        });
        return <div>
            <div className="form-group">
                <label >Question</label>
                <textarea className="form-control" value={this.props.json.text}
                          onChange={this.questionChanged}></textarea>
            </div>
            {choices}
        </div>
    }
});
module.exports = SingleChoicePanel;