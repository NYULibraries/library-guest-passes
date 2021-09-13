const { Op } = require("sequelize");
const { Visit, Guest, Affiliate } = require("../models");
const { emptyFields } = require("../tools");

const createVisit = async (req, res) => {
  try {
    if (emptyFields(req.body) === true) return res.sendStatus(500);
    else {
      const guest = await Guest.findOrCreate({
        where: { name: req.body.guest_name },
        defaults: {
          name: req.body.guest_name
        }
      });
      let affiliate;
      if(req.body?.affiliate_name){
        affiliate = await Affiliate.findOrCreate({
          where: { name: req.body.affiliate_name },
          defaults: {
            name: req.body.affiliate_name
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
      await guest[0].addVisit(visit);
      if(affiliate){
        await affiliate[0].addVisit(visit);
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

const lookupGuest = async (req, res) => {
  try {
    const queryResults = await Guest.findAll({
      where: {
        name: { [Op.startsWith]: `${req.query.guest_name}` },
      },
      include: [{
        model: Visit
      }]
    });
    return res.status(200).json(queryResults);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  lookupGuest,
  createVisit
}
