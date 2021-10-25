import { statusList, restrictionList } from '../../src/tools.js';

describe('tools', () => {
  describe('statusList', () => {
    it('statusList should be an array of statuses', () => {
      expect(statusList).toContain("");
    })
  });
  describe('restrictionList', () => {
    it('restrictionList should be an array of restrictions', () => {
      expect(restrictionList).toContain("");
    })
  });
});
