const db = require("../../db/index");
const { sequelize } = require("../../db/index");

const ClientCardModel = db.clientcards;
const UserModel = db.users;

class ClientCardService {
  /**
  * @author        Karol Kluba
  * @returns       Promise<ClientCardModel>
  * @description   CREATE Card - handler - DRY
  */
  static async makeACardHandler(
    { login },
    t
  ) {
    try {
      // checking if User is logged in, error if is not
      if (!login) {
        throw new Error('You must be logged in to make a card!');
      };

      // taking logged User from database and checking if User already has a card, if hasn't it, we create one
      const user = await UserModel.findOne({ where: { login: login } });
      const card = await ClientCardModel.findOne({ where: { user_id: await user.getDataValue('id') } });

      if (card) {
        throw new Error('You already have a card!');
      } else {
        const newClientCard = await ClientCardModel.create({ 
          user_id: await user.getDataValue('id')
        }, { transaction: t });
  
        await newClientCard.save();
  
        return newClientCard;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   CREATE Card
  */
  static async makeACard(
    login
  ) {
    return await sequelize.transaction(async (t) => {
      const newClientCard = await this.makeACardHandler({ login }, t);

      return {
        message: 'created!',
        card: newClientCard
      };
    });
  }
  /**
  * @author        Karol Kluba
  * @returns       Promise<ClientCardModel[]>
  * @description   GET Card fro User
  */
  static async getClientCard(
    userId,
    loggedUserLogin
  ) {
    try {
      const loggedUser = await UserModel.findOne({ where: { login: loggedUserLogin } });

      // if logged User want to see other User's card we throw an error
      if (await loggedUser.id != userId) {
        throw new Error('This is not your Card!')
      }
      return await ClientCardModel.findAll({ where: { user_id: userId } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = ClientCardService;