describe('Address Book', function() {
  var contacts = element.all(by.repeater('contact in contactCtrl.contactsList'));
  var searchBox = element(by.model('contactCtrl.searchTerm'));
  var searchButton = element(by.className('search-button'));

  it('displays the title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Address Book');
  });

  it('shows all contacts', function() {
    expect(contacts.get(0).element(by.binding('contact.first_name')).getText()).toEqual('Gareth');
  });

  it('can display a single contact', function() {
    searchBox.sendKeys('John');
    searchButton.click();
    expect(element(by.binding('contactCtrl.contact.first_name')).getText()).toEqual('John');
  });
});

