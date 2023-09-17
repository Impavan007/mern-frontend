import Footer from "../features/Footer'/footer";
import AdminOrders from "../features/admin/components/adminOrder";
import Navbar from "../features/navbar/NavBar";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { useSelector } from "react-redux";
import { BallTriangle } from 'react-loader-spinner';



function AdminOrdersPage() {
    const status= useSelector(selectProductListStatus)
    return (<>
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
            <AdminOrders></AdminOrders>
            </Navbar>
        <Footer></Footer></>
       
    )
}

export default AdminOrdersPage;