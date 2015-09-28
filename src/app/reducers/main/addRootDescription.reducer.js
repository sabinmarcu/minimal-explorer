import _ from "underscore";
export default (state, action) => {
    return _.extend(state, {description: action.description});
}
