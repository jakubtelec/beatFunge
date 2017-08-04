/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

$(document).ready(function() {

    // INITS

    var soundbankProto = __webpack_require__(1);
    var matrixProto = __webpack_require__(2);

    var matrix = new matrixProto(13, 13);


    var soundbank = new soundbankProto();

    soundbank.load_sounds(["kick.wav", "clap.wav", "hi hat closed.wav", "bleep 3.wav", "bleep 2.wav"]);
    console.log(soundbank.sounds);

    // test data

    matrix.init_map();

    matrix.set_cursor(0, 0, "right", 0);
    matrix.set_cursor(0, 1, "right", 1);
    matrix.set_cursor(12, 2, "left", 2);
    matrix.set_cursor(0, 2, "right", 4);
    // matrix.set_cursor(0, 2, "right", 2);
    // matrix.set_cursor(0, 2, "right", 2);
    // matrix.set_cursor(8, 0, "down", 3);
    // matrix.set_cursor(12, 8, "up", 4);

    matrix.set_bouncer(7, 2);
    matrix.set_bouncer(4, 2);


    matrix.set_trigger(1, 2);
    matrix.set_trigger(6, 2);
    matrix.set_trigger(10, 2);
    // matrix.set_trigger(6,2);
    // matrix.set_trigger(13,2);
    // matrix.set_trigger(15,2);    

    matrix.set_trigger(4, 1);
    matrix.set_trigger(12, 1);

    matrix.set_trigger(0, 0);
    matrix.set_trigger(4, 0);
    matrix.set_trigger(8, 0);
    matrix.set_trigger(12, 0);


    


    matrix.update_map();
    matrix.prepare_DOM();
    matrix.render_DOM();
    // idLoop = setInterval(function() {
    //     matrix.render_DOM();
    //     soundbank.trigger_sounds(matrix.soundBuffer);
    //     matrix.animate_cursors();
    //     matrix.update_map();
    // }, Math.round(60000 / matrix.bpm / matrix.bars));
}
)

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var soundbankProto = function() {

    // table for howler soundbank

    this.sounds = [];

    // sound loader - table of filenames as argument

    this.load_sounds = function(filenames) {

        filenames.forEach((element) => {
            this.sounds.push(new Howl({
                src: ['./audio/' + element]
            }))
        });
    }

    this.trigger_sounds = function(soundBuffer) {

        for (let i = 0; i < soundBuffer.length; i++) {
            this.sounds[soundBuffer[i]].play();
        }
    }
}

