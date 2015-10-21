describe('Address Book', function() {
  it('displays the title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Address Book');
  });

  it('shows all contacts', function() {
    var contacts = element.all(by.repeater('contact in contactCtrl.contactsList'));
    expect(contacts.get(0).element(by.binding('contact.first_name')).getText()).toEqual('Gareth');
  });
});

