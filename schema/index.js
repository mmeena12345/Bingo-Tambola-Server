var mongoose = require('mongoose');

const schemas = {
	game: null,
	ticket: null
};
const initSchemas = (function() {
	let gameCollectionName = 'game';
	let ticketCollectionName = 'ticket';

	let gameSchema = new mongoose.Schema({
		game_id: String,
		random_number: Array
	});
	let ticketSchema = new mongoose.Schema({
        game_id: String,
        ticket_id: Array,
        user_name: Array
	});
	
	schemas.game = mongoose.model(gameCollectionName, gameSchema);
	schemas.ticket = mongoose.model(ticketCollectionName, ticketSchema);
})();

module.exports = schemas;
