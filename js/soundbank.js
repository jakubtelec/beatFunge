var soundbankProto = function() {

    // table for howler soundbank

    this.sounds = [];

    // sound loader - table of filenames as argument

    this.load_sounds = function(path, filenames) {

        filenames.forEach((element) => {
            this.sounds.push(new Howl({
                src: [path + element + ".wav"]
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