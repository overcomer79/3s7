import { LogMessage } from "../models/chat_messages/logMessage";

export enum GameType {
  TRESSETTE,
  BRISCOLA,
  TRIS
}

const costants = Object.freeze({

  BaseUserConfig: {
    usernamePrefix: "DEMON"
  },

  LogMessages: Object.freeze({
    ROOM_JOINED: "è entrato nella stanza...",
    ROOM_LEFT: "ha abbandonato la stanza..."
  }),
});

export { costants };
