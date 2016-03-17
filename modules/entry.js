/**
 * Created by ���� on 2015/12/4.
 */
//webpack has a clever parser that can process nearly every 3rd party library. It handles the most common module styles: CommonJs and AMD.
//CommonJS give you:
//the require() function, which allows to import a given module into the current scope.

require("../modules/bootstrap/css/bootstrap.css");
require("../modules/bootstrap/js/bootstrap");
require("../modules/gridster/jquery.gridster.css");//jquery.gridster
require("../modules/gridster/jquery.gridster");
require("./authoringtool/main.scss");
require("./authoringtool/AuthoringTools.jsx");
