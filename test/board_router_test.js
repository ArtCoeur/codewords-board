var router = require('../src/lib/router'),
    assert = require('assert'),
    fixtures = require("./fixtures");

describe('router', function() {
    describe('newFact', function() {
        it('should handle board.new json facts', function() {

            // get fixtures from a file or something
            var fact = {
                name: 'board.new',
                board: 'abc',
                data : {
                    body: {
                        board: [['1,16,6,4,22,x,5,13,4,6,14,14,17,6,2']],
                        solved: {}
                    },
                    type: 'application/vnd.artcoeur.com-v1+json'
                }
            };

            // mock the pub socket
            var pub = {
                write: function(json, format){
                    var fact = JSON.parse(json);
                    assert('utf8' == format);
                    assert(fact.board == 'abc');
                    // they will all be word.new facts as there is not solved cells in the data
                    assert(fact.name == 'word.new');
                }
            };

            router.newFact(pub, fact);
        });

        it('should publish cell.updated facts', function() {

            // get fixtures from a file or something
            var fact = {
                name: 'board.new',
                board: 'abc',
                data : {
                    body: {
                        board: [[]],
                        solved: {'12' : 'a'}
                    },
                    type: 'application/vnd.artcoeur.com-v1+json'
                }
            };

            // mock the pub socket
            var pub = {
                write: function(json, format) {
                    var fact = JSON.parse(json);
                    assert('utf8' == format);
                    assert(fact.board == 'abc');
                    // they will all be word.new facts as there is not solved cells in the data
                    assert(fact.name == 'cell.updated');
                    assert(fact.data.body.number == '12');
                    assert(fact.data.body.letter == 'a');
                }
            };

            router.newFact(pub, fact);
        });

        it ('should handle board.new xml facts', function() {
            var fact = {
                name: 'board.new',
                board: 'abc',
                data : {
                    body: fixtures.xml.one,
                    type: 'application/vnd.bestforpuzzles.com-v1+xml'
                }
            };

            // mock the pub socket
            var pub = {
                write: function(json, format){
                    assert('utf8' == format);
                    var fact = JSON.parse(json);
                    assert(fact.board == 'abc');
                    assert(fact.name == 'word.new' || fact.name == 'cell.updated');
                }
            };

            router.newFact(pub, fact);
        });
    });
});

