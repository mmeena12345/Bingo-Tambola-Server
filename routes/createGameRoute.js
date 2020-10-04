const schema = require('../schema/index');

exports.plugin = {
    name: 'create-game-plugin',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: async function (request, h) {
                try{
                    const gameID = Date.now();
                    let gameUpdate = new schema.game({game_id: gameID});
                    let ticketUpdate = new schema.ticket({game_id: gameID});
                    let resp = await gameUpdate.save();
                    let resp1 = await ticketUpdate.save();

                    return h.response('Created the New Game with Game Id:'+gameID);
                } catch(e){
                    console.log(e);
                }
            }
        });
    }
};