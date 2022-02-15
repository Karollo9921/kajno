const db = require("../../db/index");
const { sequelize } = require("../../db/index");

const RoomModel = db.rooms;

class RoomService {

  static async createRoomHandler(
    {
      name,
      numOfRows,
      numOfColumns,
      number
    },
    t
  ) {
    try {
      if (numOfRows > 16 || numOfRows < 10) {
        throw new Error('Number of rows should be between 10 and 16');
      };

      if (numOfColumns > 25 || numOfColumns < 15) {
        throw new Error('Number of columns should be between 15 and 24');
      };

      const room = await RoomModel.findAll({
        where: {
          name: name
        }
      });
      
      if (room.length > 0) {
        throw new Error('Room already exists!');
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
        }, { transaction: t });

        await newRoom.save();

        return newRoom;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static async createRoom(
    name,
    numOfRows,
    numOfColumns,
    number
  ) {
    return await sequelize.transaction(async (t) => {
      const newRoom = await this.createRoomHandler({
        name,
        numOfRows,
        numOfColumns,
        number
      }, t);

      return { 
        message: 'Created!',
        room: newRoom
      };
    })
  };

  static async getRooms() {
    try {
      return await RoomModel.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = RoomService;