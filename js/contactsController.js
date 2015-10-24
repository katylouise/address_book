addressBookApp.controller('ContactsController', ['$resource', 'UpdateContact', function($resource, UpdateContact) {
  var self = this;
  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');
  var Contact = $resource('https://fast-gorge.herokuapp.com/contacts/:id', { id: '@id' });
  var position;
  var contactID;
  self.submitted = false;
  self.contact;
  self.contactsList = contactsResource.query();

  self.searchForContact = function() {
    for (var i = 0; i < self.contactsList.length; i++) {
      if (self.contactsList[i].first_name === self.searchTerm || self.contactsList[i].surname === self.searchTerm) {
        position = i;
        contactID = self.contactsList[i].id;
        self.contact = Contact.get({ id: contactID });
        self.showSingleContact = true;
      }
    }
  }

  self.showAddContacts = function() {
    self.showAddForm = true;
  }

  self.addContact = function(contact) {
    if (self.addContact.$valid) {
      var newContact = contact;
      contactsResource.save(newContact).$promise.then(function() {
        self.result = "Success!";
        self.contactsList.push(newContact);
        self.showAddForm = false;
        self.submitted = false;
      }, function() {
        self.result = "Error!";
      });
    }
    else {
      self.submitted = true;
    }
  }

  self.updateContact = function(updateData) {
    if (self.updateContact.$valid) {
      var updatedContact = updateData;
      UpdateContact.update({ id: self.contactID }, updatedContact).$promise.then(function() {
        self.result = "Updated!";
        self.contactsList[position] = updatedContact;
        self.showUpdateForm = false;
        self.submitted = false;
      }, function() {
        self.result = "Error!"
      });
    }
    else {
      self.submitted = true;
    }
  }

  self.showUpdateContact = function() {
    self.showSingleContact = false;
    self.showUpdateForm = true;
  }

  self.deleteContact = function() {
    Contact.remove({ id: contactID }).$promise.then(function() {
      self.result = "Contact deleted!";
      self.contactsList.splice(position, 1);
      self.showSingleContact = false;
    }, function() {
      self.result = "Error!";
    });
  }
}]);
