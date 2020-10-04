const schema = require("../schema/index");
const Redis  = require('ioredis');
const redis = new Redis();

exports.plugin = {
    name: 'get-stats',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: async function (request, h) {
                try{
                    let gameId = request.params.game_id;
                    let resp,resp1;
                    resp = await redis.get('gameDetails'+gameId);
                    resp1 = await redis.get('ticketDetails'+gameId);
                    resp = JSON.parse(resp);
                    resp1 = JSON.parse(resp1);
                    if(!resp && !resp1){
                        resp = await schema.game.find({game_id: gameId});
                        resp1 = await schema.ticket.find({game_id: gameId});

                        redis.set(`gameDetails${gameId}`,JSON.stringify(resp));
                        redis.set(`ticketDetails${gameId}`,JSON.stringify(resp1));
                    }
                    let numberDrawns=0,no_of_ticket=0,no_of_user=0;

                    if(resp[0] && resp1[0]){
                        numberDrawns = resp[0] && resp[0].random_number && resp[0].random_number.length;
                        no_of_ticket = resp1[0] && resp1[0].ticket_id && resp1[0].ticket_id.length;
                        no_of_user = resp1[0] && resp1[0].user_name && resp1[0].user_name.length;
                    }

                    if(resp){
                       return h.response(`<table style = "border: 1px solid black"><tr><th style = "padding: 10px">NO. of Random Numbers</th><th style = "padding: 10px">No. of Tickets</th><th style = "padding: 10px">No. of Users</th></tr><tr><td style = "padding: 10px">${numberDrawns}</td><td style="padding: 10px">${no_of_ticket}</td><td style="padding: 10px">${no_of_user}</td></tr></table>`);
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