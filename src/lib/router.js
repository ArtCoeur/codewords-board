var BoardParser = require('./board_parser'),
    logger = require('./logger'),
    _ = require('underscore');

/**
 * @param pub socket to write facts back to
 * @param fact fact object
 */
exports.handleFact= function(pub, fact) {
    if (fact.name == 'board.new'){
        // extract words from board data & cells
        handleNewBoard(pub, fact);
    }
};

/**
* @param pub socket to write facts back to
* @param fact fact object
*/
function handleNewBoard(pub, fact) {

    // parse fact.data.body using fact.data.type
    // currently this assumes it's json
    var parser = new BoardParser(fact.data.body.board);

    while(parser.hasMore()){
        var word = parser.next();
        logger.info(word);
        pub.write(JSON.stringify({
            board: fact.board,
            name: 'word.new',
            data: {
                body: word,
                type: 'application/json'
            }
        }), 'utf8');
    }

    // publish facts about the solved cells
    // solved is an object in this format : {"3": "e", "16:"j"}
    var solved = fact.data.body.solved;

    _.each(_.keys(solved), function(element){
        var cell_fact = {
            board: fact.board,
            name: 'cell.updated',
            data: {
                number: element,
                letter: solved[element]
            }
        };
        pub.write(JSON.stringify(cell_fact));
    });
}