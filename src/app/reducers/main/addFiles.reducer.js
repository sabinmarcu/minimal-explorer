import _ from "underscore";
export default (state, action) => {
    return _.extend(state, {rawfiles: action.files});
}
