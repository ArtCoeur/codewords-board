var BoardParser = require('../src/lib/board_parser'),
    assert = require('assert');

describe('BoardParser', function() {
    describe('next', function() {
        it('should return the next word', function() {
            // get fixtures from a file or something
            var data = [['1','16','6','4','22','x','5','13','4','6','14','14','17','6','2']];
            var parser = new BoardParser(data);

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

            var word = parser.next();

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
    });
});

