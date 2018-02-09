'use strict';

class Review {

    constructor(id = 0, reviews = undefined) {
        this.id = id;
        //this.title = title;
        //this.tags = tags;
        //this.body = body;
        //this.context = context;
        //this.author = author;
        this.reviews = reviews;
    }

    static fromDb({id, reviews}) {
        return new Review(id, reviews);
    }
}

module.exports = Review;