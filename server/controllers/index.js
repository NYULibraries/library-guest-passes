const { User } = require('../../models');

const updateOrCreateUser = async (req, res) => {
  try {
      // const user = await User.create(req.body);
      // return res.status(201).json({
      //     user,
      // });
      const foundUser = await User.findOne({where: { name: req.body.name }})
      console.log(foundUser);
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
      return res.status(500).json({ error: "Error:" , log: error})
  }
}

module.exports = {
  updateOrCreateUser
}