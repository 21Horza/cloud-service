const SET_FILES = "SET_FILES"
const SET_CURRENT_DIRECTRY = "SET_CURRENT_DIRECTORY"
const ADD_FILE = "ADD_FILE"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const PUSH_TO_STACK = "POP_TO_STACK"
const DELETE_FILE = "DELETE_FILE"
const SET_VIEW = "SET_VIEW"

const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack: [],
    view: 'list'
}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES: return {...state, files: action.payload}
        case SET_CURRENT_DIRECTRY: return {...state, currentDir: action.payload}
        case ADD_FILE: return {...state, files: [...state.files, action.payload]}
        case SET_POPUP_DISPLAY: return {...state, popupDisplay: action.payload}
        case PUSH_TO_STACK: return {...state, dirStack: [...state.dirStack, action.payload]}
        case DELETE_FILE: return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
        case SET_VIEW: return {...state, view: action.payload}
        default:
            return state
    }
}

export const setFiles = (files) => ({type: SET_FILES, payload: files})
export const setDir = (dir) => ({type: SET_CURRENT_DIRECTRY, payload: dir})
export const addFile = (file) => ({type: ADD_FILE, payload: file})
export const setPopup = (display) => ({type: SET_POPUP_DISPLAY, payload: display})
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir})
export const deleteFileAction = (dirId) => ({type: DELETE_FILE, payload: dirId})
export const setFileView = (payload) => ({type: SET_VIEW, payload})