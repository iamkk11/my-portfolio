export const actionTypes = {
    EDETAILS:'EDETAILS',
    SETRENTMONTH:'SETRENTMONTH',
    NEWSTARTDATE:'NEWSTARTDATE',
    NEWENDDATE:'NEWENDDATE',
    BASKET:'BASKET',
    PHONEACTION:'PHONEACTION',
    TOKEN:'TOKEN',
    NAME:'NAME'
}

export const setToken =(token)=>{
    return {
        type: 'TOKEN',
        token
    };
}


export const setName =(name)=>{
    return {
        type: 'NAME',
        name:name
    };
}

export const monthActionCreator =(itemValue)=>{
    return {
        type: 'SETRENTMONTH',
        month:itemValue
    };
}

export const equipmentDetailsAction = (m,n)=>{
    return {
        type:'EDETAILS',
        payload:{m,n}
    }
};


export const initialState = ()=>{
    return {
        type:'INITIALSTATEACTION',
    }
};

export const newstartdateActionCreator =(newS)=>{
    return {
        type: 'NEWSTARTDATE',
        newStart:newS
    };
}

export const newEnddateActionCreator =(newE)=>{
    return {
        type: 'NEWENDDATE',
        newEnd:newE
    };
}


export const phoneActionCreator =(p)=>{
    return {
        type: 'PHONEACTION',
        phone:p
    };
}

export const setthebasket =(r)=>{
    return {
        type: 'BASKET',
        basket:r
    };
}