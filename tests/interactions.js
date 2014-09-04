QUnit.test( 'hello test', function(assert) {
  assert.ok(1 == '1', 'Passed!');
});

// TODO: Look up QUnit.asyncTest; this needs to be one.
QUnit.test('Expand and collapse', function(assert) {
  var $grid = $('.main');
  var numSelects = 0, numDeselects = 0, numFills = 0;
  $grid.on('og-select', function(e, photo_id) {
    numSelects += 1;
  }).on('og-deselect', function() {
    numDeselects += 1;
  }).on('og-fill', function(e, $div) {
    numFills += 1;
  });

  $grid.expandableGrid('select', '1508659');
  assert.equal(numDeselects, 0);
  assert.equal(numSelects, 0);  // not in response to a user event.
  assert.equal(numFills, 1);
  assert.equal($grid.find('.og-expanded').length, 1);

  // A click does trigger a select event.
  $grid.find('li:nth-child(3) a').click()

  assert.equal(numDeselects, 0);
  assert.equal(numSelects, 1);
  assert.equal(numFills, 2);
  assert.equal($grid.find('.og-expanded').length, 1);

  // A second click closes the preview panel.
  $grid.find('li:nth-child(3) a').click()
  assert.equal(numDeselects, 1);
  assert.equal(numSelects, 1);
  assert.equal(numFills, 2);
  assert.equal($grid.find('.og-expanded').length, 0);
});

// TODO: right-arrow through all the images.
