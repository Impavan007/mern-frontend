
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchAllProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../productList/productSlice';
import { useForm } from 'react-hook-form';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../common/Modal';
import { useAlert } from 'react-alert';



 function AdminProductForm() {
  const brands = useSelector(selectBrands)
  const categories = useSelector(selectCategories);
  const { register, handleSubmit, watch, formState: { errors },setValue , reset} = useForm();
  const params = useParams()
  const dispatch = useDispatch();
  const selectProduct = useSelector(selectProductById)
  console.log({selectProduct})
  const alert = useAlert();


  useEffect(()=>{
    if(params.id){
      dispatch(fetchAllProductByIdAsync(params.id))
      
      
    }else{
      dispatch(clearSelectedProduct())
    }
  },[params.id,dispatch])
{/*"id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg"*/}
  useEffect(()=>{
   if(selectProduct && params.id)
   { setValue('title',selectProduct.title);
    setValue('description',selectProduct.description);
    setValue('price',selectProduct.price);
    setValue('discountPercentage',selectProduct.discountPercentage);
    setValue('stock',selectProduct.stock);
    setValue('brand',selectProduct.brand);
    setValue('category',selectProduct.category);
    setValue('thumbnail',selectProduct.thumbnail);
    setValue('images',selectProduct.images);
    setValue('image1',selectProduct.images[0])
    setValue('image2',selectProduct.images[1])
    setValue('image3',selectProduct.images[2])}
  },[selectProduct,setValue,params.id])

  const handleDelete=()=>{
    const product ={...selectProduct};
    product.deleted=true;
    
    dispatch(updateProductAsync(product));
    
    
  }
  

  const [openModal,setOpenModal] = useState(null)

  return (<>
    <form noValidate  onSubmit={handleSubmit((data)=>{
      
      const product = {...data}
      product.images= [product.image1,product.image2,product.image2,product.thumbnail]
      
      delete product['image1']
      delete product['image2']
      delete product['image3']
      console.log(product)
      product.price=+product.price;
      product.discountPercentage=+product.discountPercentage;
      product.stock=+product.stock;

      if(params.id){
        product.rating =selectProduct.rating?selectProduct.rating:0;
        product.id=params.id;
        dispatch(updateProductAsync(product))
        alert.success('Product Updated Successfully')
        reset()
        
      }else
      {
        dispatch(createProductAsync(product));
            alert.success('Product Created');
            reset();
        console.log({product})
      reset()}
      
      //dispatch(checkUserAsync({email:data.email ,password:data.password}));
      
      

      
     })}>
    
      <div className="space-y-12 bg-white p-12 ">
        <div className="border-b border-gray-900/10 pb-12">
         { selectProduct && selectProduct.deleted &&<h2 className='text-red-500'> This product Is Deleted</h2>}
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('title',{required:"Name is required"})}
                    id="title"
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Product Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description',{required:"description is required"})}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write Product Description</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <select {...register('brand',{required:"brand name is required"})}>
                <option>--Choose-Brand--</option>
                 {brands.map((brand)=><option value={brand.value}>{brand.label}</option>)}
                 
                </select>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select {...register('category',{required:"category is required"})}>
                <option>--Choose-category--</option>
                 {categories.map((category)=><option value={category.value}>{category.label}</option>)}
                 
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Product Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    {...register('price',{required:"price is required",min:1})}
                    id="price"
                    autoComplete="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                Stock Available
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    {...register('stock',{required:"stock details is required"})}
                    id="stock"
                    autoComplete="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>

           
            <div className="sm:col-span-2">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                Disscount 
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                  {...register('discountPercentage',{required:"disscount is required",min:0})}
                    type="number"
                    name="discountPercentage"
                    id="discountPercentage"
                    autoComplete="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('thumbnail',{required:"thumbnail is required",min:1})}
                    id="thumbnail"
                    autoComplete="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                Image1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('image1',{required:"image1 is required"})}
                    id="image1"
                    autoComplete="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                Image2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('image2',{required:"image is required"})}
                    id="image2"
                    autoComplete="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="Image3" className="block text-sm font-medium leading-6 text-gray-900">
                Image3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register('image3',{required:"disscount is required"})}
                    id="image3"
                    autoComplete="disscountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                   
                  />
                </div>
              </div>
            </div>


            
          </div>
        </div>

        

      
      </div>

      <div className="mt-3 flex items-center justify-end gap-x-6">
        <button type="button"           className="rounded-md  px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Cancel
        </button>
        {selectProduct&&!selectProduct.deleted&&<button
          onClick ={(e)=>{e.preventDefault();setOpenModal(true)}}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete 
        </button>}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    {selectProduct && <Modal cancelAction ={()=>setOpenModal(null)} title={selectProduct &&`Delete${selectProduct.title}`} 
    message="are you sure you want to delete this item" dangerOption="Delete" cancelOption="Cancel" 
    dangerAction={handleDelete } showModal={openModal}></Modal>}
    
    </>
  )
}

export default AdminProductForm;