var JsonBoardParser = require('../lib/json_board_parser'),
    assert = require('assert'),
    fixtures = require("./fixtures");

describe('JsonBoardParser', function() {
    describe('next', function() {
        it('should return the next word', function() {
            // get fixtures from a file or something
            var data = fixtures.json.one;
            var parser = new JsonBoardParser(data);

            var word = parser.next();

            assert(word.cells.length == 5);
            assert(word.location.x == 0);
            assert(word.location.y == 0);
            assert(word.orientation == 'h');

            assert('1' == word.cells[0]);
            assert('16' == word.cells[1]);
            assert('6' == word.cells[2]);
            assert('4' == word.cells[3]);
            assert('22' == word.cells[4]);

            word = parser.next();

            assert(word.cells.length == 9);
            assert(word.location.x == 6);
            assert(word.location.y == 0);
            assert(word.orientation == 'h');

            assert('5' == word.cells[0]);
            assert('13' == word.cells[1]);
            assert('4' == word.cells[2]);
            assert('6' == word.cells[3]);
            assert('14' == word.cells[4]);
            assert('14' == word.cells[5]);
            assert('17' == word.cells[6]);
            assert('6' == word.cells[7]);
            assert('2' == word.cells[8]);
        });

        it('should only return words with more than 2 characters', function() {
            var data = fixtures.json.two;

            var parser = new JsonBoardParser(data);
            // three words on top line
            parser.next();
            parser.next();
            parser.next();

            // next word should be vertical, words must be longer than 2 chars
            var word = parser.next();
            // console.log(word);

            assert(word.cells.length == 4);
            assert(word.location.x == 0);
            assert(word.location.y == 0);
            assert(word.orientation == 'v');

            word = parser.next();
            //console.log(word);

            assert(word.cells.length == 5);
            assert(word.location.x == 2);
            assert(word.location.y == 0);
            assert(word.orientation == 'v');

            word = parser.next();
            //console.log(word);

            assert(word.cells.length == 3);
            assert(word.location.x == 5);
            assert(word.location.y == 2);
            assert(word.orientation == 'v');
        });

        it('should allow iteration', function(){
            // get fixtures from a file or something
            var data = fixtures.json.one;
            var parser = new JsonBoardParser(data);

            var word = parser.next();
            assert(word != null);
            while(word != null){
                word = parser.next();
            }
            assert(word == null);
        });
    });
});

