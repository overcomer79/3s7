export interface IRoomsHomeReponse {
    name: string,
    connectedUser: number,
    connectedVisitor: number,
    tables: number
}

export class HomeResponse {
    rooms: Array<IRoomsHomeReponse> = [];

}