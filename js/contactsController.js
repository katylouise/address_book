addressBookApp.controller('ContactsController', ['$resource', 'UpdateContact', function($resource, UpdateContact) {
  var self = this;
  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');
  var Contact = $resource('https://fast-gorge.herokuapp.com/contacts/:id', { id: '@id' });
  var position;
  self.contact;
  self.contactID;
  self.contactsList = contactsResource.query();

  self.searchForContact = function() {
    for (var i = 0; i < self.contactsList.length; i++) {
      if (self.contactsList[i].first_name === self.searchTerm || self.contactsList[i].surname === self.searchTerm) {
        position = i;
        self.contactID = self.contactsList[i].id;
        self.contact = Contact.get({ id: self.contactID });
        self.showSingleContact = true;
      }
    }
  }

  self.showAddContacts = function() {
    self.showAddForm = true;
  }

  self.addContact = function(contact) {
    var newContact = contact;
    contactsResource.save(newContact).$promise.then(function() {
      self.result = "Success!";
      self.contactsList.push(newContact);
      self.showAddForm = false;
    }, function() {
      self.result = "Error!";
    });
  }

  self.updateContact = function(updateData) {
    var updatedContact = updateData;
    UpdateContact.update({ id: self.contactID }, updatedContact).$promise.then(function() {
      self.result = "Updated!";
      self.contactsList[position] = updatedContact;
      self.showUpdateForm = false;
    }, function() {
      self.result = "Error!"
    });
  }

  self.showUpdateContact = function() {
    self.showSingleContact = false;
    self.showUpdateForm = true;
  }

  self.deleteContact = function() {
    Contact.remove({ id: self.contactID }).$promise.then(function() {
      self.result = "Contact deleted!";
      self.contactsList.splice(position, 1);
      self.showSingleContact = false;
    }, function() {
      self.result = "Error!";
    });
  }
}]);
