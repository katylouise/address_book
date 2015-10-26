describe('Address Book', function() {
  var contacts = element.all(by.repeater('contact in contactCtrl.contactsList'));
  var searchBox = element(by.model('contactCtrl.searchTerm'));
  var searchButton = element(by.className('search-button'));
  var addButton = element(by.className('add-contact-button'));
  var addContactForm = element(by.className('add-contact-form'));
  var submitButton = element(by.buttonText('Submit'));
  var messagesBox = element(by.className('.messages'));
  var errorBox = element(by.tagName('span'));
  var firstNameInput = element(by.model('contact.first_name'));
  var surnameInput = element(by.model('contact.surname'));

  it('displays the title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Address Book');
  });

  it('displays all contacts alphabetically on page load', function() {
    expect(contacts.get(0).element(by.binding('contact.first_name')).getText()).toEqual('Gareth');
    expect(contacts.get(1).element(by.binding('contact.first_name')).getText()).toEqual('Dan');
  });

  it('can display a single contact', function() {
    searchBox.sendKeys('Dan');
    searchButton.click();
    searchBox.clear();
    expect(element(by.binding('contactCtrl.contact.first_name')).getText()).toEqual('Dan');
  });

  it('displays a form to add a new contact', function() {
    addButton.click();
    expect(addContactForm.isDisplayed()).toBeTruthy();
  });

  it('requires a surname for the add contact form to be valid', function() {
    addButton.click();
    firstNameInput.sendKeys('bex');
    submitButton.click();
    expect(element.all(by.tagName('span')).get(1).getText()).toEqual('Surname is required.');
    expect(addContactForm.isDisplayed()).toBeTruthy();
  });

  it('requires a firstname for the add contact form to be valid', function() {
    surnameInput.sendKeys('Surname');
    firstNameInput.clear();
    submitButton.click();
    expect(element.all(by.tagName('span')).get(0).getText()).toEqual('First name is required.');
    expect(addContactForm.isDisplayed()).toBeTruthy();
  });

  xit('adds a contact to the list', function() {
    firstNameInput.sendKeys('bex');
    element.all(by.buttonText('Submit')).get(0).click();
    //submitButton.click();
    expect(contacts.get(2).element(by.binding('contact.first_name')).getText()).toEqual('bex');
  });

});

