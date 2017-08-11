$(document).ready(function() {

    require("../sass/style.scss");

    // INITS

    var soundbankProto = require("./soundbank.js");
    var matrixProto = require("./matrix.js");

    var matrix = new matrixProto(17, 17);


    var bank808 = new soundbankProto();

    bank808.load_sounds("./audio/A_808/", ["bass.wav", "kick.wav", "clap.wav", "clap 2.wav", "snare.wav", "cymbal.wav", "closed hh.wav", "open hh.wav", "tom.wav", "tom 2.wav"]);

    // test data

    matrix.init_map();


    // matrix.set_cursor(0, 0, "right", 0);
    // matrix.set_cursor(0, 1, "right", 1);
    // matrix.set_cursor(12, 2, "left", 2);
    // matrix.set_cursor(3, 8, "down", 3);
    // matrix.set_cursor(7, 3, "up", 4);
    // matrix.set_cursor(12, 12, "left", 5);
    // matrix.set_cursor(0, 6, "right", 6);
    // matrix.set_cursor(12, 6, "left", 8);

    matrix.prepare_DOM(bank808);
    matrix.render_DOM();
    idLoop = setInterval(function() {
        matrix.render_DOM();
        if (matrix.state == "play") {
            bank808.trigger_sounds(matrix.soundBuffer);
            matrix.animate_cursors();
        }

    }, Math.round(60000 / matrix.bpm / matrix.bars));
})