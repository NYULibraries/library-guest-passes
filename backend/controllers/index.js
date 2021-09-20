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

const nameSearch = async (req, res) => {
  try {
    let nameVariable;
    let Model;
    if("affiliate_name" in req.query){
      nameVariable = req.query.affiliate_name;
      Model = Affiliate;
    } else if ("guest_name" in req.query){
      nameVariable = req.query.guest_name;
      Model = Guest;
    }
    const queryResults = await Model.findAll({
      where: {
        name: { [Op.startsWith]: `${nameVariable}` },
      },
      include: [{
        model: Visit
      }]
    });
    return res.status(200).json(queryResults);
  } catch (error) {
    return res.sendStatus(500);
  };
};

const getAllGuests = async (req, res) => {
  try {
    const guest = await Guest.findAll({
        include: [
            {
                model: Visit
            }
        ]
    });
    return res.status(200).json({ guest });
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

const getAllAffiliates = async (req, res) => {
  try {
    const affiliate = await Affiliate.findAll({
        include: [
            {
                model: Visit
            }
        ]
    });
    return res.status(200).json({ affiliate });
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

const getAllVisits = async (req, res) => {
  try {
    const e = await Visit.findAll();
    return res.status(200).json({ e });
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

const deleteGuest = async (req, res) => {
  try {
    const destroyVisit = await Visit.destroy({where: {guest_id: req.params.id}, force: true});
    const destroyGuest = await Guest.destroy({where: {id: req.params.id}, force: true});
    return res.status(204).json({
      destroyGuest,
      destroyVisit
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deleteAffiliate = async (req, res) => {
  try {
    const destroyAffiliate = await Affiliate.destroy({where: {id: req.params.id}, force: true});
    return res.status(204).json({
      destroyAffiliate
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  nameSearch,
  createVisit,
  getAllGuests,
  getAllAffiliates,
  deleteGuest,
  deleteAffiliate,
  getAllVisits
}
