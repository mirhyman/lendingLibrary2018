'use strict';

class Product {

    constructor(name = '', upperName = '', hardware = false, access = undefined, platform = undefined, languages = undefined, brand = '',
    price = 0, features = undefined, id =0, img = '', professional = false, badges = undefined, spec = undefined, description = '',
                longDescription = undefined, other = undefined, purchase = undefined,
                support = undefined, contactPhone = undefined,
                training = undefined, contactEmail = undefined, contactLink = undefined,
                trainContext = ''
               ) {
        this.name = name;
        this.upperName = upperName;
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
        this.purchase = purchase;
        this.support = support;
        this.contactPhone = contactPhone;
        this.contactLink = contactLink;
        this.contactEmail = contactEmail;
        //this.setup = setup;
        //this.use = use;
        this.training = training;
        this.trainContext = trainContext;



    }

    static fromDb({name, upperName, hardware, access, platform, languages, brand, price, features,id,img, professional,
                      badges, spec, description, longDescription, other, purchase, support, contactPhone,
                  training, contactEmail, contactLink, trainContext}) {
        return new Product(name.toLowerCase(), upperName, hardware, access, platform, languages,
            brand, price, features, id, img, professional, badges, spec, description, longDescription, other
        ,purchase, support, contactPhone, training, contactEmail,contactLink,
            trainContext);
    }
}

module.exports = Product;