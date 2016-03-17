/**
 * Created by ¡ı∫≠ on 2016/3/4.
 */
var AuthoringInfo = {
    dragging: false,
    setting: {   /**the grid layout setting  it will effect the axisline so defined here*/
        width: 1024,
        height:768,
        doubleScreen: false,
        expandMode: 1,
        showHeader: true,
        showFooter: true
    },
    themeName: "default",
    data: {
        singleScreenWidgets: [],
        doubleScreenLeftWidgets: [],
        doubleScreenRightWidgets: [],
        widgetContents: {},
        widgetJSON: {}
    }
};
module.exports = AuthoringInfo;
