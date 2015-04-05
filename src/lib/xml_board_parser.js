var _ = require('underscore'),
    xpath = require('xpath'),
    DOMParser = require('xmldom').DOMParser;

var min_length = 3;

/**
 * Parse board data from an xml document
 */
function XmlBoardParser(input_doc){

    //this.words = [];
    this.cells = [];

    this.index = 0;
    this.solved = {};

    var document = new DOMParser({
        locator: {},
        errorHandler: {
            error: function(){},
            fatalError: function(){}
        }
    }).parseFromString(input_doc);


    if (document) {
        var that = this;
        _.each(document.getElementsByTagName('cell'), function (node) {
            that.addCell(node);
        });
    }

    // next create the words data from the cells
    //console.log(this.cells);
    //console.log(this.solved);

}

XmlBoardParser.prototype.addCell = function(node) {

    var x = node.getAttribute('x') - 1;
    var y = node.getAttribute('y') - 1;

    // fill out array here
    if (!_.isArray(this.cells[y])){
        this.cells[y] = [];
    }
    if (!_.isArray(this.cells[y][x])){
        this.cells[y][x] = [];
    }

    this.cells[y][x] = node.getAttribute('number') ? node.getAttribute('number') : 'x';
    if ('true' == node.getAttribute('hint')){
        this.solved[node.getAttribute('number')] = node.getAttribute('solution');
    }
};

//XmlBoardParser.prototype.addWord = function(cells, x, y, orientation){
//
//    if (cells.length < min_length){
//        return;
//    }
//
//    this.words.push(
//        {
//            cells: cells,
//            location: {x: x, y: y},
//            orientation: orientation
//        }
//    );
//};

/**
 * Return the next word object
 */
XmlBoardParser.prototype.next = function() {
    if (this.hasMore()){
        return this.cells[this.index++];
    }
};

XmlBoardParser.prototype.hasMore = function() {
    return this.index < this.cells.length;
}

module.exports = XmlBoardParser;