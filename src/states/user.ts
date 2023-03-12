import {UserType} from "../models/user";

let currentUser: UserType;
const setCurrentUserState = (user: UserType) =>{
    currentUser = user
}

export {
    setCurrentUserState,
}
