if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.createCertificate.helpers({
    publicKeyHost: function(){
      return "Girresawgrntej6uj"
    },
    certificateCategories:[
      {category: "category 1"},
      {category: "category 2"},
      {category: "category 3"}
    ],
    certificateTemplate:[
      {title: "title 1"},
      {title: "title 2"},
      {title: "title 3"}
    ]
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
