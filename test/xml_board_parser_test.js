var XmlBoardParser = require('../src/lib/xml_board_parser'),
    assert = require('assert'),
    fixtures = require("./fixtures");


describe('XmlBoardParser', function() {
    describe('next', function() {
        it('should return the next word', function() {
            // get fixtures from a file or something
            var parser = new XmlBoardParser(fixtures.xml.one);

            var line = parser.next();

            assert('x' == line[0]);
            assert('3' == line[1]);
            assert('x' == line[2]);
            assert('15' == line[3]);
            assert('x' == line[4]);
            assert('23' == line[5]);
            assert('x' == line[6]);
            assert('4' == line[7]);
            assert('x' == line[8]);
            assert('11' == line[9]);
            assert('x' == line[10]);
            assert('19' == line[11]);
            assert('x' == line[12]);
            assert('3' == line[13]);
            assert('x' == line[14]);

        });

        it ("should handle invalid xml", function(){
            var parser = new XmlBoardParser('');
            assert(!parser.hasMore());
            var line = parser.next();
            assert(null == line);
        });

        //it('should allow iteration', function(){
        //    // get fixtures from a file or something
        //    var data = [['1','16','6','4','22','x','5','13','4','6','14','14','17','6','2']];
        //    var parser = new XmlBoardParser(data);
        //
        //    var word = parser.next();
        //    assert(word != null);
        //    while(word != null){
        //        word = parser.next();
        //    }
        //    assert(word == null);
        //});
    });
});

