const costants = Object.freeze({
  DBConnectionStrings: Object.freeze({
    LOCAL: "mongodb://localhost/3s7",
    ATLAS:
      "mongodb+srv://nodejsApi:" +
      process.env.MONGO_ATLAS_PASSWORD +
      "@3s7-nfqmx.mongodb.net/test"
  }),

  GameType: Object.freeze({
    TRESSETTE: "Tressette",
    BRISCOLA: "Briscola"
  }),

  RoomConfig: {
    tableNumber: 20
  },

  BaseUserConfig: {
    usernamePrefix: "DEMON"
  }
});

export { costants };
