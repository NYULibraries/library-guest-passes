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
  try {
    //const guest = await Guest.create(req.body.guest);
    // const visit = await Visit.create({
    //   initials: req.body.initials,
    //   restrictions: req.body.restrictions,
    //   status: req.body.status,
    //   idtype: req.body.idtype,
    //   cardexp: req.body.cardexp,
    //   cardissue: req.body.cardissue,
    //   notes: req.body.notes,
    //   Guest: {
    //     name: req.body.name,
    //     permission_status: true,
    //   }
    // }, {
    //   include: Guest
    // });

    const guest = await Guest.create({
      name: req.body.guest.name,
      permission_status: true,
    }).then(function(guest) {
      guest.addVisit({
        initials: req.body.initials,
        restrictions: req.body.restrictions,
        status: req.body.status,
        idtype: req.body.idtype,
        cardexp: req.body.cardexp,
        cardissue: req.body.cardissue,
        notes: req.body.notes,
      })
    });

    return res.status(201).json({
      guest,
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
  createVisit
}