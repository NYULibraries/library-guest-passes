const { Op } = require("sequelize");
const { User, Visit, Guest } = require("../models");
const { emptyFields } = require("../tools");

const updateOrCreateUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ where: { name: req.body.name } });
    if (emptyFields(req.body) === true) return res.sendStatus(500);
    else {
      if (!foundUser) {
        const user = await User.create(req.body);
        return res.status(201).json({
          user,
        });
      }
      const updateUserCount = await foundUser.increment("loginCount", {
        by: 1,
      });
      const updateUserInfo = await foundUser.update({
        initials: req.body.initials,
        restrictions: req.body.restrictions,
        status: req.body.status,
        idtype: req.body.idtype,
        cardexp: req.body.cardexp,
        cardissue: req.body.cardissue,
        notes: req.body.notes,
      });
      return res.status(200).json({
        updateUserCount,
        updateUserInfo,
      });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

const createVisit = async (req, res) => {
  // req.body.input = {}
  // req.body.name = name
  try {
    const visit = await Visit.create(req.body.input, {include: [{
      association: Guest,
    }]});
    console.log(visit);
    const guest = await Guest.create(req.body.name);
    console.log(guest)
    return res.status(201).json({
      visit,
      guest
    });
  } catch (error) {
    console.error(error.stack)
    res.status(500)
    res.render('error', { error: error })
  }
}

const test = async (req, res) => {
  try {
    const visit = await Visit.create(req.body);
    return res.status(201).json({
      visit,
    });
  } catch (error) {
    console.error(error.stack)
    res.status(500)
    res.render('error', { error: error })
  }
}

const lookupUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        name: { [Op.startsWith]: `${req.query.name}` },
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  updateOrCreateUser,
  lookupUsers,
  test,
  createVisit
}
