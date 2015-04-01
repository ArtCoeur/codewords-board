var _ = require('underscore');

var min_length = 3, stop_char = 'x';

/**
 * from an array of array of rows of a codewords board
 * generate an array of word objects
 * {
 *  cells: ["3","10","24","4","6"],
 * loc: {x:0,y:0}
 * orientation: "horizontal"
 * }
 */

function BoardParser(data){

    this.words = [];
    this.index = 0;

    _.each(data, function(row, index, list) {
        //console.log(row);
        // iterate over each cell in the row
        var word = [], y = index, orientation = 'h', x = 0;

        _.each(row, function(cell, index, list){
            //console.log(cell);
            if (stop_char== cell){
                //end of word
                this.addWord(word, x, y, orientation);
                word = [];
                x = index + 1;
            } else {
                word.push(cell);
            }

        }, this);

        // end of row, add the last word
        if (word.length){
            this.addWord(word, x, y, orientation);
        }

    }, this);

    var cell = 0;
    orientation = 'v';

    // now extract vertical words
    for (var i = 0; i < data[0].length; i++){

        word = [], x = i, y = 0;

        for (var j = 0; j < data.length; j++){

            cell = data[j][i];
            //console.log(cell);
            if (stop_char == cell){
                //end of word
                this.addWord(word, x, y, orientation);
                word = [];
                y += 1;
            } else {
                word.push(cell);
            }
        }
        if (word.length){
            this.addWord(word, x, y, orientation);
        }
    }
}

BoardParser.prototype.addWord = function(cells, x, y, orientation){
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
BoardParser.prototype.next = function() {
    if (this.index < this.words.length){
        return this.words[this.index++];
    }
};

module.exports = BoardParser;