addressBookApp.controller('ContactsController', ['$resource', '$timeout', 'UpdateContact', function($resource, $timeout, UpdateContact) {
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
      if (self.contactsList[i].first_name.toLowerCase() === self.searchTerm.toLowerCase() || self.contactsList[i].surname.toLowerCase() === self.searchTerm.toLowerCase()) {
        position = i;
        contactID = self.contactsList[i].id;
        self.contact = Contact.get({ id: contactID });
        self.showSingleContact = true;
      }
    }
    if (!self.contact) {
      showFlashMessage("No contact found!");
    }
  }

  var showFlashMessage = function(message) {
    self.showMessage = true;
    self.result = message;
    $timeout(function(){
      self.showMessage = false;
    }, 3000);
  }

  self.showAddContacts = function() {
    self.showAddForm = true;
  }

  self.addContact = function(contact) {
    if (self.addContact.$valid) {
      var newContact = contact;
      contactsResource.save(newContact).$promise.then(function() {
        showFlashMessage("Contact added successfully!");
        self.contactsList.push(newContact);
        self.showAddForm = false;
        self.submitted = false;
      }, function() {
        showFlashMessage("There was an error. Please try again.");
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
        showFlashMessage("Contact updated successfully!");
        self.contactsList[position] = updatedContact;
        self.showUpdateForm = false;
        self.submitted = false;
      }, function() {
        showFlashMessage("There was an error. Please try again.");
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
      showFlashMessage("Contact deleted!");
      self.contactsList.splice(position, 1);
      self.showSingleContact = false;
    }, function() {
      showFlashMessage("There was an error. Please try again.")
    });
  }
}]);
