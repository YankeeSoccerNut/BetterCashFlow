// This is our master reducer file.
// It doesn't manage any piece of state...it is collection of reducers that manage state.  This has NOTHING to do with React per se.

import { combineReducers } from 'redux';

// Import individual reducers for the App
import FinAccountReducer from './FinAccountReducer';
import DataChartReducer from './DataChartReducer';
import DataTableReducer from './DataTableReducer';

// Build the rootReducer using the combineReducer function...1 arg {}
// {} can have multiple properties..1 per reducer
const rootReducer = combineReducers(
  {finaccount: FinAccountReducer,
  datachart: DataChartReducer,
  datatable: DataTableReducer}
);

export default rootReducer;
