addressBookApp.controller('ContactsController', ['$resource', function($resource) {
  var self = this;

  var contactsResource = $resource('https://fast-gorge.herokuapp.com/contacts');
  var searchResource = $resource('https://fast-gorge.herokuapp.com/contacts/:id', { id: '@id' });

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
}]);
