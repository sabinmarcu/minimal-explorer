import _ from "lodash";
export default (state, action) => {
    action.callback && setTimeout(action.callback, 50);
    return {...state, queue: [...state.queue, action.view], focus: action.callback ? state.focus : action.view }
};
