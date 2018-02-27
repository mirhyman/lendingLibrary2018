'use strict';

class Product {

    constructor(name = '', hardware = false, access = undefined, platform = undefined, languages = undefined, brand = '',
    price = 0, features = undefined, id =0, img = '', professional = false, badges = undefined, spec = undefined, description = '',
                longDescription = undefined, other = undefined
               ) {
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
        this.longDescription = longDescription;
        this.other = other;



    }

    static fromDb({name, hardware, access, platform, languages, brand, price, features,id,img, professional,
                      badges, spec, description, longDescription, other}) {
        return new Product(name.toLowerCase(), hardware, access, platform, languages,
            brand, price, features, id, img, professional, badges, spec, description, longDescription, other);
    }
}

module.exports = Product;