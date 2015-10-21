addressBookApp.controller('ContactsController', ['$resource', function($resource) {
  var self = this;

  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');

  self.showAllContacts = function() {
    self.contactsList = contactsResource.query();
  }
}]);
