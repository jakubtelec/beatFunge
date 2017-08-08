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
     this.action = {
        type: "normal",
        subtype: 0
     }; // type of interacton - for events

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

     this.prepare_DOM = function(soundbank) {

         // --- INITS ---

         this.DOM = $("#grid");
         this.rightPanel = $("#right-panel");
         this.bottomPanel = $("#bottom-panel");
         let sampleBank = $(".sample-bank");
         console.log(this.sampleBank);

         let self = this;

         //  --- GRID --- 

         // calculate grid size 

         this.DOM.css("width", 34 * x_size + 15 + "px")

         for (let i = 0; i < this.x_size * this.y_size; i++) {
             let cell = $("<div>");
             cell.addClass("cell");
             cell.attr("pos", i);
             cell.text("")
             cell.appendTo("#grid");
         }

         // create events

         this.DOM.children().on("click", function() {

             let target = $(this);
             let addr = target.attr("pos");

             if (self.action.type =="normal" && self.action.subtype == 0) {
                 target.removeClass();
                 target.addClass("cell")
                 target.addClass("trigger");
                 self.set_trigger(addr % self.x_size, Math.floor(addr / self.x_size));
             }

             if (self.action.type =="normal" && self.action.subtype == 1) {
                 target.removeClass();
                 target.addClass("cell")
                 target.addClass("bouncer");
                 target.text("#")
                 self.set_bouncer(addr % self.x_size, Math.floor(addr / self.x_size));
             }


         })

         this.DOM.children().on("dblclick", function() {

             let target = $(this);
             let addr = target.attr("pos");
             self.map[addr].type = "empty";
             self.map[addr].subtype = "";
             target.removeClass();
             target.addClass("cell");
         })


         // --- RIGHT PANEL --- 

         // create events

         this.rightPanel.children().on("click", function() {
             let target = $(this);
             self.action.type = "normal"; 
             console.log(target.index());
             self.rightPanel.children().eq(self.action.subtype).removeClass("glow");
             self.action.subtype = target.index();
             target.addClass("glow");
         })

         // --- BOTTOM PANEL --- 

         // create sample list

         this.bottomPanel.css("width", 34 * x_size + 50 + "px");

         soundbank.sounds.forEach((element,index) => {
            
            if (index > 0) {sampleBank.clone().appendTo(self.bottomPanel);}

            let cutStart = element._src.lastIndexOf("/") + 1;
            let name = element._src.slice(cutStart,element._src.length - 4);

            let lastBank = self.bottomPanel.children().last().children()
            lastBank.eq(0).text(index);
            lastBank.eq(1).text(name);

            lastBank.on("click", function() {
                self.bottomPanel.children().children().removeClass("glow");
                let target = $(this);
                clickIndex = target.index();
                lastBank.eq(0).addClass("glow");
                lastBank.eq(1).addClass("glow");
                (clickIndex > 2 ? lastBank.eq(clickIndex).addClass("glow") : lastBank.eq(2).addClass("glow"));
                console.log(target.index());






            })
         });


         // sampleBank = $(".sample-bank");

         // sampleBank.forEach((element,index) 
         //    )

         // sampleBank.children().on("click", function() {
         //    console.log('klik!');

         // })









     };



     this.render_DOM = function() {

         // console.log(this.triggerBuffer);

         // rewriting standard elements into DOM

         for (let i = 0; i < this.x_size * this.y_size - 1; i++) {

             // bouncers

             // if (this.map[i].type === "bouncer") {
             //     if (this.bouncerBuffer.indexOf(i) != -1) {
             //         this.DOM.children().eq(i).removeClass();
             //         this.DOM.children().eq(i).addClass("cell");
             //         this.DOM.children().eq(i).addClass("bouncer")
             //     } else {
             //         this.DOM.children().eq(i).removeClass();
             //         this.DOM.children().eq(i).addClass("cell");
             //         this.DOM.children().eq(i).addClass("bouncer")
             //     };
             // }

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