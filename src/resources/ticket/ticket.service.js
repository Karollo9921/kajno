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

      return { 
        message: 'Created!',
        ticket: newTicket
      }
      
    } catch (error) {
      return error
    }
  };

  static async buyATicket(
    idTicket, 
    login  
  ) {
    try {
      if (!login) {
        return 'You are not logged in!'
      };

      let ticket = await TicketModel.findOne({ where: { id: idTicket } });
      const idScreening = await ticket.getDataValue('screening_id');
      
      const screening = await ScreeningModel.findOne({ where: { id: idScreening } });
      const places = await JSON.parse(screening.getDataValue('places'));
      
      // check if this ticket is avaliable
      const ticketPlace = await ticket.getDataValue('place');
      if (places.find((place) => place.place === ticketPlace).avaliable) {
        places.forEach((place) => {
          if (place.place === ticketPlace) {
            place.avaliable = false
            return;
          };
        });
      } else {
        return 'This place is not avaliable!'
      }

      await ScreeningModel.update({ places: places }, {
        where: {
          id: idScreening
        }
      });

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

      ticket = await TicketModel.findOne({ where: { id: idTicket } });

      return { 
        message: 'Bought!',
        yourTicket: ticket
      }

    } catch (error) {
      
    }
  };

  static async getTickets(idScreening) {
    try {
      let screening = await ScreeningModel.findOne({ where: { id: idScreening } });

      if (screening) {
        return await TicketModel.findAll({
          where: {
            screening_id: idScreening
          }
        });
      } else {
        return 'That screening does not exists!'
      }
    } catch (error) {
      return error
    }
  };
};

module.exports = TicketService;