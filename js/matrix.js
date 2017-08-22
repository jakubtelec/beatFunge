 var sampleProto = function(x, y, direction, sound) {
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

     this.bpm = 100; // beats per minute
     this.bars = 4; // bars per beat
     this.bar = 0; // bar counter
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
     this.samples = []; // empty map of samples

     // buffers

     this.soundBuffer = []; // map of sounds to play at one step
     this.triggerBuffer = []; //map of triggers to light up

     // DOM 

     this.grid = {};
     this.topPanel = {};
     this.barCounter = {};
     this.rightPanel = {};
     this.bottomPanel = {};
     this.tooltips = $(".tooltip-off");
     this.tooltipsLeft = $(".tooltip-left-off");


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

     // methods for setting up cells and samples

     this.set_sample = function(x, y, direction = "right", sound) {
         this.samples.push(new sampleProto(x, y, direction, sound));
     }

     this.set_bouncer = function(x, y) {
         let addr = this.pos(x, y);
         this.map[addr].type = "bouncer";
         this.map[addr].solid = true;
         this.grid.children().eq(addr).removeClass();
         this.grid.children().eq(addr).addClass("cell")
         this.grid.children().eq(addr).addClass("bouncer");
         this.grid.children().eq(addr).text("#")
     }

     this.set_arrow = function(x, y, direction = "right") {
         let addr = this.pos(x, y);
         this.map[addr].type = "arrow";
         this.map[addr].direction = direction;
         this.map[addr].solid = false;
        (direction === "right") && (this.grid.children().eq(addr).text("→"));
         (direction === "left") && (this.grid.children().eq(addr).text("←"));
         (direction === "up") && (this.grid.children().eq(addr).text("↑"));
         (direction === "down") && (this.grid.children().eq(addr).text("↓"));
     }

     this.set_trigger = function(x, y) {
         let addr = this.pos(x, y);
         this.map[addr].subtype = "trigger";
         this.map[addr].solid = false;
         this.grid.children().eq(addr).addClass("cell")
         this.grid.children().eq(addr).addClass("trigger");
     }

     this.switch_help = function() {
         let help = $("#help");
         this.tooltips.toggleClass("tooltip tooltip-off");
         this.tooltipsLeft.toggleClass("tooltip-left tooltip-left-off");
         help.toggleClass("help-off help-on");
         help.addClass("select");
         setTimeout(function() {
             help.removeClass("select");
         }, 300);
     }

     this.prepare_DOM = function(soundbank) {

         // --- INITS ---

         this.topPanel = $("#top-panel");
         this.barCounter = $("#bar-counter");
         this.grid = $("#grid");
         this.rightPanel = $("#right-panel");
         this.bottomPanel = $("#bottom-panel");
         let sampleBank = $(".sample-bank");
         let app = $("#app");
         let play = $("#play");
         let step = $("#step");
         let pause = $("#pause");
         let help = $("#help");

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

         step.on("click", function() {
             if (self.state != "play") {
                 self.state = "step";
                 let target = $(this);
                 target.addClass("select");
                 setTimeout(function() {
                     target.removeClass("select");
                 }, 300);
             }
         })

         //  --- GRID --- 
         // calculate screen and grid size

         app.css("width", 34 * this.x_size + 45 + "px"); // app window
         this.topPanel.css("width", 34 * this.x_size - 10 + "px"); // top panel
         this.grid.css("width", 34 * this.x_size + 10 + "px");

         for (let i = 0; i < this.x_size * this.y_size; i++) {
             let cell = $("<div>");
             cell.addClass("cell");
             cell.attr("pos", i);
             cell.text("")
             cell.appendTo("#grid").fadeIn();
         }

         // create grid events for each cell - single clicks

         this.grid.children().on("click", function() {

             // vars 

             let target = $(this);
             let addr = target.attr("pos");

             // adding trigger 

             if (self.action.type == "object" && self.action.index == 0) {
                 self.set_trigger(addr % self.x_size, Math.floor(addr / self.x_size));
             }

             // adding bouncer 

             if (self.action.type == "object" && self.action.index == 1) {
                 self.set_bouncer(addr % self.x_size, Math.floor(addr / self.x_size));
             }

             // removing object OR CURSOR 

             if (self.action.type == "object" && self.action.index == 2) {

                 // removing object - trigger, bouncer or arrow, then...

                 self.map[addr].type = "empty";
                 self.map[addr].subtype = "";
                 target.removeClass();
                 target.text("")
                 target.addClass("cell");

                 // ...checking for samples and removing them - in case 

                 let sample_field = 0;
                 let samples_temp = [];
                 for (let i = 0; i < self.samples.length; i++) {
                     sample_field = self.pos(self.samples[i].x, self.samples[i].y);
                     (sample_field != target.attr("pos")) && (samples_temp.push(self.samples[i]))
                 }

                 // writing down new table of samples 

                 self.samples = samples_temp;
             }

             if (self.action.type == "object" && self.action.index > 2 && self.action.index < 7) {
                 self.set_arrow(addr % self.x_size, Math.floor(addr / self.x_size), self.action.direction);
             }

             if (self.action.type == "sample") {
                 self.set_sample(addr % self.x_size, Math.floor(addr / self.x_size), self.action.direction, self.action.index);
             }

             target.addClass("select")
             setTimeout(function() {
                 target.removeClass("select");
             }, 300);

         })

         // --- RIGHT PANEL --- 

         // create events

         this.rightPanel.children().on("click", function() {
             self.action.type == "sample" ? self.bottomPanel.children().children().removeClass("glow") : self.rightPanel.children().removeClass("glow");
             let target = $(this);
             self.action.type = "object";
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
             let name = element._src.substring(cutStart + 2, element._src.length - 4);


             let lastBank = self.bottomPanel.children().last()
             lastBank.attr("pos", index);
             lastBank.children().eq(0).text(index);
             lastBank.children().eq(1).text(name);

             lastBank.children().on("click", function() {

                 self.action.type == "sample" ? self.bottomPanel.children().children().removeClass("glow") : self.rightPanel.children().removeClass("glow");
                 let target = $(this);
                 clickIndex = target.index();
                 target.parent().children().eq(0).addClass("glow");
                 target.parent().children().eq(1).addClass("glow");
                 (clickIndex > 2 ? target.parent().children().eq(clickIndex).addClass("glow") : target.parent().children().eq(2).addClass("glow"));

                 self.action.type = "sample";
                 self.action.index = target.parent().attr("pos");

                 (clickIndex > -1 && clickIndex < 3) && (self.action.direction = "right");
                 (clickIndex == 3) && (self.action.direction = "left");
                 (clickIndex == 4) && (self.action.direction = "down");
                 (clickIndex == 5) && (self.action.direction = "up");

             })
         });

         help.on("click", function() {
             self.switch_help();
         })

     };


     this.animate_samples = function() {

         // moving samples and detecting interactions with obiejcts on map

         (this.state != "pause") && (this.bar++);
         this.soundBuffer = [];

         for (let i = 0; i < this.samples.length; i++) {

             let sample_field = this.pos(this.samples[i].x, this.samples[i].y);
             let right_field = this.pos(this.samples[i].x + 1, this.samples[i].y);
             let left_field = this.pos(this.samples[i].x - 1, this.samples[i].y);
             let up_field = this.pos(this.samples[i].x, this.samples[i].y - 1);
             let down_field = this.pos(this.samples[i].x, this.samples[i].y + 1);
             this.samples[i].history_x = this.samples[i].x;
             this.samples[i].history_y = this.samples[i].y;

             if (this.map[sample_field].type === "arrow") {
                 this.samples[i].direction = this.map[sample_field].direction;
             }

             // move stuff around

             switch (this.samples[i].direction) {
                 case "right":
                     if (this.samples[i].x == this.x_size - 1 || this.map[right_field].type == "bouncer") { // bounce sample to the left
                         this.samples[i].x--;
                         this.samples[i].direction = "left";
                     } else {
                         this.samples[i].x++;
                     }
                     break;
                 case "left":
                     if (this.map[left_field] === undefined || this.samples[i].x == 0 || this.map[left_field].type == "bouncer") { // bounce sample to the right
                         this.samples[i].x++;
                         this.samples[i].direction = "right";
                     } else {
                         this.samples[i].x--;
                     }
                     break;
                 case "down":
                     if (this.map[down_field] === undefined || this.samples[i].y == this.y_size - 1 || this.map[down_field].type == "bouncer") { // bounce sample up
                         this.samples[i].y--;
                         this.samples[i].direction = "up";
                     } else {
                         this.samples[i].y++;
                     }
                     break;
                 case "up":
                     if (this.map[up_field] === undefined || this.samples[i].y == 0 || this.map[up_field].type == "bouncer" || this.samples[i].y == 0) { // bounce sample down
                         this.samples[i].y++;
                         this.samples[i].direction = "down";
                     } else {
                         this.samples[i].y--;
                     }
                     break;
             }

             // detect triggers and store sounds and triggers into buffers

             sample_field = this.pos(this.samples[i].x, this.samples[i].y);

             if (this.map[sample_field].subtype === "trigger") {
                 this.soundBuffer.push(this.samples[i].sound);
                 this.triggerBuffer.push(sample_field);
             }

         }
     }


     this.render_DOM = function() {

         // bar counter
         (this.state != "pause") && (this.barCounter.css("transform", "rotate(" + (45 + (this.bar % 4) * 90) + "deg)"));
         // in case step button is pressed - change state to pause
         (this.state == "step") && (this.state = "pause");


         for (let i = 0; i < this.samples.length; i++) {

             // lighting up samples

             let pos = this.pos(this.samples[i].x, this.samples[i].y);
             let last_pos = this.pos(this.samples[i].history_x, this.samples[i].history_y);

             this.grid.children().eq(pos).addClass("sample");
             this.grid.children().eq(pos).text(this.samples[i].sound);

             if (this.bar > 0) {

                 this.grid.children().eq(last_pos).removeClass("sample");

                 if (this.triggerBuffer.indexOf(pos) != -1) {
                     this.grid.children().eq(pos).addClass("trigGlow");

                     // method below is clean and elegant, but deadly for app's performance
                     // so I had to remove it

                     // setTimeout(() => {
                     //     this.grid.children().eq(pos).removeClass("trigGlow");
                     // }, 100);
                 }

                 if (this.map[last_pos].type === "arrow") {

                     (this.map[last_pos].direction === "right") && (this.grid.children().eq(last_pos).text("→"));
                     (this.map[last_pos].direction === "left") && (this.grid.children().eq(last_pos).text("←"));
                     (this.map[last_pos].direction === "up") && (this.grid.children().eq(last_pos).text("↑"));
                     (this.map[last_pos].direction === "down") && (this.grid.children().eq(last_pos).text("↓"));

                 } else if (this.map[last_pos].subtype === "trigger") {

                     this.grid.children().eq(last_pos).text("");
                     this.grid.children().eq(last_pos).removeClass("trigGlow");

                 } else { this.grid.children().eq(last_pos).text("");}
             }
         }

         // cleaning buffers

         this.triggerBuffer = [];

     }

 }

 module.exports = matrixProto;