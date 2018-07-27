export interface IRoomsHomeReponse {
  type: any;
  connectedUser: number;
  connectedVisitor: number;
  tables: number;
}

export class HomeResponse {
  rooms: Array<IRoomsHomeReponse> = [];
}
