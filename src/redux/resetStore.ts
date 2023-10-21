import {createAction} from '@reduxjs/toolkit';

export const RESET_STORE_ACTION_TYPE = 'RESET_STATE';

export const resetStateAction = createAction(RESET_STORE_ACTION_TYPE, () => {
  return {payload: null};
});
