const keys = require('../config/keys');

const costants = Object.freeze({

    DBConnectionStrings: Object.freeze({
        LOCAL: 'mongodb://localhost/3s7',
        ATLAS: keys.mongoDB.atlas_conn_string,
    }),

    GameType: Object.freeze({
        TRESSETTE: "Tressette",
        BRISCOLA: "Briscola"
    }),

    RoomConfig: {
        tableNumber: 20
    },

    BaseUserConfig:{
        usernamePrefix: "DEMON"
    }

});

module.exports = costants;