describe ('ContactsController', function() {
  beforeEach(module('AddressBook'));

  var ctrl;
  var httpBackend;

  beforeEach(inject(function($controller) {
    ctrl = $controller('ContactsController');
  }));

  var contacts = [
    {
      first_name: "Gareth",
      surname: "Billington",
      address: "Universal Marina",
      phone_number: "0121212",
      email: "gareth.billington@alliants.com",
      id: 6791,
      createdAt: "2015-04-29T20:10:26.000Z",
      updatedAt: "2015-09-29T08:55:21.000Z"
    },
    {
      first_name: "K",
      surname: "Z",
      address: "asfasd",
      phone_number: "123123",
      email: "a@wp.pl",
      id: 6891,
      createdAt: "2015-06-02T11:09:19.000Z",
      updatedAt: "2015-09-24T18:51:52.000Z"
    },
  ];

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend.whenGET("https://fast-gorge.herokuapp.com/contacts")
    .respond(
      [{ contacts: contacts }]
    );
  }));

  describe('displaying contacts', function() {
    it('displays contacts list', function() {
      httpBackend.flush();
      expect(ctrl.contactsList[0].contacts).toEqual(contacts);
    });

    it('can display a single contact', function() {
      ctrl.searchTerm = 'Gareth';
      ctrl.searchForContact();
      httpBackend.flush();
      expect(ctrl.contactsList[0].contacts[0]).toEqual(contacts[0]);
    });
  });

  describe('adding contacts', function() {
    var newContact = {
      first_name: "Rebecca",
      surname: "Appleyard",
      address: "London",
      phone_number: "12345678",
      email: "r@r.com"
    }

    beforeEach(inject(function($httpBackend) {
      httpBackend.whenPOST("https://fast-gorge.herokuapp.com/contacts", newContact)
      .respond(200, { response: newContact });
    }));

    it('can add a contact to the address book', function() {
      ctrl.addContact(newContact);
      httpBackend.flush();
      expect(ctrl.result).toEqual("Success!");
    });
  });

  describe('deleting contacts', function() {
    var formData = {
      first_name: "Gareth",
      surname: "Billington"
    }

    beforeEach(inject(function($httpBackend) {
      httpBackend.whenDELETE("https://fast-gorge.herokuapp.com/contacts/6791")
      .respond(200, { response: contacts[0] });
    }));

    it('can delete a contact from the address book', function() {
      httpBackend.flush();
      ctrl.searchTerm = "Gareth";
      ctrl.searchForContact();
      ctrl.deleteContact();
      expect(ctrl.result).toEqual("Deleted contact!");

    });
  });
});