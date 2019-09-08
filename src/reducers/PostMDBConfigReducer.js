import { POST_MDB_CONFIG } from "../actions/types";

const initialState = {
  apiKey: MY_KEY
};

const PostMDBConfig = (state = initialState, action) => {
  switch (action.type) {
    case POST_MDB_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default PostMDBConfig;
