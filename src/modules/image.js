'use strict';

class Image {

    constructor(id = 0, pic = undefined) {
        this.id = id;
        this.pic = pic;
    }

    static fromDb({id, pic}) {
        return new Image(id, pic);
    }
}

module.exports = Image;