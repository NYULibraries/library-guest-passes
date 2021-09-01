const { Op } = require("sequelize");
const { User, Visit, Guest, Affiliate } = require("../models");
const { emptyFields } = require("../tools");

const createVisit = async (req, res) => {
  try {
    if (emptyFields(req.body) === true) return res.sendStatus(500);
    else {
      const affiliate = await Affiliate.findOrCreate({
        where: { name: req.body.affiliate.name },
        defaults: {
          name: req.body.affiliate.name
        }
      });
      let guest;
      if(req.body.guest?.name){
        guest = await Guest.findOrCreate({
          where: { name: req.body.guest.name },
          defaults: {
            name: req.body.guest.name
          }
        });
      }
      const visit = await Visit.create({
          initials: req.body.initials,
          restrictions: req.body.restrictions,
          status: req.body.status,
          idtype: req.body.idtype,
          cardexp: req.body.cardexp,
          cardissue: req.body.cardissue,
          notes: req.body.notes,
      });
      await affiliate[0].addVisit(visit);
      if(guest){
        await guest[0].addVisit(visit);
      }
      return res.status(201).json({
        affiliate,
        guest,
        visit,
      });
    }
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
