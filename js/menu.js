    var soundbankProto = require("./soundbank.js");
    var matrixProto = require("./matrix.js");

    var menuProto = function() {

        this.app = $("#app");
        this.menu = $("#menu");
        this.kits = $(".kits");
        this.bpm_counter = $("#bpm-counter");
        this.soundbank = 0;
        this.bpm = 120;

        this.bank = {};
        this.matrix = {};

        this.init_menu = function() {

            this.app.hide();
            this.menu.hide();
            this.menu.fadeIn(200);

            let self = this;

            $(".menu-row div").on("click", function() {

                let target = $(this);

                if (target.is("#demo")) {
                    self.soundbank = 0;
                    self.kits.children().removeClass("glow");
                    target.addClass("glow");
                }

                if (target.is("#roland-808")) {
                    self.soundbank = 1;
                    self.kits.children().removeClass("glow");
                    target.addClass("glow");
                }

                if (target.is("#plucked")) {
                    self.soundbank = 2;
                    self.kits.children().removeClass("glow");
                    target.addClass("glow");
                }

                if (target.is("#bpm-down")) {
                    self.bpm -= 5;
                    self.bpm_counter.text(self.bpm)
                }

                if (target.is("#bpm-up")) {
                    self.bpm += 5;
                    self.bpm_counter.text(self.bpm)
                }

                // STARTING APP

                if (target.is("#start-app")) {

                    self.bank = new soundbankProto();

                    if (self.soundbank == 0) {self.bank.load_sounds("./audio/X_DEMO/", ["00kick", "01bass kick", "02snare 1", "03snare 2", "04claps", "05open hh", "06closed hh 1", "07closed hh 2", "08rim 1", "09rim 2", "10knocker", "11stab"]) }

                    if (self.soundbank == 1) {self.bank.load_sounds("./audio/A_808/", ["00kick", "01bass", "02clap", "03clap 2", "04snare", "05cymbal", "06closed hh", "07open hh", "08tom", "09tom 2"]) }

                    if (self.soundbank == 2) {self.bank.load_sounds("./audio/B_SYNTH_F_MINOR/", ["00synth F", "01synth G", "02synth Ab", "03synth Bb", "04synth C", "05synth Db", "06synth Eb", "07synth F 2"]) }

                    self.matrix = new matrixProto(17, 17);

                    self.matrix.init_map();
                    self.matrix.prepare_DOM(self.bank);


                    // DEMO CONTENT 
                    // (cuntent must be prepared after soundbank init) 

                    if (self.soundbank == 0) {

                    	self.matrix.set_cursor(0,0,"right",0);
                    	self.matrix.set_trigger(0,0);
                    	self.matrix.set_trigger(4,0);
                    	self.matrix.set_trigger(8,0);
                    	self.matrix.set_trigger(12,0);
                    	self.matrix.set_trigger(16,0);


                    }

                    self.matrix.render_DOM();
                    

                    self.menu.fadeOut(200, "swing", () => self.app.fadeIn(200));


                    mainLoop = setInterval(function() {
                        if (self.matrix.state != "pause") {
                            self.matrix.animate_cursors();
                            self.bank.trigger_sounds(self.matrix.soundBuffer);
                        }
                        self.matrix.render_DOM();
                    }, Math.round(60000 / self.bpm / self.matrix.bars));

                }


                target.addClass("select")
                setTimeout(function() {
                    target.removeClass("select");
                }, 300);
            })


        }

    }

    module.exports = menuProto;