const schema = require('../schema/index');
const Redis  = require('ioredis');
const redis = new Redis();

exports.plugin = {
    name: 'generate-random-number',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: async function (request, h) {
                try{
                    let gameId = request.params.game_id;
                    let resp = await schema.ticket.find({game_id: gameId});
                    if(resp){
                        let randomNumber = Math.floor((Math.random() * 1000000) + 1);
                        resp = await schema.game.updateMany({game_id: gameId}, {$push : {random_number: randomNumber}});
                        await redis.flushall();
                       return h.response('Generated Random Number is ' + randomNumber);
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