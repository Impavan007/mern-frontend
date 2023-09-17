import Navbar from "../features/navbar/NavBar";
import AdminProductForm from "../features/admin/components/adminProductDForm";
import Footer from "../features/Footer'/footer";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { BallTriangle } from 'react-loader-spinner';
import { useSelector } from "react-redux";

function AdminProductFormPage() {
    const status= useSelector(selectProductListStatus)
    return(<>
         <Navbar>
    <AdminProductForm/>
    </Navbar>
    <Footer></Footer>
    </>)
}
export default AdminProductFormPage;