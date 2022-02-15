const db = require("../../db/index");
const { sequelize } = require("../../db/index");

const ClientCardModel = db.clientcards;
const UserModel = db.users;

class ClientCardService {

  static async makeACardHandler(
    { login },
    t
  ) {
    try {
      if (!login) {
        throw new Error('You must be logged in to make a card!');
      };

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

  static async getClientCard(
    userId,
    loggedUserLogin
  ) {
    try {
      const loggedUser = await UserModel.findOne({ where: { login: loggedUserLogin } });
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