QUnit.test( 'hello test', function(assert) {
  assert.ok(1 == '1', 'Passed!');
});

function wait(ms) {
  var promise = $.Deferred();
  window.setTimeout(function() {
    promise.resolve({});
  }, ms);
  return promise;
}

QUnit.asyncTest('Expand and collapse', function(assert) {
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

  wait(200).then(function() {
    assert.equal($grid.find('.og-expanded').length, 1);

    // A click does trigger a select event.
    $grid.find('li:nth-child(3) a').click()

    assert.equal(numDeselects, 0);
    assert.equal(numSelects, 1);
    assert.equal(numFills, 2);
    assert.equal($grid.find('.og-expanded').length, 1);

    // A second click closes the preview panel.
    $grid.find('li:nth-child(3) a').click()

    wait(200).then(function() {
      assert.equal(numDeselects, 1);
      assert.equal(numSelects, 1);
      assert.equal(numFills, 2);
      assert.equal($grid.find('.og-expanded').length, 0);

      QUnit.start();
    });
  });
});


// Regression test for https://github.com/danvk/expandable-image-grid/issues/6 
QUnit.asyncTest('Right from rightmost image', function(assert) {
  $(window).scrollTop(0);
  var $grid = $('.main');

  // Select the rightmost image.
  $grid.expandableGrid('select', '723097f-a');

  wait(200).then(function() {
    // Image's top should be within ~20px of the top of the viewport.
    var top = $grid.find('img').get(4).getBoundingClientRect().top;
    assert.ok(Math.abs(top) < 20, 'Image is not close enough to top! ' + top);

    // Now click the right arrow in the expanded panel.
    var $right = $grid.find('.og-next');
    assert.ok(1 == $right.length);
    $right.click();

    wait(200).then(function() {
      // New selected image's top should still be near the viewport top.
      var top = $grid.find('img').get(5).getBoundingClientRect().top;
      assert.ok(Math.abs(top) < 20, 'Image is not close enough to top! ' + top);

      QUnit.start();
    })
  });
});
