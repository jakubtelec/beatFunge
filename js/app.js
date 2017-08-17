$(document).ready(function() {

    require("../sass/style.scss");
    require("../js/libs/howler.js");

    var menuProto = require("./menu.js");
    var menu = new menuProto();

    menu.init_menu();

})