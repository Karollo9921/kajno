const db = require("../../db/index");
const TicketModel = db.tickets;
const ScreeningModel = db.screenings;
const UserModel = db.users;

TicketModel.ScreeningModel = TicketModel.belongsTo(ScreeningModel, { foreignKey: 'screening_id' });
TicketModel.UserModel = TicketModel.belongsTo(UserModel, { foreignKey: 'user_id' });

class TicketService {

  static async createTicket(
    price,
    place,
    idScreening
  ) {
    try {

      const screening = await ScreeningModel.findAll({
        where: {
          id: parseInt(idScreening)
        }
      });

      if (screening.length === 0) {
        return 'You are trying to provide a ticket for not existing screening!'
      };
        
      const newTicket = await TicketModel.create({ 
        price: price,
        place: place,
        screening_id: idScreening
      }, {
        include: [ ScreeningModel, UserModel ]
      });

      await newTicket.save();

      return 'Created!'
      

    } catch (error) {
      return error
    }
  };

  static async buyATicket(idTicket, login) {
    try {
      if (!login) {
        return 'You are not logged in!'
      };

      const user =  await UserModel.findAll({
        where: {
          login: login
        }
      });

      await TicketModel.update({ user_id: user[0].getDataValue('id') }, {
        where: {
          id: parseInt(idTicket)
        }
      });

      return 'Bought!'

    } catch (error) {
      
    }
  };

  static async getTickets() {
    try {
      return await TicketModel.findAll();
    } catch (error) {
      return error
    }
  };
};

module.exports = TicketService;