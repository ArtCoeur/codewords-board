var board = require('../src/lib/board'),
    assert = require('assert');

describe('board', function() {
    describe('create', function() {
        it('should push a new-board fact onto the queue', function() {
            // get fixtures from a file or something
            var context = {};
            var data = '1,16,6,4,22,x,5,13,4,6,14,14,17,6,2';
            var type = 'text/csv';
            var cb = function(err, result){}
            board.create(context, data, type, cb);
        });
    });
});

