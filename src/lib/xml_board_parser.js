var _ = require('underscore');

var min_length = 3;

/**
 * from an xml document
 */

function XmlBoardParser(data){

    this.words = [];
    this.index = 0;
    // parse data here
}

XmlBoardParser.prototype.addWord = function(cells, x, y, orientation){

    if (cells.length < min_length){
        return;
    }

    this.words.push(
        {
            cells: cells,
            location: {x: x, y: y},
            orientation: orientation
        }
    );
};

/**
 * Return the next word object
 */
XmlBoardParser.prototype.next = function() {
    if (this.index < this.words.length){
        return this.words[this.index++];
    }
};

XmlBoardParser.prototype.hasMore = function() {
    return this.index < this.words.length;
}

module.exports = XmlBoardParser;