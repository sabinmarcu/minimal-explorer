import _ from "lodash";
export default (state, action) => {
    return { ...state, queue: _.take(state.queue, state.queue.length - 1), focus: state.queue[state.queue.length - 2] };
};
