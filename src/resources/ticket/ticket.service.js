const db = require("../../db/index");
const { sequelize } = require("../../db/index");

const TicketModel = db.tickets;
const ScreeningModel = db.screenings;
const UserModel = db.users;

TicketModel.ScreeningModel = TicketModel.belongsTo(ScreeningModel, { foreignKey: 'screening_id' });
TicketModel.UserModel = TicketModel.belongsTo(UserModel, { foreignKey: 'user_id' });

class TicketService {
  /**
  * @author        Karol Kluba
  * @returns       Promise<TicketModel>
  * @description   Create Ticket handler - DRY
  */
  static async createTicketHandler(
    {
      price,
      place,
      idScreening
    },
    t
  ) {
    try {
      const screening = await ScreeningModel.findAll({
        where: {
          id: parseInt(idScreening)
        }
      });

      if (screening.length === 0) {
        throw new Error('You are trying to provide a ticket for not existing screening!')
      };
        
      const newTicket = await TicketModel.create({ 
        price: price,
        place: place,
        screening_id: idScreening
      }, {
        include: [ ScreeningModel, UserModel ],
        transaction: t
      });

      await newTicket.save();

      return newTicket;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   Create Ticket
  */
  static async createTicket(
    price,
    place,
    idScreening
  ) {
    return await sequelize.transaction(async (t) => {
      const newTicket = await this.createTicketHandler({
        price,
        place,
        idScreening
      }, t);

      return { 
        message: 'Created!',
        ticket: newTicket
      };
    });
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<TicketModel>
  * @description   Buy a Ticket Handler
  */
  static async buyATicketHandler(
    {
      idTicket, 
      login
    },
    t
  ) {
    try {
      if (!login) {
        throw new Error('You are not logged in!')
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
        throw new Error('This place is not avaliable!')
      }

      // updating avaliability of places in Screening
      await ScreeningModel.update({ places: places }, {
        where: {
          id: idScreening
        }
      }, { transaction: t });

      const user = await UserModel.findAll({
        where: {
          login: login
        }
      });

      // setting User's id (whick is an Owner) in TicketModel
      await TicketModel.update({ user_id: user[0].getDataValue('id') }, {
        where: {
          id: parseInt(idTicket)
        }
      }, { transaction: t });

      ticket = await TicketModel.findOne({ where: { id: idTicket } });

      // pushing TicketModel to UserModel
      let userBoughtTickets = await JSON.parse(user[0].getDataValue('boughtTickets'));
      userBoughtTickets.push(ticket);

      await UserModel.update({ boughtTickets: userBoughtTickets }, {
        where: {
          login: login
        }
      }, { transaction: t });

      return ticket;

    } catch (error) {
      throw new Error(error.message);
    }
  }
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   Buy a Ticket
  */
  static async buyATicket(
    idTicket, 
    login  
  ) {
    return await sequelize.transaction(async (t) => {
      const ticket = await this.buyATicketHandler({
        idTicket,
        login
      }, t);

      return { 
        message: 'Bought!',
        yourTicket: ticket
      };
    });
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<TicketModel[]>
  * @description   GET Tickets for Screening
  */
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
        throw new Error('That screening does not exists!')
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

module.exports = TicketService;