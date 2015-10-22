describe('Address Book', function() {
  var contacts = element.all(by.repeater('contact in contactCtrl.contactsList'));
  var searchBox = element(by.model('contactCtrl.searchTerm'));
  var searchButton = element(by.className('search-button'));
  var showAllButton = element(by.className('all-contacts-button'));
  var addButton = element(by.className('add-contact-button'));
  var addContactForm = element(by.className('add-contact-form'));

  it('displays the title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Address Book');
  });

  it('displays all contacts on page load', function() {
    expect(contacts.get(0).element(by.binding('contact.first_name')).getText()).toEqual('Gareth');
  });

  it('can display a single contact', function() {
    searchBox.sendKeys('John');
    searchButton.click();
    expect(element(by.binding('contactCtrl.contact.first_name')).getText()).toEqual('John');
  });

  it('displays all contacts after a search', function() {
    searchBox.sendKeys('John');
    searchButton.click();
    showAllButton.click();
    expect(contacts.get(0).element(by.binding('contact.first_name')).getText()).toEqual('Gareth');
  });

  it('displays a form to add a new contact', function() {
    addButton.click();
    expect(addContactForm.isDisplayed()).toBeTruthy();
  });
});

