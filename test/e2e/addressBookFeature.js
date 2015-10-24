describe('Address Book', function() {
  var contacts = element.all(by.repeater('contact in contactCtrl.contactsList'));
  var searchBox = element(by.model('contactCtrl.searchTerm'));
  var searchButton = element(by.className('search-button'));
  var addButton = element(by.className('add-contact-button'));
  var addContactForm = element(by.className('add-contact-form'));
  var submitButton = element(by.buttonText('Submit'));
  var messagesBox = element(by.className('.messages'));
  var errorBox = element(by.className('.error'));
  var firstNameInput = element(by.model('contact.first_name'));

  it('displays the title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Address Book');
  });

  it('displays all contacts alphabetically on page load', function() {
    expect(contacts.get(0).element(by.binding('contact.first_name')).getText()).toEqual('Gareth');
    expect(contacts.get(1).element(by.binding('contact.first_name')).getText()).toEqual('rebecca');
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

  it('requires a firstname and surname for the add contact form to be valid', function() {
    //addButton.click();
    firstNameInput.sendKeys('bex');
    submitButton.click();
    expect(errorBox.getText()).toEqual('Surname is required.');
  });

  xit('hides the form when the submit button is clicked', function() {
    addButton.click();
    submitButton.click()
    expect(addContactForm.isDisplayed()).toBeFalsy();
  });

});

