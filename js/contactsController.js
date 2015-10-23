addressBookApp.controller('ContactsController', ['$resource', 'UpdateContact', function($resource, UpdateContact) {
  var self = this;
  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');
  var searchResource = $resource('https://fast-gorge.herokuapp.com/contacts/:id', { id: '@id' });

  self.formData = {};
  self.contactData = {};
  self.contactsList = contactsResource.query();

  self.showAllContacts = function() {
    angular.element('.all-contacts').show();
    angular.element('.single-contact').hide();
  }

  self.searchForContact = function() {
    for (var i = 0; i < self.contactsList.length; i++) {
      if (self.contactsList[i].first_name === self.searchTerm || self.contactsList[i].surname === self.searchTerm) {
        self.contact = searchResource.get({ id: self.contactsList[i].id });
        angular.element('.all-contacts').hide();
        angular.element('.single-contact').show();
      }
    }
  }

  self.showAddContacts = function() {
    angular.element('.add-contact-form').show();
  }

  self.addContact = function(formData) {
    var user = formData;
    contactsResource.save(user).$promise.then(function() {
      self.result = "Success!";
    }, function() {
      self.result = "Error!";
    });
    //angular.element('.add-contact-form').hide();
  }

  self.updateContact = function(updateData) {

  }

  self.deleteContact = function(contactData) {
    for (var i = 0; i < self.contactsList.length; i++) {
      if (self.contactsList[i].first_name === contactData.first_name && self.contactsList[i].surname === contactData.surname) {
        searchResource.remove({ id: self.contactsList[i].id }).$promise.then(function() {
          self.result = "Deleted contact!";
        }, function() {
          self.result = "Error!"
        });
      }
    }
  }
}]);
