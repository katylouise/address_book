addressBookApp.controller('ContactsController', ['$resource', function($resource) {
  var self = this;

  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');
  var searchResource = $resource('https://fast-gorge.herokuapp.com/contacts/:id', { id: '@id'});

  self.contactsList = contactsResource.query();


  self.searchForContact = function() {
    //var contact = searchResource.get({ id: })
  }


}]);
