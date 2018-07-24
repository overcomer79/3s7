export enum GameType {
  TRESSETTE,
  BRISCOLA,
  TRIS
}

export interface IGameInfo {
  roomName: string
}

export const GameInfo = new Map<GameType, IGameInfo>();
GameInfo.set(GameType.TRESSETTE, { roomName : "Tressette"});
GameInfo.set(GameType.BRISCOLA, { roomName : "Briscola"});
GameInfo.set(GameType.TRIS, { roomName : "Tris"});

export const costants = Object.freeze({
  BaseUserConfig: {
    usernamePrefix: "DEMON"
  },

  LogMessages: Object.freeze({
    ROOM_JOINED: "è entrato nella stanza...",
    ROOM_LEFT: "ha abbandonato la stanza..."
  })
});


export enum MessageType{
  EVAL,
  CHAT_MESSAGE,
  DISCONNECT

}
export const MessageInfo = new Map<MessageType, string>();
MessageInfo.set(MessageType.EVAL, "evalServer");
MessageInfo.set(MessageType.CHAT_MESSAGE, "chat message");
MessageInfo.set(MessageType.DISCONNECT, "disconnect");
