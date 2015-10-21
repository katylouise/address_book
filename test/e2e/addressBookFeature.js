describe('Address Book', function() {
  it('shows all contacts', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Address Book');
    //element(by.className('btn')).click();

    // expect(element(by.binding('contact.first_name')).getText()).
    //     toEqual('Gareth');
  });
});