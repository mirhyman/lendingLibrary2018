'use strict';

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000000';

class User {
    // private ctor
    constructor (userId = null, name = ''){
        this.userId = userId;
        this.name = name;
    }

    static fromDb({userId, name}) {
        return new User(userId.toLowerCase(), name);
    }

    static Default() {return new User(User.DefaultId());}
    static DefaultId() {return DEFAULT_USER_ID;}
}

module.exports = User;