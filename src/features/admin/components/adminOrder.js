import { useEffect, useState } from "react";
import { Items_per_page } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterProductsAsync } from "../../productList/productSlice";
import { fetchAllOrdersAsync ,selectOrders,selectTotalOrders, updateOrderAsync} from "../../order/orderSlice";
import { XMarkIcon, EyeIcon,PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import Pagination from "../../common/pagination";


function AdminOrders() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders)
  const [editableOrderId, setEditableOrderId]= useState(-1);
  const chooseColor=(status)=>{
     switch(status){
      case 'pending':
        return 'bg-yellow-200 text-yellow-600';
      case 'assigned':
        return `bg-purple-200 text-purple-600`;
      case 'recieved':
        return `bg-green-200 text-purple-600`;
      case 'dispatched':
        return `bg-blue-200 text-blue-600`;
      case 'canceled':
        return `bg-red-200 text-red-600`;
      case 'delivered':
        return `bg-green-200 text-green-600`;
     }
  }
const [sort,setSort]=useState({})
  const handleSort=(sortOption)=>{
    const sort ={_sort:sortOption.sort , _order:sortOption.order};
    console.log({sort})
    setSort(sort)
  }
  const handlePage=(e,page)=>{
    setPage(page);
  }
  useEffect(() => {
    const pagination ={_page:page,_limit:Items_per_page}
    dispatch(fetchAllOrdersAsync({sort,pagination}));
  }, [dispatch,page,sort])
  

  const handleShow=()=>{
    console.log("handleShow")
  }
  const handleUpdate=(e,order)=>{
    const updateOrder= {...order,status:e.target.value}
    dispatch(updateOrderAsync(updateOrder))
    setEditableOrderId(-1)
  }
  const handlePaymentStatus=(e,order)=>{
    const updateOrder= {...order,paymentStatus:e.target.value}
    dispatch(updateOrderAsync(updateOrder))
    setEditableOrderId(-1)
  }
  const handleEdit=(order)=>{
    setEditableOrderId(order.id)
  }

 

    return(
<>
  
  <div className="overflow-x-auto">
    <div className=" bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
      <div className="w-full">
        <div className="bg-white shadow-md rounded my-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal cursor-pointer">
                <th className="py-3 px-3 text-left" onClick={e=>handleSort({sort:'id',order:sort?._order==='asc'?'desc':'asc'},)}>
                Order Number{'  '}{sort._sort==='id'&&(sort._order==='asc'?<ArrowUpIcon className="w-4 h-4 inline"/>:<ArrowDownIcon  className="w-4 h-4 inline"/>)}</th>
                <th className="py-3 px-3 text-left">Items</th>
                <th className="py-3 px-3 text-center">quantity</th>
                <th className="py-3 px-3 text-left" onClick={e=>handleSort({sort:'totalAmount',order:sort?._order==='asc'?'desc':'asc'},)}>
                Total Ammount{'  '}{sort._sort==='totalAmount'&&(sort._order==='asc'?<ArrowUpIcon className="w-4 h-4 inline"/>:<ArrowDownIcon  className="w-4 h-4 inline"/>)}</th>
                <th className="py-3 px-3 text-center">Selected-Address</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Payment-METHOD</th>
                <th className="py-3 px-3 text-center">Payment-Status</th>
                <th className="py-3 px-3 text-center">Actions</th>

                
                
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders?orders.map(order=><tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      
                    </div>
                    <span className="font-medium">{order.id}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-left">
                {order.items.map(item=> <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.product.thumbnail}
                      />
                    </div>
                    <span>{item.product.title}</span>
                  </div>)}
                  
                </td>
               
                {order.items.map(item=>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center">
                    {item.quantity}
                  </div>
                </td>
                
                
                )}
                
                
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center">
                    ${order.totalAmount}
                  </div>
                </td>
                <td className="py-3 px-3 text-center w-2">
                  <span className="items-center justify-center">
                  <div>{order.selectedAddress && order.selectedAddress.name}</div>
                  <div>{order.selectedAddress && order.selectedAddress.street}</div>
                  <div>{order.selectedAddress &&order.selectedAddress.city}</div>
                 <div>{order.selectedAddress && order.selectedAddress.State}</div>
                 <div> {order.selectedAddress && order.selectedAddress.phone}</div>
                  
                  
                  </span>
                </td>
                <td className="py-3 px-3 text-center cursor-pointer">
                  {order.id===editableOrderId?  
                  (<select onChange = {e=>handleUpdate(e,order)}>
                    <option value="pending">pending</option>
                  <option value="assigned">assigned</option>
                  <option value="dispatched">dispatched</option>
                  <option value="canceled">canceled</option>
                  <option value="delivered">delivered</option>
                  </select>):(<span className={`${chooseColor(order.status)} py-1  px-3 rounded-full text-xs`}>
                    {order.status}
                  </span>)}
                
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center">
                    ${order.paymentMethod}
                  </div>
                </td>
                

                <td className="py-3 px-3 text-center cursor-pointer">
                  {order.id===editableOrderId?  
                  (<select onChange = {e=>handlePaymentStatus(e,order)}>
                    <option value="pending">pending</option>
                  <option value="recieved">recieved</option>
                  </select>):(<span className={`${chooseColor(order.paymentStatus)} py-1  px-3 rounded-full text-xs`}>
                    {order.paymentStatus}
                  </span>)}
                  
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <EyeIcon className="w-6 h-6"onClick={e=>handleShow(order)} />
                       
                    </div>
                    <div className="w-4 mr-4 transform hover:text-purple-500 hover:pointer hover:scale-110">
                     <PencilIcon className="w-6 h-6" onClick={e=>handleEdit(order)}/>
                    </div>
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" >
                     
                     
                    </div>
                  </div>
                </td>
              </tr>):null}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Pagination handlePage={handlePage} page={page} setPage={setPage} totalItems={totalOrders} />
  </div>
</>


    )
}

export default AdminOrders; 