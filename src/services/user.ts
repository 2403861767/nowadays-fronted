import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user";


const getCurrentUser = async () =>{
    const res = await myAxios.get('/user/current')
    if (res.code === 0){
        setCurrentUserState(res.data)
        console.log("res.data =>",res.data)
        return res.data
    }else {
        return null
    }
}
export {
    getCurrentUser
}


