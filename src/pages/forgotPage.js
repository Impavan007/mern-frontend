import Forgot from "../features/Auth/Components/ForgotPassword";
import Login from "../features/Auth/Components/LoginAuth";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { BallTriangle } from 'react-loader-spinner';
import { useSelector } from "react-redux";

function ForgotPasswordPage() {
   
 return(<>
 
 <Forgot/>
 </>)   
}

export default ForgotPasswordPage;