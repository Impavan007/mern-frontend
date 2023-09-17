import Footer from "../features/Footer'/footer";
import AdminProductList from "../features/admin/components/adminProduct";
import Navbar from "../features/navbar/NavBar";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { BallTriangle } from 'react-loader-spinner';
import { useSelector } from "react-redux";
function AdminPage() {
    const status= useSelector(selectProductListStatus)
    return(
        <>
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
        <Navbar>
        <AdminProductList></AdminProductList>
        </Navbar>
        <Footer></Footer>
        </>
    )
}

export default AdminPage;