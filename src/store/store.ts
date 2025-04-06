import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UIReducer } from "./slices";

const rootReducer = combineReducers({
  ui: UIReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
