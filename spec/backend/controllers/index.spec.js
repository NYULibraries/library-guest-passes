require('../../../backend/app');
import { nameSearch, deleteAffiliate } from '../../../backend/controllers/index';
import { Affiliate, Guest, Visit } from '../../../backend/models';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (queryData, params = {}) => {
  return {
    query: queryData,
    params: params,
  };
};

describe('index controller', () => {
  let res, req;
  afterEach( async () => {
    await Affiliate.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
    await Guest.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
    await Visit.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
    await Affiliate.truncate();
    await Guest.truncate();
    await Visit.truncate();
    await Affiliate.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
    await Guest.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
    await Visit.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
  });
  describe('nameSearch', () => {
    describe('when searching for affiliate name', () => {
      describe('and affiliate already exists', () => {
        beforeEach( async () => {
          await Affiliate.create({ name: "Adam" });
          req = mockRequest(
            { affiliate_name: 'Adam' },
          );
          res = mockResponse();
          await nameSearch(req, res);
        });
        it('should return the existing affiliate', () => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(
            [expect.objectContaining(
              {name:"Adam", permission_status: true}
            )]
          ));
        });
      });
      describe('and affiliate does not already exists', () => {
        beforeEach( async () => {
          await nameSearch(req, res);
        });
        it('should return empty', () => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(
            []
          ));
        });
      });
    });
    describe('when searching for guest name', () => {
      describe('and guest already exists', () => {
        beforeEach( async () => {
          await Guest.create({ name: "Paul" });
          req = mockRequest(
            { guest_name: 'Paul' },
          );
          res = mockResponse();
          await nameSearch(req, res);
        });
        it('should return the existing guest', () => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(
            [expect.objectContaining(
              {name:"Paul", permission_status: true}
            )]
          ));
        });
      });
      describe('and guest does not already exists', () => {
        beforeEach( async () => {
          await nameSearch(req, res);
        });
        it('should return empty', () => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(
            []
          ));
        });
      });
    });
    describe('when searching for something else unknown', () => {
      beforeEach( async () => {
        req = mockRequest(
          { villain: 'Vladimir Harkonnen' },
        );
        res = mockResponse();
        await nameSearch(req, res);
      });
      it('should return an error', () => {
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error: expect.any(Object)}));
      });
    });

  });
  describe('deleteAffiliate', () => {
    let guest, affiliate, visit;
    describe('when affiliate already exists', () => {
      beforeEach( async () => {
        guest = await Guest.create({ name: "Paul" });
        affiliate = await Affiliate.create({ name: "Stilgar" });
        visit = await Visit.create({
          guest_name: "Paul",
          affiliate_name: "Stilgar",
          initials: "TT",
          restrictions: "Gen. Coll. + AFC",
          status: "Day Pass (Forgotten NYU ID)",
          idtype: "Passport",
          cardexp: "1980-01-01",
          cardissue: "1990-01-01",
          notes: "Persona Non Grata",
        });
        await guest.addVisit(visit);
        await affiliate.addVisit(visit);
        req = mockRequest({}, 
          { id: affiliate.id },
        );
        res = mockResponse();
        await deleteAffiliate(req, res);
      });
      it('should delete affiliate', () => {
        expect(res.status).toHaveBeenCalledWith(204); 
        expect(res.json).toHaveBeenCalledWith({"destroyAffiliate": 1});
      });
    });
  });
  describe('deleteGuest', () => {

  });
  describe('createVisit', () => {

  });
  describe('getAllVisitors', () => {

  });
  describe('deleteVisit', () => {

  });
  describe('getPreviousVisits', () => {

  });
  describe('updateVisitor', () => {

  });
});
