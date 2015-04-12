describe('angularjs chrome', function() {
  it('should block site', function() {
    browser.get('http://www.reddit.com');
		expect(browser.getLocationAbsUrl()).not.toBe('http://www.reddit.com');

  });
});
