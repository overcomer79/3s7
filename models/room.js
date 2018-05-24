const setting = require('../helpers/global')

class Room {

    constructor(id, type) {
        this._id = id;
        this.tables = [];
        this.type = type;
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