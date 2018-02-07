'use strict';

class Review {

    constructor(id = 0, title = '', tags = undefined, body = '', context = '', author = '') {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.body = body;
        this.context = context;
        this.author = author;
    }

    static fromDb({id, title, tags, body, context, author}) {
        return new Review(id, title, tags, body, context,
            author);
    }
}

module.exports = Review;