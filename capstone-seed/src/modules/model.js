'use strict';

class Product {

    constructor(name = '', hardware = false, access = undefined, platform = undefined, languages = undefined, brand = '',
    price = 0, features = undefined, id =0, img = '') {
        this.name = name;
        this.hardware = hardware;
        this.access = access;
        this.platform = platform;
        this.languages = languages;
        this.brand = brand;
        this.price = price;
        this.features = features;
        this.id = id;
        this.img = img;
    }

    static fromDb({name, hardware, access, platform, languages, brand, price, features,id,img}) {
        return new Product(name.toLowerCase(), hardware, access, platform, languages,
            brand, price, features, id, img);
    }
}

module.exports = Product;