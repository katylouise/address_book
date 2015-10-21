describe ('ContactsController', function() {
  beforeEach(module('AddressBook'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('ContactsController');
  }));

  it('initialises with an empty contacts list', function() {
    expect(ctrl.contactsList).toBeUndefined();
  });

  describe('displaying contacts', function() {
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

    var httpBackend;
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      httpBackend
      .when("GET", "https://fast-gorge.herokuapp.com/contacts")
      .respond(
        [{ contacts: contacts }]
      );
    }));

    it('displays contacts list', function() {
      ctrl.showAllContacts();
      httpBackend.flush();
      expect(ctrl.contactsList[0].contacts).toEqual(contacts);
    });

    it('can display a single contact', function() {
      ctrl.searchTerm = 'Gareth';
      ctrl.searchForContact();
      httpBackend.flush();
      expect(ctrl.contactsList[0].contacts).toEqual(contacts[0]);
    });
  });

});