addressBookApp.controller('ContactsController', ['$resource', 'UpdateContact', '$scope', function($resource, UpdateContact, $scope) {
  var self = this;
  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');
  var Contact = $resource('https://fast-gorge.herokuapp.com/contacts/:id', { id: '@id' });

  self.contact;
  self.contactID;
  self.contactsList = contactsResource.query();
  var position;

  self.showAllContacts = function() {
    angular.element('.all-contacts').show();
    angular.element('.single-contact').hide();
  }

  self.searchForContact = function() {
    for (var i = 0; i < self.contactsList.length; i++) {
      if (self.contactsList[i].first_name === self.searchTerm || self.contactsList[i].surname === self.searchTerm) {
        position = i;
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

  self.addContact = function(contact) {
    var newContact = contact;
    contactsResource.save(newContact).$promise.then(function() {
      self.result = "Success!";
      self.contactsList.push(newContact);
    }, function() {
      self.result = "Error!";
    });
    angular.element('.add-contact-form').hide();
  }

  self.updateContact = function(updateData) {
    var updatedContact = updateData;
    UpdateContact.update({ id: self.contactID }, updatedContact).$promise.then(function() {
      self.result = "Updated!";
      self.contactsList[position] = updatedContact;
      angular.element('.all-contacts').show();
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
