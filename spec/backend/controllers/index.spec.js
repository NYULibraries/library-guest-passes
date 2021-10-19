require('../../../backend/app');
import { nameSearch } from '../../../backend/controllers/index';

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
  let affiliate, guest, visit;
  beforeEach( () => {
    affiliate = { name: 'Test Affiliate', permission_status: true }
    guest = { name: 'Test Guest', permission_status: true }
    visit = {
      initials: 'TST',
      restrictions: 'Gen. Coll. + AFC',
      status: 'Day Pass (Forgotten NYU ID)',
      idtype: 'Passport',
      cardissue: '3020-01-01',
      cardexp: '3020-01-10',
      user_status: 'Good Status',
      notes: 'Nothing of interest',
    }
  });
  describe('nameSearch', () => {
    describe('when searching for affiliate name', () => {
      describe('and affiliate already exists', () => {
        it('should return the existing affiliate', async () => {
          req = mockRequest(
            { affiliate_name: 'Paul Atreides' },
          );
          res = mockResponse();
          await nameSearch(req, res);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith([]);
        });
      });
      describe('and affiliate does not already exists', () => {
        it('should return empty', () => {

        });
      });
    });
    describe('when searching for guest name', () => {
      describe('and guest already exists', () => {
        beforeAll( () => {
          req = {
            query: {
              guest_name: "John Doe", 
            }
          };
        });
        it('should return the existing guest', () => {

        });
      });
      describe('and guest does not already exists', () => {
        beforeAll( () => {
          req = {
            query: {
              guest_name: "New Name", 
            }
          };
        });
        it('should return empty', () => {

        });
      });
    });
    describe('when searching for something else unknown', () => {
      it('should return an error', () => {

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
