import _ from "underscore";
export default (state, action) => true && { ...state, descriptions: { [action.for]: action.description } };
