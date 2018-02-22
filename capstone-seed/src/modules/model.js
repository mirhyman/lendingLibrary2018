'use strict';

class Product {

    constructor(name = '', hardware = false, access = undefined, platform = undefined, languages = undefined, brand = '',
    price = 0, features = undefined, id =0, img = '', professional = false, badges = undefined, spec = undefined, description = '') {
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
        this.professional = professional;
        this.badges = badges;
        this.spec = spec;
        this.description = description;

    }

    static fromDb({name, hardware, access, platform, languages, brand, price, features,id,img, professional, badges, spec, description}) {
        return new Product(name.toLowerCase(), hardware, access, platform, languages,
            brand, price, features, id, img, professional, badges, spec, description);
    }
}

module.exports = Product;