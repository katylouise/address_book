describe ('ContactsController', function() {
  beforeEach(module('AddressBook'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('ContactsController');
  }));

  it('initialises with an empty contacts list', function() {
    expect(ctrl.contactsList).toBeUndefined();
  });

});