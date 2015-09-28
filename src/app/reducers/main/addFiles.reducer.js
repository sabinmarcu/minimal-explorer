import _ from "underscore";
export default (state, action) => true && { ...state, rawfiles: action.files };
