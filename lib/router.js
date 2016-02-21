Certificates = new Mongo.Collection("certificates");
Authorities = new Mongo.Collection("authorities");
//db.authorities.insert({private_key: "7e92ecff56110d14cc0c3e87d6cfd47aa63063bad784e30ac608e04c254021bf", public_key: "2838322b5cc80f45f179a89fc2a84c3b599093fb2f076b765c3a818f04723924c6d8bb1c1cc76ef88526b2f07d8dd818d8f78ea9303175beffcb3f6344bde4a2", name: "ITESM", rfc: "ITESM123", email: "certex@itesm.mx", password: "123456", phone: "8114206389", createdAt: new Date()});
Individuals = new Mongo.Collection("individuals");
//db.authorities.insert({private_key: "8c1cd00a2a764199406da6b6902aebbc7532c8e49c029000d75d46827c68460f", public_key: "8a23e74268f4d22a25f709f7ec9703df0c0aa66f6091e826cb411ca3af87c3dc7fed7bba93661105e4b90a57aa615bb33c3d13909b5a394d1bc8f7460a9b5f7d", name: "Juan Lorenzo Gonzalez", email: "juan.lorenzo@outlook.com", password: "123456", curp: "GOZJ910319HVZNXN07", photo: "/img/juan.jpg"});

Router.route('/explore', function(){
  this.render('explore');
});
Router.route('/createCertificate', function () {
  console.log(Authorities.findOne({name: "ITESM"}));
  this.render('createCertificate', {
    data: {
      authority: Authorities.find({name: "ITESM"})
    }
  });
});
Router.route('/explore/:authSearch/:individualSearch', function(){
  this.render('explore',{
    data: {
      certificates: Certificates.find({$and:[{public_key_auth: this.params.authSearch},{public_key_individual: this.params.individualSearch}]})
    }
  });
});
Router.route('/explore/:keySearch', function(){
  this.render('explore',{
    data: {
      certificates: Certificates.find({$or:[{public_key_auth: this.params.keySearch},{public_key_individual: this.params.keySearch}]})
    }
  });
});