module.exports = soundbankProto;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

 var cursorProto = function(x, y, direction, sound) {
     this.type = "normal";
     this.x = x;
     this.y = y;
     this.history_x = 0;
     this.history_y = 0;
     this.direction = direction;
     this.sound = sound;
     this.speed = 1;
 }

 var cellProto = function() {
     display: "";
     solid: false;
     type: "empty";
     value: "";
     subtype: "";
     subvalue: "";
     direction: "none";
 }

 var matrixProto = function(x_size, y_size) {

     // globals 

     this.bpm = 110; // beats per minute
     this.bars = 4; // bars per beat
     this.beat = 0; // beat counter

     // grid size

     this.x_size = x_size;
     this.y_size = y_size;
     this.cell_width = 0;
     this.cell_height = 0;

     // tables 

     this.map = []; // empty map of cells
     this.cursors = []; // empty map of cursors

     //buffers

     this.soundBuffer = []; // map of sounds to play at one step
     this.triggerBuffer = []; //map of triggers to light up
     this.bouncerBuffer = []; //map of bouncers to light up

     // DOM 

     this.DOM = "";

     // METHODS

     this.pos = function(x_coord, y_coord) {
         return (y_coord * this.y_size) + x_coord;
     }

     // inits

     this.init_map = function() {
         for (i = 0; i < this.x_size * this.y_size; i++) {
             this.map.push(new cellProto())
             this.map[i].type = "empty";
         }
     }

     // methods for setting up cells and cursors

     this.set_cursor = function(x, y, direction = "right", sound) {
         this.cursors.push(new cursorProto(x, y, direction, sound));
     }

     this.set_bouncer = function(x, y) {
         let addr = this.pos(x, y);
         this.map[addr].type = "bouncer";
         this.map[addr].solid = true;
     }

     this.set_pipe = function(x, y, direction = "right") {
         let addr = this.pos(x, y);
         this.map[addr].type = "pipe";
         this.map[addr].solid = false;
     }

     this.set_trigger = function(x, y) {
         let addr = this.pos(x, y);
         this.map[addr].subtype = "trigger";
         this.map[addr].solid = false;
     }

     // let's move things atround! 

     this.update_map = function() {
         // if (this.map[i].type == "pipe" && this.map[i].subtype == "right") { this.map[i].display = "→" };
         // if (this.map[i].type == "pipe" && this.map[i].subtype == "left") { this.map[i].display = "←" };
         // if (this.map[i].type == "pipe" && this.map[i].subtype == "down") { this.map[i].display = "↓" };
         // if (this.map[i].type == "pipe" && this.map[i].subtype == "up") { this.map[i].display = "↑" };
     };


     this.animate_cursors = function() {

         // moving cursors and detecting interactions with obiejcts on map

         this.beat++;
         this.soundBuffer = [];

         for (var i = 0; i < this.cursors.length; i++) {

             // detect triggers and store sounds and triggers into buffers



             if (this.map[this.pos(this.cursors[i].x, this.cursors[i].y)].subtype === "trigger") {
                 // console.log("Sample: " + this.cursors[i].sound);
                 this.soundBuffer.push(this.cursors[i].sound);
                 this.triggerBuffer.push(this.pos(this.cursors[i].x, this.cursors[i].y));
             }

             // move stuff around

             let cursor_field = this.pos(this.cursors[i].x, this.cursors[i].y);
             let right_field = this.pos(this.cursors[i].x + 1, this.cursors[i].y);
             let left_field = this.pos(this.cursors[i].x - 1, this.cursors[i].y);
             let up_field = this.pos(this.cursors[i].x, this.cursors[i].y - 1);
             let down_field = this.pos(this.cursors[i].x, this.cursors[i].y + 1);
             this.cursors[i].history_x = this.cursors[i].x;
             this.cursors[i].history_y = this.cursors[i].y;

             switch (this.cursors[i].direction) {
                 case "right":
                     if (this.cursors[i].x == this.x_size - 1 || this.map[right_field].type == "bouncer") { // bounce cursor to the left
                         this.cursors[i].x--;
                         this.cursors[i].direction = "left";
                     } else {
                         this.cursors[i].x++;
                     }
                     break;
                 case "left":
                     if (this.map[left_field] === undefined || this.cursors[i].x == 0 || this.map[left_field].type == "bouncer") { // bounce cursor to the right
                         this.cursors[i].x++;
                         this.cursors[i].direction = "right";
                     } else {
                         this.cursors[i].x--;
                     }
                     break;
                 case "down":
                     if (this.map[down_field] === undefined || this.cursors[i].y == this.y_size - 1 || this.map[down_field].type == "bouncer") { // bounce cursor up
                         this.cursors[i].y--;
                         this.cursors[i].direction = "up";
                     } else {
                         this.cursors[i].y++;
                     }
                     break;
                 case "up":
                     if (this.map[up_field] === undefined || this.cursors[i].y == 0 || this.map[up_field].type == "bouncer" || this.cursors[i].y == 0) { // bounce cursor down
                         this.cursors[i].y++;
                         this.cursors[i].direction = "down";
                     } else {
                         this.cursors[i].y--;
                     }
                     break;
             }

             // console.log("Kursor: " + i + " X => " + this.cursors[i].x + " Y => " + this.cursors[i].y);
             // console.log("Pozycja: " + this.pos(this.cursors[i].x, this.cursors[i].y));


         }
     }

     this.prepare_DOM = function() {


         this.cell_width = Math.floor(400 / this.x_size);
         this.cell_height = Math.floor(400 / this.y_size);
         for (let i = 0; i < this.x_size * this.y_size; i++) {
             let cell = $("<div>");
             cell.addClass("cell");
             cell.attr("pos", i);
             cell.css({
                 "flex-basis": this.cell_width,
                 "text-align": "center",
                 "height": this.cell_height + "px"
             });
             cell.text("")
             cell.appendTo("#grid");
         }
         this.DOM = $("#grid");

         // preparing separate events for cells

         let self = this;

         this.DOM.children().on("click", function() {
             let addr = $(this).attr("pos");
             
         });
     }


     this.render_DOM = function() {

         // console.log(this.triggerBuffer);

         // rewriting standard elements into DOM

         for (let i = 0; i < this.x_size * this.y_size - 1; i++) {

             // bouncers

             if (this.map[i].type === "bouncer") {
                 if (this.bouncerBuffer.indexOf(i) != -1) {
                     this.DOM.children().eq(i).removeClass();
                     this.DOM.children().eq(i).addClass("bouncer-lighter")
                 } else {
                     this.DOM.children().eq(i).removeClass();
                     this.DOM.children().eq(i).addClass("bouncer-normal")
                 };
             }

             // triggers 

             if (this.map[i].subtype === "trigger") {
                 if (this.triggerBuffer.indexOf(i) != -1) {
                     this.DOM.children().eq(i).removeClass();
                     this.DOM.children().eq(i).addClass("trigger-lighter")
                 } else {
                     this.DOM.children().eq(i).removeClass();
                     this.DOM.children().eq(i).addClass("trigger-normal")
                 };
             }

         }


         for (let i = 0; i < this.cursors.length; i++) { // lighting up cursors
             this.DOM.children().eq(this.pos(this.cursors[i].x, this.cursors[i].y)).addClass("cursor");
             this.DOM.children().eq(this.pos(this.cursors[i].x, this.cursors[i].y)).text(i);
             this.DOM.children().eq(this.pos(this.cursors[i].history_x, this.cursors[i].history_y)).removeClass("cursor");
             this.DOM.children().eq(this.pos(this.cursors[i].history_x, this.cursors[i].history_y)).text("");
         }


         // cleaning buffers

         this.triggerBuffer = [];
         this.bouncerBuffer = [];
     }
 }

 module.exports = matrixProto;

/***/ })
/******/ ]);