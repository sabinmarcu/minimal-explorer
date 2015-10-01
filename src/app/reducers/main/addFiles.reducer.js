import _ from "lodash";
export default (state, action) => true && { ...state, filesMap: action.filesMap, folders: action.folders, descriptions: action.descriptions };
