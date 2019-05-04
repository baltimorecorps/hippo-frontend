import {createReducer} from 'redux-starter-kit';
import {combineReducers} from 'redux';
import {ADD_EXPERIENCE} from '../actions/profile';

export const experiencesReducer = createReducer(
  {
    unsavedChanges: false,
    inRequest: false,
    order: [],
    experiences: {},
  },
  {
    ADD_EXPERIENCE: (state, action) => {
      const id = action.experience.id;
      console.assert(!(id in state.experiences));
      console.assert(!state.order.includes(id));
      state.experiences[id] = action.experience;

      if (!state.order.includes(id)) {
        state.order.push(id);
      }

      state.unsavedChanges = true;
    },
    [`REQUEST_${ADD_EXPERIENCE}`]: (state, action) => {
      state.inRequest = true;
    },
    [`RESOLVE_${ADD_EXPERIENCE}`]: (state, action) => {
      const experience = action.body;
      const id = experience.id;
      state.experiences[id] = experience;
      if (!state.order.includes(id)) {
        state.order.push(id);
      }
      state.inRequest = false;
      state.unsavedChanges = false;
    },
    [`REJECT_${ADD_EXPERIENCE}`]: (state, action) => {
      const experience = action.experience;
      const id = experience.id;
      delete state.experiences[id];
      state.order = state.order.filter(elem => elem !== id);
      state.inRequest = false;
      state.unsavedChanges = false;
    },
  },
);

const profileReducer = combineReducers({
  experiences: experiencesReducer,
});

export default profileReducer;
