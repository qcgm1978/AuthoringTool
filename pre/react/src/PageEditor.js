/**
 * Created by 刘涵 on 2015/11/27.
 */

var PageEditor = React.createClass({

    getInitialState: function() {
        return {ratio: 1920, zoom:1};
    },

    ratioChange: function(event) {
        this.setState({ratio: event.target.value});
    },

    zoomChange: function(event) {
        this.setState({zoom: event.target.value});
    },

    /**在这个DOM ready之中使用jquery与grister初始化格子系统*/
    componentDidMount: function() {
        //var gridster = $(".screen div.viewables").gridster({
        //    widget_base_dimensions: [160, 270],
        //    widget_margins: [0, 0],
        //    max_cols: 12,
        //    resize: {
        //        enabled: true,
        //        stop: function(e, ui, $widget) {
        //
        //        }
        //    },
        //    draggable: {
        //        start: function(event, ui) {
        //            if (ui.$player.data("sizex")===12) {
        //                ui.$player.data("full", true);
        //                gridster.resize_widget(ui.$player, 1);
        //            }
        //            //ui.$player.data("o-sizex", ui.$player.data("sizex"));
        //            //gridster.resize_widget(ui.$player, 2, 1);
        //            //$('.player').data("sizex", 2);
        //            //ui.$helper.css("width", "320px");
        //            //ui.$player.data("sizex", 2);
        //            //$(".preview-holder").css("width", "320px");
        //            //console.log(ui.$player.data("sizex"));
        //            //console.log(ui);
        //        },
        //        drag: function(e, ui, $widget) {
        //            $('.player').data("sizex", 2);
        //        }
        //    }
        //
        //}).data('gridster');
        //
        //var widgets = [
        //    ['<div>0</div>', 6, 1, 1, 1],
        //    ['<div>1</div>', 6, 1, 7, 1],
        //    ['<div>2</div>', 12, 1, 1, 2]
        //];
        //
        //$.each(widgets, function(i, widget){
        //    gridster.add_widget.apply(gridster, widget);
        //});
    },

    render: function() {
        var ratio = this.state.ratio;
        var width = 1920;
        if (ratio==="x169") {
            width = 1920;
        } else
        if (ratio==="x1610") {
            width = 1080/10*16;
        } else
        if (ratio==="x43") {
            width = 1080/3*4;
        }
        return (
            <div>
                <div>
                    <span>screen : </span>
                    <select onChange={this.ratioChange}>
                        <option value="x169" >1920x1080(16:9)</option>
                        <option value="x1610" >1200x800(16:10)</option>
                        <option value="x43" >1024x768(4:3)</option>
                    </select>
                    <span>x2</span>
                    <input type="checkbox"/>
                    <span>zoom</span>
                    <input type="number" onChange={this.zoomChange}/>
                </div>
                <Screen width={width} zoom={this.state.zoom}/>
            </div>
        );
    }
});

var Screen = React.createClass({
    componentDidMount: function() {
        $(".add_grid").click(function() {
            GridDesigner.addRow(1);
        });
        $(".add_2grid").click(function() {
            GridDesigner.addRow(2);
        });


        var menu = $('<ul id="menu">'
            + '<li>Content<ul>' +
            '<li>text</li>' +
            '<li>image</li>' +
            '</ul></li>' +
            '<li>Activity<ul>' +
            '<li>SingleChoice</li>' +
            '</ul></li>'
            + '<li>Width' +
            '<ul><li>Fixed</li>' +
            '<li>Percent</li>' +
            '</ul></li>'
            + '<li>Height<ul>' +
            '<li>max-height</li>' +
            '<li>auto</li>' +
            '</ul></li>' +
            '<li>Delete</li>'
            + '</ul>');

        $(".viewables").append(menu);
        $(menu).menu().hide();
    },
    render: function() {
        return (
            <div className="screen" style={{
                width:this.props.width,
                height: 1080,
                WebkitTransform:'scale(' + this.props.zoom + ')'}}>
                <div className="viewables">
                    <div className="row">
                        <div className="add_grid">Add Grid</div>
                        <div className="add_2grid">Add 2 Grid</div>
                    </div>
                </div>
            </div>
        );
    }
});


var GridDesigner = (function($, container) {

    var designer = this;

    function addRow(seps) {
        var row = $("<div class='row'></div>");

        for(var i=0; i<seps; i++) {
            var grid = $('<div class="grid"><div class="content"></div><div class="btn"></div></div>');
            grid.css("width", $(container).width()/seps-10);

            grid.find(".btn").click(function() {
                $(this).append($("#menu"));
                $("#menu").show();
            });

            grid.resizable({
                handles: "e",
                grid: 160,
                resize: function( event, ui ) {
                    if (ui.helper.siblings(".grid").length>0) {
                        ui.helper.siblings(".grid").css("width", $(container).width() - ui.helper.width() -10);
                    }
                }
            });
            row.append(grid);
        }
        row.sortable({
            placeholder: "ui-state-highlight",
            connectWith: ".row",
            start: function( event, ui ) {
                $(".row>.grid").each(function() {
                    $(this).data("owidth", $(this).width());
                });
            },
            over: function( event, ui ) {
                if ($(this).find(">.grid").length===1) {
                    $(this).find(">.grid").not(ui.helper).css("width", $(container).width()/2-10);
                }

                if ($(this).find(">.grid").length===2) {
                    ui.item.parent().append($(this).find(">.grid")[0]);
                }

            },
            stop: function( event, ui ) {
                reLayOut();
            }
        });
        $(container).append(row);
    }

    function deleteBlock(div) {

    }

    function reLayOut() {
        $(".row").each(function() {
            if ($(this).find(">.grid").length===0) {
                $(this).remove();
            }
            if ($(this).find(">.grid").length===1) {
                $(this).find(">.grid").css("width", $(container).width());
            }

            if ($(this).find(">.grid").length===2) {
                $(this).find(">.grid").each(function() {
                    if ($(this).width()>$(container).width()/2) {
                        $(this).css("width", $(container).width()/2-10);
                    }
                })
            }
        })
    }

    return {
        addRow: addRow,
        deleteBlock: deleteBlock
    }
}(jQuery, ".viewables"));

ReactDOM.render(
    <PageEditor />,
    document.getElementById('authoringtool')
);