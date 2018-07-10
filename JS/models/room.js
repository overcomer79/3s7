const setting = require('../helpers/global');
const Table = require('./table');

class Room {

    constructor(id, type) {
        this._id = id;
        this.tables = [];
        this.type = type;
        var tables = new Array();
        for (let i = 0; i < setting.RoomConfig.tableNumber; i++) {
            tables.push(new Table(i));
        }
        this.tables = tables;
    }

    static getDeaultRoomList() {
        const result = [];
        Object.keys(setting.GameType).forEach((key, index) => {
            result.push(new Room(index, setting.GameType[key]));
        });
        return result;
    }
}

module.exports = Room