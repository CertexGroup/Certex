
if (Meteor.isServer) {
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

  Template.registerAuthority.events({
    "submit":function(event){
      event.preventDefault();

      var submitted_name = event.target.authName.value;
      var submitted_RFC = event.target.authRFC.value;
      var submitted_email = event.target.authEmail.value;
      var submitted_phone = event.target.authPhone.value;
      var submitted_password = event.target.authPassword.value;

      Authorities.insert({
        name: submitted_name,
        rfc: submitted_RFC,
        email: submitted_email,
        password: submitted_password,
        phone: submitted_phone,
        createdAt: new Date()
      });
      event.target.authName.value = "";
      event.target.authRFC.value = "";
      event.target.authEmail.value = "";
      event.target.authPhone.value = "";
      event.target.authPassword.value = "";
      Materialize.toast('Authority Registered Successfully!', 2000);
    }
  });

  Template.registerIndividual.events({
    "submit":function(event){
      event.preventDefault();

      var submitted_name = event.target.individualName.value;
      var submitted_CURP = event.target.individualCURP.value;
      var submitted_email = event.target.individualEmail.value;
      var submitted_password = event.target.individualPassword.value;
      //var submitted_photo = ;

      Individuals.insert({
        name: submitted_name,
        curp: submitted_CURP,
        email: submitted_email,
        password: submitted_password,
        createdAt: new Date()
      });
      event.target.individualName.value = "";
      event.target.individualCURP.value = "";
      event.target.individualEmail.value = "";
      event.target.individualPassword.value = "";
      event.target.individualPhoto.value="";
      Materialize.toast('Individual Registered Successfully!', 2000);
    }
  });

  Template.createCertificate.events({
    "submit": function(event){
      event.preventDefault();

      var submitted_pub_auth = event.target.publicKeyHost.value;
      var submitted_pub_indiv = event.target.publicKeyGuest.value;
      var submitted_title = event.target.certTitleDropdown.value;
      var submitted_category = event.target.certCatDropdown.value;
      //var submitted_file = ;
      var submitted_from_date = event.target.fromDate.value;
      var submitted_to_date = event.target.toDate.value;
      var submitted_description = event.target.certDescription.value;
      var submitted_private_key = event.target.privateKeyHost.value;

      Certificates.insert({
        public_key_auth: submitted_pub_auth,
        public_key_individual: submitted_pub_indiv,
        title: submitted_title,
        category: submitted_category,
        signature: "bcf81fd1412a2136d2bef812798d2e6a394c6fe434988ed592e8f666fc5c5eaf4550f25ca71e5369dc5a987f4d8db9cbd6cd16c36268aec64b77ad2eed900efc",
        //file: ,
        from_date: submitted_from_date,
        expiry_date: submitted_to_date,
        date_created: new Date(),
        description: submitted_description,
        private_key_host: submitted_private_key
      });
      event.target.publicKeyGuest.value = "";
      event.target.certTitleDropdown.value = 0;
      event.target.certCatDropdown.value = 0;
      event.target.fromDate.value = "";
      event.target.toDate.value = "";
      event.target.certDescription.value = "";
      event.target.privateKeyHost.value="";
      event.target.certificatePhoto.value="";
      Materialize.toast('Certificate Created Successfully!', 2000);
    }
  })

  Template.createCertificate.onRendered(function() {
    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('.tooltipped').tooltip({delay: 50});
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
      event.preventDefault();
      var searchAuthorizer = event.target.searchAuthorizer.value;
      var searchIndividual = event.target.searchIndividual.value;
      var url = "/explore/";
      if (searchAuthorizer == "" || searchIndividual == "") {
        url += (searchAuthorizer == "") ? searchIndividual : searchAuthorizer;
      } else {
        url += searchAuthorizer + "/" + searchIndividual;
      };
      window.location.assign(url);
    }
  });

  Template.publicKeyInput.helpers({
    publicKeyHost: function(){
      return "1"
    },
  });

  Template.explore.helpers({

  });

  Template.explore.onRendered(function () {
    $('.button-collapse').sideNav();
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}
