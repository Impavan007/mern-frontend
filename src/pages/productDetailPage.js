import { useSelector } from "react-redux";
import Footer from "../features/Footer'/footer";
import Navbar from "../features/navbar/NavBar";
import ProductDetails from "../features/productList/components/productDetails";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { BallTriangle } from 'react-loader-spinner';


function ProductDetailsPage() {
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
    <Navbar>
    <ProductDetails/>
    </Navbar>
    <Footer></Footer>
    </>)
}
export default ProductDetailsPage;