var router = require('../src/lib/router'),
    assert = require('assert');

describe('router', function() {
    describe('handleFact', function() {
        it('should handle board.new facts', function() {
            // get fixtures from a file or something
            var fact = {
                name: 'board.new',
                board: 'abc',
                data : {
                    body: ['1,16,6,4,22,x,5,13,4,6,14,14,17,6,2'],
                    type: 'text/csv'
                }
            };

            // mock the pub socket
           // router.handleFact(pub, fact);
        });
    });
});

