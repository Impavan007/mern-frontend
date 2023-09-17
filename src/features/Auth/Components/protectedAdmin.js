import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";
import { selectUserInfo } from "../../user/userSlice";

function ProtectedAdmin({children}) {
    const user =useSelector(selectLoggedInUser);
    const Info = useSelector(selectUserInfo);
  
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && user.role!=='admin'){
        return <Navigate to='/' replace={true}></Navigate>
    }

   
    return children;
}

export default ProtectedAdmin;