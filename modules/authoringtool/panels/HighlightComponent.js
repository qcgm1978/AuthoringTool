'use strict';
import React from 'react';
require('../../../src/styles/Highlight.css');
const HighlightComponent = React.createClass({
    statics: {
        renderHTML: function (json) {
            /*use handdlebar template later */
            var html = '<div class="activity_single_choice generated questions_list">';
            html += '<div class="list">';
            html += '<ul class="check_list right_side">';
            html += '<p class="question_tit pb20"><span></span>' + json.text + '</p>';
            //json.choices.map(function (choice, index) {
            //    html += '<li><i></i>';
            //    html += '<span class="letters">' + index + '</span>';
            //    html += '<a href="javascript:;" class="choose' +
            //        (choice.flag == 'right' ? ' active' : '') +
            //        '">';
            //    html += '<input type="radio" name="name11"/></a>'
            //    html += '<span>' + choice.text + '</span>';
            //    html += '</li>';
            //});
            html += '</ul>';
            html += "</div>";
            html += '</div>';
            return html;
        }
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
    },
    render() {
        return (
            <div className="hightlight-component">
                Please edit src/components///HighlightComponent.js to update this component!
            </div>
        );
    }
})
module.exports= HighlightComponent;
