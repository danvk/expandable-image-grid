QUnit.test( 'hello test', function(assert) {
  assert.ok(1 == '1', 'Passed!');
});

QUnit.test('Top images are initially loaded', function(assert) {
  // At 640x480, the first nine images are visible.
  // The last six are not.
  var $grid = $('.main .og-grid');

  var $imgs = $grid.find('img');
  assert.equal($imgs.length, 15);

  var hasSrc = function(img) {
    return $(img).attr('src') != null;
  };

  assert.equal(hasSrc($imgs.get(0)), true);
  assert.equal(hasSrc($imgs.get(1)), true);
  assert.equal(hasSrc($imgs.get(2)), true);
  assert.equal(hasSrc($imgs.get(3)), true);
  assert.equal(hasSrc($imgs.get(4)), true);
  assert.equal(hasSrc($imgs.get(5)), true);
  assert.equal(hasSrc($imgs.get(6)), true);
  assert.equal(hasSrc($imgs.get(7)), true);
  assert.equal(hasSrc($imgs.get(8)), true);

  assert.equal(hasSrc($imgs.get( 9)), false);
  assert.equal(hasSrc($imgs.get(10)), false);
  assert.equal(hasSrc($imgs.get(11)), false);
  assert.equal(hasSrc($imgs.get(12)), false);
  assert.equal(hasSrc($imgs.get(13)), false);
  assert.equal(hasSrc($imgs.get(14)), false);
});

QUnit.test('All images are loaded after scrolling to bottom', function(assert) {
  var $main = $('.main');
  var $grid = $('.main .og-grid');

  var $imgs = $grid.find('img');
  assert.equal($imgs.length, 15);

  var hasSrc = function(img) {
    return $(img).attr('src') != null;
  };

  assert.equal(hasSrc($imgs.get( 9)), false);
  assert.equal(hasSrc($imgs.get(10)), false);
  assert.equal(hasSrc($imgs.get(11)), false);
  assert.equal(hasSrc($imgs.get(12)), false);
  assert.equal(hasSrc($imgs.get(13)), false);
  assert.equal(hasSrc($imgs.get(14)), false);

  $main.scrollTop($main.get(0).scrollHeight);  // scroll to bottom
  $main.scroll();  // 'scroll' event usually fires async; this forces sync.

  assert.equal(hasSrc($imgs.get( 9)), true);
  assert.equal(hasSrc($imgs.get(10)), true);
  assert.equal(hasSrc($imgs.get(11)), true);
  assert.equal(hasSrc($imgs.get(12)), true);
  assert.equal(hasSrc($imgs.get(13)), true);
  assert.equal(hasSrc($imgs.get(14)), true);

  $main.scrollTop(0);  // reset for subsequent tests
});
