

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {


  Template.createCertificate.helpers({
    certificateCategories:[
      {category: "category 1"},
      {category: "category 2"},
      {category: "category 3"}
    ],
    certificateTemplates:[
      {title: "title 1"},
      {title: "title 2"},
      {title: "title 3"}
    ]
  });

  Template.floatingButtonCreateCertificate.events({

    "click .date-btn": function () {
      if($('.date-btn').hasClass('add')){
        $('.date-wrapper').show();
        $('#date-icon')[0].innerHTML = "clear";
        $('.date-btn').removeClass("add");
        $('.date-btn').addClass("red cancel");
      }
      else {
        $('.datepicker').val(""); // clearing the value on hide
        $('.date-wrapper').hide();
        $('#date-icon')[0].innerHTML = "date_range";
        $('.date-btn').removeClass("red cancel");
        $('.date-btn').addClass("add");
      }
    },

    "click .description-btn": function () {
      if($('.description-btn').hasClass('add')){
        $('.description-wrapper').show();
        $('#desc-icon')[0].innerHTML = "clear";
        $('.description-btn').removeClass("add");
        $('.description-btn').addClass("red cancel");
      }
      else {
        $('textarea').val("");
        $('.description-wrapper').hide();
        $('#desc-icon')[0].innerHTML = "insert_comment";
        $('.description-btn').removeClass("red cancel");
        $('.description-btn').addClass("add");
      }
    }
  });

  Template.search.events({
    "submit #searchForm":function(event){
      console.log("hola");
      event.preventDefault();
      var searchAuthorizer = event.target.searchAuthorizer.value;
      var searchIndividual = event.target.searchIndividual.value;
      window.location.assign("/explore/"+searchAuthorizer+"/"+searchIndividual);
    }
  });

  Template.publicKeyInput.helpers({
    publicKeyHost: function(){
      return "Girresawgrntej6uj"
    },
  });

  Template.explore.helpers({
    
  });

  Template.createCertificate.onRendered(function() {
    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('.tooltipped').tooltip({delay: 50});
  });


}

function getParameter(paramName) {
  var searchString = window.location.search.substring(1),
      i, val, params = searchString.split("&");

  for (i=0;i<params.length;i++) {
    val = params[i].split("=");
    if (val[0] == paramName) {
      return val[1];
    }
  }
  return null;
}
