/**
 * Created by ¡ı∫≠ on 2015/11/27.
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
    render: function() {
        return (
            <div className="screen" style={{
                width:this.props.width,
                height: 1080,
                WebkitTransform:'scale(' + this.props.zoom + ')'}}>
                <div className="viewables">
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <PageEditor />,
    document.getElementById('example')
);