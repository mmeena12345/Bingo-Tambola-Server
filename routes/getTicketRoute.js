const schema = require('../schema/index');
const Redis  = require('ioredis');
const redis = new Redis();

exports.plugin = {
    name: 'get-ticket',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: async function (request, h) {
                try{
                    let ticketId = request.params.ticket_id;
                    let resp = await redis.get(ticketId);
                    resp = JSON.parse(resp);
                    if(!resp || (resp && resp.length <= 0)){ 
                        resp = await schema.ticket.find({ticket_id: ticketId});
                        await redis.set(ticketId, JSON.stringify(resp));
                    }
                    
                    if(resp && resp[0]){
                        return h.response(`<table style = "border: 1px solid black"><tr><th style = "padding: 10px">Game Id</th><th style = "padding: 10px">Ticket Id</th></tr><tr><td style = "padding: 10px">${resp[0].game_id}</td><td style="padding: 10px">${ticketId}</td></tr></table>`)
                    }
                    else{
                        return h.response('No Such Ticket ID Exist');
                    }
                } catch (e) {
                    console.log("err",e);
                }
            }
        });
    }
};