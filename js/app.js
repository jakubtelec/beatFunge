$(document).ready(function() {

    require("../sass/style.scss");
    var menuProto = require("./menu.js");
    var menu = new menuProto();

    menu.init_menu();

})