import { useSelector } from "react-redux";
import Footer from "../features/Footer'/footer";
import Navbar from "../features/navbar/NavBar";
import ProductList from "../features/productList/components/product";
import { selectProductListStatus } from "../features/productList/productSlice";
import { BallTriangle } from 'react-loader-spinner';

function Home() {
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
        <ProductList></ProductList>
        </Navbar>
        <Footer></Footer>
        </>
    )
}

export default Home;