$(document).ready(function() {

    require("../sass/style.scss");

    // INITS

    var soundbankProto = require("./soundbank.js");
    var matrixProto = require("./matrix.js");

    var matrix = new matrixProto(17, 17);


    var bank808 = new soundbankProto();

    bank808.load_sounds("./audio/A_808/", ["bass.wav", "kick.wav", "clap.wav", "clap 2.wav", "snare.wav", "cymbal.wav", "closed hh.wav", "open hh.wav", "tom.wav", "tom 2.wav"]);


    matrix.init_map();
    matrix.prepare_DOM(bank808);
    matrix.render_DOM();
    mainLoop = setInterval(function() {
        if (matrix.state != "pause") {
            matrix.animate_cursors();                       
            bank808.trigger_sounds(matrix.soundBuffer);
        }
        matrix.render_DOM();
    }, Math.round(60000 / matrix.bpm / matrix.bars));
})