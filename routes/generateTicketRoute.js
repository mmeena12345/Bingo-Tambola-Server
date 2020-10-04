const schema  = require('../schema/index');
const Redis  = require('ioredis');
const redis = new Redis();

exports.plugin = {
    name: 'generate-ticket',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: async function (request, h) {
                try{
                    let gameId = request.params.game_id;
                    let user_name = request.params.user_name;

                    let resp = await schema.ticket.find({game_id: gameId});
                    let respUserName = await schema.ticket.find({user_name: user_name});
                    console.log("respUserName",respUserName.length);
                    if(resp){
                        let ticket_id = Math.floor((Math.random() * 1000) + 1);
                        ticket_id = gameId + "_" + user_name + "_" + ticket_id;
                        if(!respUserName || (respUserName && respUserName.length<=0)){
                            resp = await schema.ticket.updateMany({game_id: gameId}, {$push : {user_name: user_name, ticket_id: ticket_id}});
                        }else{
                            resp = await schema.ticket.updateMany({game_id: gameId}, {$push : {ticket_id: ticket_id}});
                        }

                        await redis.flushall();

                        return h.response('Ticket Generated Successfully' + ticket_id);
                    }else{
                        return h.response('No Such Game ID Present');
                    }
                } catch (e){
                    console.log("err",e);
                }
            }
        });
    }
};