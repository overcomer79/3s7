import { core } from "../../models/core";
import { sockets } from "../../../shared/config/sockets";

const mainRoom: string = "home";

export const HomeSocketController = (socket: SocketIO.Socket) => {
    socket.join(mainRoom);

    socket.emit(sockets.messages.response, core.getHomeResponse());
    
    socket.on(sockets.messages.socketDisconnect, () => {
        socket.leave(mainRoom);
      });
};
