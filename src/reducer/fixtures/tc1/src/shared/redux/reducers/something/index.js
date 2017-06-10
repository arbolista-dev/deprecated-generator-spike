import { createReducer } from 'redux-act';
import actions from 'shared/redux/actions';

export default createReducer({
  [actions.user.juggle.getType()]: (state, payload) => ({
    ...state,
  }),
  [actions.authentication.login.getType()]: (state, payload) => ({
    ...state,
  }),
  
}, { 
  token: null,
  username: 'User',
   
});
