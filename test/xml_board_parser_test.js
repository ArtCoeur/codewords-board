var XmlBoardParser = require('../src/lib/xml_board_parser'),
    assert = require('assert'),
    fixtures = require("./fixtures");


describe('XmlBoardParser', function() {
    describe('next', function() {
        it('should return the next word', function() {
            // get fixtures from a file or something
            var parser = new XmlBoardParser(fixtures.xml.one);

            var word = parser.next();

            assert(word.cells.length == 8);
            assert(word.location.x == 0);
            assert(word.location.y == 1);
            assert(word.orientation == 'h');

            assert('6' == word.cells[0]);
            assert('1' == word.cells[1]);
            assert('26' == word.cells[2]);
            assert('9' == word.cells[3]);
            assert('1' == word.cells[4]);
            assert('24' == word.cells[5]);
            assert('19' == word.cells[6]);
            assert('1' == word.cells[7]);

            word = parser.next();

            assert(word.cells.length == 6);
            assert(word.location.x == 9);
            assert(word.location.y == 1);
            assert(word.orientation == 'h');

            assert('12' == word.cells[0]);
            assert('24' == word.cells[1]);
            assert('17' == word.cells[2]);
            assert('18' == word.cells[3]);
            assert('12' == word.cells[4]);
            assert('11' == word.cells[5]);
        });

        it('should only return words with more than 2 characters', function() {
            var data = [
                ['1','16','6', '4','22','x','5','13','4','6','14','x','17','6','2'],
                ['8','x','19', 'x','x','x','x','x','23','x','10','x','2','x','2'],
                ['2','x','5',  'x','x','18','x','x','5','x','16','x','25','x','21'],
                ['14','x','15','x','x','11','x','x','5','x','16','x','25','x','21'],
                ['x','x','15','x','x','14','x','x','5','x','16','x','25','x','21']
            ];
            var parser = new XmlBoardParser(data);
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
            var data = [['1','16','6','4','22','x','5','13','4','6','14','14','17','6','2']];
            var parser = new XmlBoardParser(data);

            var word = parser.next();
            assert(word != null);
            while(word != null){
                word = parser.next();
            }
            assert(word == null);
        });
    });
});

