//Certificates = new Mongo.Collection("certificates");

Router.route('/explore', function(){
  this.render('explore');
});
Router.route('/createCertificate', function () {
  this.render('createCertificate');
});
Router.route('/explore/:authSearch/:individualSearch', function(){
  this.render('explore',{
    data: {
      certificates: Certificates.find({$and:[{public_key_auth: this.params.authSearch},{public_key_individual: this.params.individualSearch}]})
    }
  });
});
