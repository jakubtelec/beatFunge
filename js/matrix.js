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
     subtype: "";
     direction: "none";
 }

 var matrixProto = function(x_size, y_size) {

     // globals 

     this.bpm = 180; // beats per minute
     this.bars = 4; // bars per beat
     this.beat = 0; // beat counter
     this.action = { // action for click
         type: "object",
         index: 0,
         direction: ""
     }; // type of interacton - for events
     this.state = "pause" // state of app

     // grid size

     this.x_size = x_size;
     this.y_size = y_size;

     // tables 

     this.map = []; // empty map of cells
     this.cursors = []; // empty map of cursors

     //buffers

     this.soundBuffer = []; // map of sounds to play at one step
     this.triggerBuffer = []; //map of triggers to light up
     this.bouncerBuffer = []; //map of bouncers to light up

     // DOM 

     this.DOM = {};
     this.topPanel = {};
     this.rightPanel = {};
     this.bottomPanel = {};


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
         this.map[addr].direction = direction;
         this.map[addr].solid = false;
     }

     this.set_trigger = function(x, y) {
         let addr = this.pos(x, y);
         this.map[addr].subtype = "trigger";
         this.map[addr].solid = false;
     }

     // let's move things atround! 

     this.animate_cursors = function() {

         // moving cursors and detecting interactions with obiejcts on map

         this.beat++;
         this.soundBuffer = [];

         for (var i = 0; i < this.cursors.length; i++) {

             let cursor_field = this.pos(this.cursors[i].x, this.cursors[i].y);
             let right_field = this.pos(this.cursors[i].x + 1, this.cursors[i].y);
             let left_field = this.pos(this.cursors[i].x - 1, this.cursors[i].y);
             let up_field = this.pos(this.cursors[i].x, this.cursors[i].y - 1);
             let down_field = this.pos(this.cursors[i].x, this.cursors[i].y + 1);
             this.cursors[i].history_x = this.cursors[i].x;
             this.cursors[i].history_y = this.cursors[i].y;
             // detect triggers and store sounds and triggers into buffers

             if (this.map[cursor_field].subtype === "trigger") {
                 this.soundBuffer.push(this.cursors[i].sound);
                 this.triggerBuffer.push(cursor_field);
             }

             if (this.map[cursor_field].type === "pipe") {
                 this.cursors[i].direction = this.map[cursor_field].direction;
             }

             // move stuff around



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

         }
     }

     this.prepare_DOM = function(soundbank) {

         // --- INITS ---

         this.topPanel = $("#top-panel");
         this.DOM = $("#grid");
         this.rightPanel = $("#right-panel");
         this.bottomPanel = $("#bottom-panel");
         let sampleBank = $(".sample-bank");
         let app = $("#app");
         let play = $("#play");
         let pause = $("#pause");
         console.log(this.sampleBank);

         // pinpointing and catching that damn scope :)  

         let self = this;

         // --- TOP PANEL --- 
         // creating events for controls

         play.on("click", function() {
             self.state = "play";
             let target = $(this);
             target.addClass("select")
             setTimeout(function() {
                 target.removeClass("select");
             }, 300);
         })

         pause.on("click", function() {
             self.state = "pause";
             let target = $(this);
             target.addClass("select")
             setTimeout(function() {
                 target.removeClass("select");
             }, 300);

         })

         //  --- GRID --- 
         // calculate screen and grid size

         app.css("width", 34 * this.x_size + 45 + "px"); // app window
         this.topPanel.css("width", 34 * this.x_size - 10 + "px"); // top panel
         this.DOM.css("width", 34 * this.x_size + 10 + "px");

         for (let i = 0; i < this.x_size * this.y_size; i++) {
             let cell = $("<div>");
             cell.addClass("cell");
             cell.attr("pos", i);
             cell.text("")
             cell.appendTo("#grid").fadeIn();
         }

         // create grid events - clicks

         this.DOM.children().on("click", function() {

             let target = $(this);
             let addr = target.attr("pos");

             if (self.action.type == "object" && self.action.index == 0) {
                 target.removeClass();
                 target.addClass("cell")
                 target.addClass("trigger");
                 self.set_trigger(addr % self.x_size, Math.floor(addr / self.x_size));
             }

             if (self.action.type == "object" && self.action.index == 1) {
                 target.removeClass();
                 target.addClass("cell")
                 target.addClass("bouncer");
                 target.text("#")
                 self.set_bouncer(addr % self.x_size, Math.floor(addr / self.x_size));
             }

             if (self.action.type == "object" && self.action.index > 2 && self.action.index < 7) {
                 target.removeClass();
                 target.addClass("cell");
                 // target.text(self.rightPanel.children().eq(self.action.index));
                 console.log(self.action.direction);
                 self.set_pipe(addr % self.x_size, Math.floor(addr / self.x_size), self.action.direction);
             }

             if (self.action.type == "cursor") {
                 target.removeClass();
                 target.addClass("cell")
                 self.set_cursor(addr % self.x_size, Math.floor(addr / self.x_size), self.action.direction, self.action.index);
             }

             target.addClass("select")

             setTimeout(function() {
                 target.removeClass("select");
             }, 300);


         })

         // create grid events - doubleclick

         this.DOM.children().on("dblclick", function() {

             let target = $(this);
             let addr = target.attr("pos");
             self.map[addr].type = "empty";
             self.map[addr].subtype = "";
             target.removeClass();
             target.text("")
             target.addClass("cell");

         })


         // --- RIGHT PANEL --- 

         // create events

         this.rightPanel.children().on("click", function() {
             self.action.type == "cursor" ? self.bottomPanel.children().children().removeClass("glow") : self.rightPanel.children().removeClass("glow");
             let target = $(this);
             self.action.type = "object";
             console.log(target.index());
             self.rightPanel.children().eq(self.action.index).removeClass("glow");
             self.action.index = target.index();
             (target.index() == 3) && (self.action.direction = "right");
             (target.index() == 4) && (self.action.direction = "left");
             (target.index() == 5) && (self.action.direction = "down");
             (target.index() == 6) && (self.action.direction = "up");
             target.addClass("glow");
         })

         // --- BOTTOM PANEL --- 

         // create sample list

         this.bottomPanel.css("width", 34 * x_size + 50 + "px");

         soundbank.sounds.forEach((element, index) => {

             (index > 0 ? sampleBank.clone().appendTo(self.bottomPanel) : null)

             let cutStart = element._src.lastIndexOf("/") + 1;
             let name = element._src.slice(cutStart, element._src.length - 4);

             let lastBank = self.bottomPanel.children().last()
             lastBank.attr("pos", index)
             lastBank.children().eq(0).text(index);
             lastBank.children().eq(1).text(name);

             lastBank.children().on("click", function() {

                 self.action.type == "cursor" ? self.bottomPanel.children().children().removeClass("glow") : self.rightPanel.children().removeClass("glow");
                 let target = $(this);
                 clickIndex = target.index();
                 target.parent().children().eq(0).addClass("glow");
                 target.parent().children().eq(1).addClass("glow");
                 (clickIndex > 2 ? target.parent().children().eq(clickIndex).addClass("glow") : target.parent().children().eq(2).addClass("glow"));

                 self.action.type = "cursor";
                 self.action.index = target.parent().attr("pos");

                 (clickIndex > -1 && clickIndex < 3) && (self.action.direction = "right");
                 (clickIndex == 3) && (self.action.direction = "left");
                 (clickIndex == 4) && (self.action.direction = "down");
                 (clickIndex == 5) && (self.action.direction = "up");

             })
         });

     };



     this.render_DOM = function() {

         // console.log(this.triggerBuffer);

         // rewriting standard elements into DOM

         for (let i = 0; i < this.x_size * this.y_size - 1; i++) {

             // triggers 

             if (this.map[i].subtype === "trigger") {
                 if (this.triggerBuffer.indexOf(i) != -1) {
                     this.DOM.children().eq(i).addClass("cell");
                     this.DOM.children().eq(i).addClass("trigGlow");
                     setTimeout(() => {
                         this.DOM.children().eq(i).removeClass("trigGlow");
                     }, 100);
                 }
             }

             // pipes

             if (this.map[i].type === "pipe") {

                 (this.map[i].direction === "right") && (this.DOM.children().eq(i).text("→"));
                 (this.map[i].direction === "left") && (this.DOM.children().eq(i).text("←"));
                 (this.map[i].direction === "up") && (this.DOM.children().eq(i).text("↑"));
                 (this.map[i].direction === "down") && (this.DOM.children().eq(i).text("↓"));
             }

         }


         for (let i = 0; i < this.cursors.length; i++) { // lighting up cursors
             this.DOM.children().eq(this.pos(this.cursors[i].x, this.cursors[i].y)).addClass("cursor");
             this.DOM.children().eq(this.pos(this.cursors[i].x, this.cursors[i].y)).text(this.cursors[i].sound);
             this.DOM.children().eq(this.pos(this.cursors[i].history_x, this.cursors[i].history_y)).removeClass("cursor");
             this.DOM.children().eq(this.pos(this.cursors[i].history_x, this.cursors[i].history_y)).text("");
         }


         // cleaning buffers

         this.triggerBuffer = [];
         this.bouncerBuffer = [];
     }
 }

 module.exports = matrixProto;