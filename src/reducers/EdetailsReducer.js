import {actionTypes} from '../actions/EdetailsActions';

const initialState = {
    duration:1,
}

export const ed=(state=initialState, action) =>{
    switch (action.type) {
        case actionTypes.EDETAILS:
            return {...state,[action.payload.m]:action.payload.n}
        case actionTypes.INITIALSTATEACTION:
            return initialState
        default:
            return state;
    }
}

export const monthRent=(state=1, action) =>{
    switch (action.type) {
        case actionTypes.SETRENTMONTH:
            return action.month;
        default:
            return state;
    }
}

export const newStartDate=(state='', action) =>{
    switch (action.type) {
        case actionTypes.NEWSTARTDATE:
            return action.newStart;
        default:
            return state;
    }
}

export const newEndDate=(state='', action) =>{
    switch (action.type) {
        case actionTypes.NEWENDDATE:
            return action.newEnd;
        default:
            return state;
    }
}

export const phoneReducer=(state='', action) =>{
    switch (action.type) {
        case actionTypes.PHONEACTION:
            return action.phone;
        default:
            return state;
    }
}

export const bucket=(state='', action) =>{
    switch (action.type) {
        case actionTypes.BASKET:
            return action.basket;
        default:
            return state;
    }
}

export const tokenReducer=(state=null, action) =>{
    switch (action.type) {
        case actionTypes.TOKEN:
            return action.token;
        default:
            return state;
    }
}

export const nameReducer=(state='', action) =>{
    switch (action.type) {
        case actionTypes.NAME:
            return action.name;
        default:
            return state;
    }
}