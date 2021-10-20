require('../../../backend/app');
import { nameSearch } from '../../../backend/controllers/index';
import { Affiliate, Guest } from '../../../backend/models';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (queryData) => {
  return {
    query: queryData,
  };
};

describe('index controller', () => {
  let res, req;
  afterEach( async () => {
    await Affiliate.destroy({ where: {} });
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
        expect(res.render).toHaveBeenCalled();
      });
    });

  });
  describe('deleteGuest', () => {

  });
  describe('deleteAffiliate', () => {

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
