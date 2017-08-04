$(document).ready(function() {

    // INITS

    var soundbankProto = require("./soundbank.js");
    var matrixProto = require("./matrix.js");

    var matrix = new matrixProto(13, 13);


    var soundbank = new soundbankProto();

    soundbank.load_sounds(["kick.wav", "kick_click.wav", "hihat_closed.wav", "hihat_open.wav", "snare_1.wav", "snare_2.wav", "snare_3.wav", "switch.wav", "chord_1.wav"]);
    console.log(soundbank.sounds);

    // test data

    matrix.init_map();

    matrix.set_cursor(0, 0, "right", 0);
    matrix.set_cursor(0, 1, "right", 1);
    matrix.set_cursor(12, 2, "left", 2);
    matrix.set_cursor(3, 8, "down", 3);
    matrix.set_cursor(7, 3, "up", 4);
    matrix.set_cursor(12, 12, "left", 5);
    matrix.set_cursor(0, 6, "right", 6);
    matrix.set_cursor(12, 6, "left", 8);

    // matrix.set_cursor(0, 2, "right", 2);
    // matrix.set_cursor(0, 2, "right", 2);
    // matrix.set_cursor(8, 0, "down", 3);
    // matrix.set_cursor(12, 8, "up", 4);

    // matrix.set_bouncer(7, 2);
    // matrix.set_bouncer(4, 2);


    // matrix.set_trigger(1, 2);
    // matrix.set_trigger(6, 2);
    // matrix.set_trigger(10, 2);
    // // matrix.set_trigger(6,2);
    // // matrix.set_trigger(13,2);
    // // matrix.set_trigger(15,2);    

    // matrix.set_trigger(4, 1);
    // matrix.set_trigger(12, 1);

    // matrix.set_trigger(0, 0);
    // matrix.set_trigger(4, 0);
    // matrix.set_trigger(8, 0);
    // matrix.set_trigger(12, 0);


    


    matrix.update_map();
    matrix.prepare_DOM();
    matrix.render_DOM();
    idLoop = setInterval(function() {
        matrix.render_DOM();
        soundbank.trigger_sounds(matrix.soundBuffer);
        matrix.animate_cursors();
        matrix.update_map();
    }, Math.round(60000 / matrix.bpm / matrix.bars));
}
)