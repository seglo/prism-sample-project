describe('prism sample project', function() {
  it('should populate name column of grid', function() {
    browser.get('http://localhost:9001/#/');

    var names = element.all(by.css('#usersGrid .col0 span'));

    expect(names.count()).toBe(3);
    
    // getText() returns a promise.  jasmine automatically resolves it in matchers
    expect(names.get(0).getText()).toEqual('john');
    expect(names.get(1).getText()).toEqual('genevieve');
    expect(names.get(2).getText()).toEqual('zach');
  });
});