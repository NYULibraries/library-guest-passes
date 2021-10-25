import { emptyFields } from '../../backend/tools.js';

describe('tools', () => {
  describe('emptyFields', () => {
    let hasEmptyRequiredFields, obj;
    beforeEach( () => {
      hasEmptyRequiredFields = emptyFields(obj);
    });
    describe('when value of field is blank', () => {
      describe('and field name is not optional', () => {
        beforeAll( () => {
          obj = {
            "affiliate_name": "",
            "notes": "",
            "required": "",
          };
        });
        it('should return true', () => {
          expect(hasEmptyRequiredFields).toBe(true);
        });
      });
      describe('but field name is optional', () => {
        beforeAll( () => {
          obj = {
            "affiliate_name": "",
            "notes": "",
          };
        });
        it('should return false', () => {
          expect(hasEmptyRequiredFields).toBe(false);
        });
      });
    });
    
  });
});