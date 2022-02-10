const db = require("../../db/index");
const ClientCardModel = db.clientcards;
const UserModel = db.users;

class ClientCardService {

  static async makeACard(
    login
  ) {
    try {

      if (!login) {
        return 'You must be logged in to make a card!'
      };

      const user = await UserModel.findAll({ where: { login: login } });

      const newClientCard = await ClientCardModel.create({ 
        user_id: user[0].getDataValue('id')
      });

      await newClientCard.save();

      return 'Created!'

    } catch (error) {
      return error
    }
  }

  static async getClientCard(
    userId
  ) {
    try {
      return await ClientCardModel.findAll({ where: { user_id: userId } });
    } catch (error) {
      return error
    }
  }
};

module.exports = ClientCardService;