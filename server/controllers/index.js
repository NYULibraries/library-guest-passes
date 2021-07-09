const { User } = require('../../models');

const updateOrCreateUser = async (req, res) => {
  try {
      const foundUser = await User.findOne({where: { name: req.body.name }})
      if(!foundUser) {
        const user = await User.create(req.body);
        return res.status(201).json({
          user,
        });
      };
      const user = await foundUser.increment('loginCount', { by: 1 });
      return res.status(200).json({
        user
      })
  } catch (error) {
      return res.sendStatus(500)
  }
}

const lookupUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: {name: req.query.name }})
     return users.dataValues
  } catch (error) {
    return res.sendStatus(500)
  }
}

module.exports = {
  updateOrCreateUser,
  lookupUsers
}