import _ from "lodash";
export default (state, action) => true && { ...state, descriptions: { ...state.descriptions, [action.for]: action.description } };
