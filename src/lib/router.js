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
        publishNewWord(pub, fact.board, parser.next());
    }

    // publish facts about the solved cells
    // solved is an object in this format : {"3": "e", "16:"j"}
    _.each(_.keys(fact.data.body.solved), function(element){
        publishCellUpdated(pub, fact.board, element, solved[element]);
    });
}

function handleNewXmlBoard(pub, fact) {
    var xml_parser = new XmlBoardParser(fact.data.body.board);
    var lines = [];
    while(parser.hasMore()){
        lines.push(parser.next());
    }

    // next feed lines into a json parser to generate words
    var json_parser = new JsonBoardParser(lines);
    while(json_parser.hasMore()){
        publishNewWord(pub, fact.board, parser.next());
    }

    _.each(_.keys(xml_parser.solved), function(element){
        publishCellUpdated(pub, fact.board, element, solved[element]);
    });
}


function publishNewWord(pub, board, word) {
    pub.write(JSON.stringify({
        board: board,
        name: 'word.new',
        data: {
            body: word,
            type: 'application/json'
        }
    }), 'utf8');
}

function publishCellUpdated(pub, board, number, letter) {
    pub.write(JSON.stringify({
        board: board,
        name: 'cell.updated',
        data: {
            number: number,
            letter: letter
            }
        })
    );
}