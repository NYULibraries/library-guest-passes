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

const getPreviousVisits = async (req, res) =>{
  try {
    let Model;
    if(req.params.typeOfVisitor === "affiliates"){
      Model = Affiliate;
    } else if (req.params.typeOfVisitor === "guests"){
      Model = Guest;
    }
    
    const queryResults = await Model.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: Visit
      }]
    });
    return res.status(200).json(queryResults);
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
    console.error(error.stack)
    res.status(500)
    res.render('error', { error: error })
  };
};

const getAllVisitors = async (req, res) =>{
  try {
    let Model;
    if(req.params.typeOfVisitor === "affiliates"){
      Model = Affiliate;
    } else if (req.params.typeOfVisitor === "guests"){
      Model = Guest;
    }  else if (req.params.typeOfVisitor === "visits"){
      Model = Visit;
    }
    
    const visitor = await Model.findAll();
    return res.status(200).json(visitor);
  } catch (error) {
    console.error(error.stack)
    res.status(500)
    res.render('error', { error: error })
  }
}

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
    const destroyAffiliate = await Affiliate.destroy({where: {id: req.params.id}});
    return res.status(204).json({
      destroyAffiliate
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deleteVisit = async (req, res) => {
  try {
    const destroyVisit = await Visit.destroy({where: {id: req.params.id}, force: true});
    return res.status(204).json({
      destroyVisit
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const updateVisitor = async (req, res) => {
  try {
    let Model;
    let name;
    let permission_status;
    if(req.params.typeOfVisitor === "affiliates"){
      Model = Affiliate;
    } else if (req.params.typeOfVisitor === "guests"){
      Model = Guest;
    };
    
    if(req.body.name) {
      name = await Model.update({ name: req.body.name }, {
        where: {
          id: req.params.id
        }
      });
    }
    if (req.body.permission_status) {
      permission_status = await Model.update({ permission_status: req.body.permission_status}, {
        where: {
          id: req.params.id
        }
      });
    }
    return res.status(200).json({
      name,
      permission_status
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  nameSearch,
  createVisit,
  getAllVisitors,
  deleteGuest,
  deleteAffiliate,
  deleteVisit,
  getPreviousVisits,
  updateVisitor,
}