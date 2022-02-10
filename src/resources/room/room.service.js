const db = require("../../db/index");
const RoomModel = db.rooms;

class RoomService {

  static async createRoom(
    name,
    numOfRows,
    numOfColumns,
    number
  ) {
    try {

      if (numOfRows > 16 || numOfRows < 10) {
        return 'Number of rows should be between 10 and 16'
      };

      if (numOfColumns > 25 || numOfColumns < 15) {
        return 'Number of columns should be between 15 and 24'
      };

      const room = await RoomModel.findAll({
        where: {
          name: name
        }
      });
      
      if (room.length > 0) {
        return 'Room already exists!';
      } else {

        let rows = [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
          'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'
        ];

        let columns = Array(25).fill().map((_, i) => i + 1);

        let places = [];

        for (let i = 0; i < numOfRows; i++) {
          for (let j = 0; j < numOfColumns; j++) {
            places.push(rows[i] + columns[j].toString())
          }
        };

        const newRoom = await RoomModel.create({ 
          name: name, 
          number: number,
          places: places
        });

        await newRoom.save();

        return 'Created!'
      }

    } catch (error) {
      return error
    }
  }

  static async getRooms() {
    try {
      return await RoomModel.findAll();
    } catch (error) {
      return error
    }
  }
};

module.exports = RoomService;