var express = require('express');
var router = express.Router();
var ajaxRender = require('../controllers/partial-form-renderer');

const pug = require('pug');
const compiledFunction = pug.compileFile(__dirname + '/template.pug');

/* Try now */
router.get('/try', function(req, res, next) {
  console.log(req.body);
  res.render('index');
});

router.post('/try', function(req, res, next) {
  if(req.headers['content-type'] === 'application/json') {
    return ajaxRender(req, res, next);
  }

  console.log(req.body);
  if (req.body.hasOwnProperty('generate')) {
    var error = {};
    if (req.body.i1 === '') {
      error = Object.assign({}, error, {
        i1: 'required'
      });
    }
    if (req.body.i2 === '') {
      error = Object.assign({}, error, {
        i2: 'required'
      });
    }
    if (req.body.i3 === '') {
      error = Object.assign({}, error, {
        i3: 'required'
      });
    }

    if (req.body.i4 === '') {
      error = Object.assign({}, error, {
        i4: 'required'
      });
    }

    if (req.body.i5 && req.body.i5 === 'true') {
      if (req.body.i5a && req.body.i5a[0] === '') {
        error = Object.assign({}, error, {
          i5a_0: 'required'
        });
      }
      if (req.body.i5a && req.body.i5b[0] === '') {
        error = Object.assign({}, error, {
          i5b_0: 'required'
        });
      }
      if (req.body.i5a && req.body.i5a[1] === '') {
        error = Object.assign({}, error, {
          i5a_1: 'required'
        });
      }
      if (req.body.i5b && req.body.i5b[1] === '') {
        error = Object.assign({}, error, {
          i5b_1: 'required'
        });
      }
      if (req.body.i5a && req.body.i5a[2] === '') {
        error = Object.assign({}, error, {
          i5a_2: 'required'
        });
      }
      if (req.body.i5b && req.body.i5b[2] === '') {
        error = Object.assign({}, error, {
          i5b_2: 'required'
        });
      }
    }

    if (!req.body.hasOwnProperty('i6') || req.body.i6.length === 0) {
      error = Object.assign({}, error, {
        i6: 'Select atleast one call to action button'
      });
    }

    if (req.body.i6 && Array.isArray(req.body.i6) && req.body.i6.length > 2) {
      error = Object.assign({}, error, {
        i6: 'You can have max 2 call to action buttons'
      });
    }

    if (req.body.i7 && req.body.i7.split(',').indexOf('website') >= 0 &&
      req.body
      .i7a === '') {
      error = Object.assign({}, error, {
        i7a: 'required'
      });
    }

    if (req.body.i7 && req.body.i7.split(',').indexOf('website') >= 0 &&
      req.body
      .i7b === '') {
      error = Object.assign({}, error, {
        i7b: 'required'
      });
    }

    if (req.body.i7 && req.body.i7.split(',').indexOf('buy') >= 0 && req.body
      .i7c === '') {
      error = Object.assign({}, error, {
        i7c: 'required'
      });
    }

    if (req.body.i7 && req.body.i7.split(',').indexOf('buy') >= 0 && req.body
      .i7d === '') {
      error = Object.assign({}, error, {
        i7d: 'required'
      });
    }

    if (req.body.i7 && req.body.i7.split(',').indexOf('donate') >= 0 && req
      .body
      .i7e === '') {
      error = Object.assign({}, error, {
        i7e: 'required'
      });
    }

    if (req.body.i9 && req.body.i9 === 'true' && req.body.i9a === '') {
      error = Object.assign({}, error, {
        i9a: 'required'
      });
    }

    if (req.body.i10 && req.body.i10[0] === '') {
      error = Object.assign({}, error, {
        i10_0: 'required'
      });
    }
    if (req.body.i11 && req.body.i11[0] === '') {
      error = Object.assign({}, error, {
        i11_0: 'required'
      });
    }

    //*********************//
    if (error) {
      res.render('index', Object.assign({}, 
        error, req.body));
    } else { // generate
      res.render('index');
    }
    //*********************//
  } else if (req.body.hasOwnProperty('add_buzzwords')) {
    res.render('index', Object.assign({}, req.body, {
      i5: 'true'
    }));
  } else if (req.body.hasOwnProperty('add_subscribe')) {
    res.render('index', Object.assign({}, req.body, {
      i9: 'true'
    }));
  } else if (req.body.hasOwnProperty('add_call_to_action')) {
    if (req.body.i6 && Array.isArray(req.body.i6) && req.body.i6.length > 2) {
      res.render('index', Object.assign({}, {
          error: {
            i6: 'You can have max 2 call to action buttons'
          }
        },
        req.body));
    } else if (typeof req.body.i6 === 'undefined' || req.body.i6.length ===
      0) {
      res.render('index', Object.assign({}, {
          error: {
            i6: 'Select atleast one call to action button'
          }
        },
        req.body));
    } else {
      res.render('index', Object.assign({}, req.body, {
        i7: (Array.isArray(req.body.i6)) ? req.body.i6.join(',') : req
          .body.i6
      }));
    }
  }
});

/* Donation */
router.get('/donate/:id', function(req, res, next) {
  /* Decide redirect based on stored configuration */
  res.redirect(
    'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=foo@gmail.com&item_name=Support+IdeaDeck'
  );
});

/* Buy now */
router.get('/buy/:id', function(req, res, next) {
  /* Decide redirect based on stored configuration */
  res.redirect(
    'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=foo@gmail.com&item_name=Support+IdeaDeck&amount=5&currency_code=USD'
  );
});

/* POST subscribe form */
router.post('/subscribe/:id', function(req, res, next) {
  /* Decide redirect based on stored configuration */
  var id = req.params.id;
  res.redirect(307,
    'http://formspree.io/' + id
  );
});

router.get('/test', function(req, res, next) {
  /* Decide redirect based on stored configuration */
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  var a = compiledFunction({
    productName: 'IdeaDeck',
    productTitle: 'Lightweight web-app to generate idea deck with call to action buttons',
    productAim: 'Helping innovators, entrepreneurs, and non-profits clearly and concisely explain their idea and product.',
    productSlogan: 'There\'s beauty in Simplicity',
    facebook: 'https://facebook.com/', //optional
    twitter: 'https://twitter.com/abhas9', //optional
    github: 'https://github.com/abhas9', //optional
    aboutProduct: ['foo', 'foo'],
    buzzwords: ['Foo1', 'Foo2', 'Foo3', 'Foo4'], // exactly 4 - no more, no less
    actionsCount: 4,
    subscribe: {
      email: 'email@gmail.com'
    },
    link: {
      href: 'foo',
      title: 'foofoo',
      color: 'green'
    }, // color can be green or blue only
    donate: {
      id: 'id',
      color: 'blue'
    },
    buy: {
      id: 'id',
      title: 'Buy now @ 5$',
      color: 'blue'
    },
    forceImage: false,
    image: {
      title: 'There\'s beauty in Simplicity',
      src: 'light-bulb.png',
    },
    footer: 'Test test'
  });
  console.log(a);
  res.write(a);
  res.end();
});

module.exports = router;
