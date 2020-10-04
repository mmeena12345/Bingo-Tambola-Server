const Hapi  = require("hapi");
const Mongoose = require("mongoose");

const server = new Hapi.server({host:"localhost", port:3000});

Mongoose
    .connect("mongodb://localhost:27017/BINGO_TAMBOLA",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log("MONGODB Conncted.....");
    })
    .catch((e)=>console.log("err",err));

const createGamePlugin = () => server.register({
    plugin: require("./routes/createGameRoute"),
    routes:{
        prefix: '/api/game/create'
    }
});

const generateTicketPlugin = () => server.register({
    plugin: require("./routes/generateTicketRoute"),
    routes:{
        prefix: '/api/game/{game_id}/ticket/{user_name}/generate'
    }
});

const getTicketInfoPlugin = () => server.register({
    plugin: require("./routes/getTicketRoute"),
    routes:{
        prefix: '/ticket/{ticket_id}'
    }
});

const generateRandomNumberPlugin = () => server.register({
    plugin: require("./routes/generateRandomNumber"),
    routes:{
        prefix: '/api/game/{game_id}/number/random'
    }
});

const getRandomNumbersPlugin = () => server.register({
    plugin: require("./routes/getRandomNumbers"),
    routes:{
        prefix: '/api/game/{game_id}/numbers'
    }
});

const getStatsPlugin = () => server.register({
    plugin: require("./routes/getStats"),
    routes:{
        prefix: '/api/game/{game_id}/stats'
    }
});

server.start();

createGamePlugin();
generateTicketPlugin();
getTicketInfoPlugin();
generateRandomNumberPlugin();
getRandomNumbersPlugin();
getStatsPlugin();
