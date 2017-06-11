import actions from 'shared/redux/actions';
import { expect } from 'chai';
import something from './index';

describe('something reducer', () => {
  describe('actions.user.juggle', () => {
    it('correctly updates state', () => {
      const originalState = {
        // insert original state here
      };
      const result = something(originalState, actions.user.juggle({
        // insert payload here
      }));
      expect(result).to.deep.equal({
        // assert new expected state
      });
      // assert immutability
      expect(originalState).to.deep.equal({
        // insert original state here
      });
    });
  });
  describe('actions.authentication.login', () => {
    it('correctly updates state', () => {
      const originalState = {
        // insert original state here
      };
      const result = something(originalState, actions.authentication.login({
        // insert payload here
      }));
      expect(result).to.deep.equal({
        // assert new expected state
      });
      // assert immutability
      expect(originalState).to.deep.equal({
        // insert original state here
      });
    });
  });
  
});
