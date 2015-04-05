var JsonBoardParser = require('./json_board_parser'),
    XmlBoardParser = require('./xml_board_parser'),
    logger = require('./logger'),
    _ = require('underscore');

/**
 * Extract words from board data & cells
 * Publish facts on the board
 *
 * @param pub socket to write facts back to
 * @param fact A fact object
 */
exports.handleFact= function(pub, fact) {
    if (fact.name == 'board.new'){
        if (fact.data.type == 'application/vnd.artcoeur.com-v1+json') {
            handleNewJsonBoard(pub, fact);
        } else if (fact.data.type == 'application/vnd.bestforpuzzles.com-v1+xml'){
            handleNewXmlBoard(pub, fact);
        }
    }
};

/**
* @param pub socket to write facts back to
* @param fact A fact object
*/
function handleNewJsonBoard(pub, fact) {

    // parse fact.data.body using fact.data.type
    // currently this assumes it's json
    var parser = new JsonBoardParser(fact.data.body.board);

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

function handleNewXmlBoard(pub, fact) {
    var parser = new XmlBoardParser(fact.data.body.board);
}