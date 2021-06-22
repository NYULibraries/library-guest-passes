const { User } = require('../../models');

const createUser = async (req, res) => {
  try {
      const user = await User.create(req.body);
      return res.status(201).json({
          user,
      });
  } catch (error) {
      return res.status(500).json({ error: "this failed :(" , log: error})
  }
}

module.exports = {
  createUser
}