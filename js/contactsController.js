addressBookApp.controller('ContactsController', ['$resource', 'UpdateContact', function($resource, UpdateContact) {
  var self = this;
  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');
  var Contact = $resource('https://fast-gorge.herokuapp.com/contacts/:id', { id: '@id' });

  self.contact;
  self.contactID;
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
        self.contactID = self.contactsList[i].id;
        self.contact = Contact.get({ id: self.contactID });
        angular.element('.all-contacts').hide();
        angular.element('.single-contact').show();
      }
    }
  }

  self.showAddContacts = function() {
    angular.element('.add-contact-form').show();
  }

  self.addContact = function(formData) {
    var newContact = formData;
    contactsResource.save(newContact).$promise.then(function() {
      self.result = "Success!";
    }, function() {
      self.result = "Error!";
    });
    angular.element('.add-contact-form').hide();
  }

  self.updateContact = function(updateData) {
    var updatedContact = updateData;
    UpdateContact.update({ id: self.contactID }, updatedContact).$promise.then(function() {
      self.result = "Updated!";
    }, function() {
      self.result = "Error!"
    });
  }

  self.showUpdateContact = function() {
    angular.element('.update-contact-form').show();
  }

  self.deleteContact = function() {
    Contact.remove({ id: self.contactID }).$promise.then(function() {
      self.result = "Deleted contact!";
    }, function() {
      self.result = "Error!";
    });
  }
}]);
