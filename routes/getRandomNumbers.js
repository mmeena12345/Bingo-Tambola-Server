const schema = require("../schema/index");
const Redis  = require('ioredis');
const redis = new Redis();

exports.plugin = {
    name: 'get-random-number',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: async function (request, h) {
                try{
                    let gameId = request.params.game_id;
                    let resp = await redis.get("RandomNumbers");
                    resp = JSON.parse(resp);
                    if(!resp){
                        resp = await schema.game.find({game_id: gameId});
                        await redis.set("RandomNumbers",JSON.stringify(resp));
                    }

                    if(resp){
                       return h.response('All Generated Random Numbers for Game with Game ID: ' + gameId + ' are : ' + resp[0].random_number);
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