import { useSelector } from "react-redux";
import SignUp from "../features/Auth/Components/SignupAuth";
import Footer from "../features/Footer'/footer";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { BallTriangle } from 'react-loader-spinner';

function SignUpPage() {
    const status= useSelector(selectProductListStatus)
    return(<>
     {status==='loading'&& <BallTriangle className="flex justify-center"
  height={100}
  width={100}
  radius={5}
  color="rgb(79,70,229)"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>}
    <SignUp/>
    <Footer></Footer>
    </>)
}

export default SignUpPage;