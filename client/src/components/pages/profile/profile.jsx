import React, { useEffect, useState } from 'react'
// import multer from 'multer';
import "./profile.scss"
import axios from 'axios';
import { Link, useNavigate, useParams} from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { apiRequest } from '../../../../serverRequest';
import { useReportContext } from '../../modalWindows/ReportContext';
import { useEditProductContext } from '../../modalWindows/editProductByAdminContext';
import { useEditProfileContext } from '../../modalWindows/editProfileContext';
import Navigation from '../../navigation';
import Footer from '../../footer';

// import { useEditProductByUserContext } from '../../modalWindows/editProductByUserContext';

const Profile = () => {
  const [checkToken, setCheckToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [userCatalog, setUserCatalog] = useState([]);
  const [productComments, setProductComments] = useState([]);
  const [ownerOrders, setOwnerOrders] = useState([])
  const [avatar, setAvatar] = useState()
  const [filterOrder, setFilterOrder] = useState('PENDING')

  const {openReport} = useReportContext()

  const {openEditProductModal} =useEditProductContext()
  const {openEditProfileModal, setWindowType} = useEditProfileContext();

  const navigate = useNavigate()
    
  const {id: userId} = useParams();


  useEffect(()=>{
    // Запит чи користувач авторизований
      axios.get(`${apiRequest}/user-data`,{
        withCredentials: true
      })
      .then(res=>{setCheckToken(res.data)})
      .catch(err=>{console.error("Немає токену або що:", err)})

    // Запит товарів викладених користувачем
      axios.get(`${apiRequest}/userProducts/${userId}`)
      .then(res=>{
        setUserCatalog(res.data);
        })
      .catch(err=>{console.error("Помлка при отримані каталогу", err)})

    // Запит наявних замолень у користувача
      axios.get(`${apiRequest}/reqOrdersByUser?userId=${userId}`)
      .then(res=>{setOwnerOrders(res.data);})
      .catch(err=>{console.error("Помлка при активних замовлень", err)})

    // Запит даних користувача, на чий профіль зайшли
        axios.get(`${apiRequest}/reqUser?userId=${userId}`)
        .then(res=>setUserInfo(res.data))
        .catch(err=>console.error("Помилка при отриманні даних користувача:", err))
  },[])

  const deleteProduct = (productId) => {
    axios.delete(`${apiRequest}/deleteProduct/${productId}`, {
        withCredentials: true
    })
  }

  const reqCommentsProduct = (productId) => {
    axios.get(`${apiRequest}/reqComment?productId=${productId}`)
    .then(res=>{setProductComments(res.data)})
    .catch(err=>{console.error("Помилка при отримані коментарів:", err)})
  }

  const handleFileChange = (e)=>{
    const file = e.target.files[0]

    if(!file) return;

    setAvatar(file)
  }

  const changeAvatar = async() =>{
    try{
        const data = new FormData()
        data.append('image', avatar)

        await axios.put(`${apiRequest}/user/changeAvatar`, data, {
            withCredentials: true
        })

        console.log("Аватар успішно змінено")
    }catch(err){
        console.log("Виникла помилка при зміні аватару:", err)
    }
  }

    const handleOrderStatus = (orderId, newStatus) =>{
        axios.post(`${apiRequest}/updateStatusOrder`, {
            orderId, 
            status: newStatus
        },{
            withCredentials: true
        })
        .then(res=>fetchOrders())
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при змінені статуса")
        })
    }

  function handleLogout() {
    axios.post(`${apiRequest}/logout`, {}, {withCredentials: true})
    .then(() => {
      setCheckToken(null);
      navigate("/");
    })
    .catch(err => console.error("Помилка під час логауту", err));
  }

  return (
    <div>
        <Navigation />
        <main className='flex-grow w-[80%] m-auto'>
            <div className="flex-col">
                <h3>Інформація про вас:</h3>
                <div className='flex justify-around flex-col lg:flex-row'>
                    {checkToken?.id === userId ? (
                        <>
                            <div className='flex-col items-center'>
                                <div className='border-3 rounded-xl bg-green-200 w-57'>
                                <img className='w-50 h-50 m-3 rounded-xl  bg-white' src={`${apiRequest}/uploads/users/${checkToken?.avatar}`} alt="" /></div>
                                <label className='flex flex-col'>
                                    Change avatar:
                                    <input id="changeAvatar"
                                    className='bg-gray-300 p-2 rounded-xl'
                                    type="file"
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />
                                </label>
                                <button className='bg-green-400 p-3 my-3 mx-10 hover:bg-green-600 transition' onClick={changeAvatar}>Змінити аватарку</button>
                            </div>
                            <div className="lg:w-[80%]">
                                <p className="username">Ваш username: {checkToken?.name}</p>
                                <p className='id_user'>Ваш id: {checkToken?.id}</p>
                                <p className="email">Ваш email: {checkToken?.email}</p> 
                            </div>
                        </>
                    ) : (
                       <div className="data_user">
                            <p className="username">Username користувача: {userInfo?.name}</p>
                            <p className='id_user'>Id користувача: {userInfo?.id}</p>
                            <p className="email">Email користувача: {userInfo?.email}</p> 
                            <button className='w-35 h-15 bg-red-400 p-4 m-3 hover:bg-red-700 hover:text-white transition' onClick={()=>openReport("USER", userInfo.id)}>Поскаржитись</button>
                        </div>
                    )}
                    {checkToken?.id && (
                        <div className='edit_data_user'>
                            <button className='p-4 rounded-md hover:bg-gray-200 transition' onClick={()=>{
                                setWindowType('username')
                                openEditProfileModal();
                            }}>Change username</button>
                            <button className='p-4 rounded-md hover:bg-gray-200 transition' onClick={()=>{
                                setWindowType('password')
                                openEditProfileModal();
                            }}>Change password</button>
                            <Link className='p-4 rounded-md text-center hover:bg-gray-200 transition' to="/addProduct">AddProduct</Link>
                            <button className='p-4 rounded-md hover:bg-gray-200 transition' onClick={handleLogout}>Log out</button>
                        </div>    
                    )}
                </div>
            </div>
            <div className="">
                <h3>Товари користувача:</h3>
                <div className='grid mx-auto my-[5px] grid-cols-1 sm:grid-cols-5 gap-5'>
                {userCatalog && userCatalog.length > 0 ? (
                    userCatalog.map((userCata) => (
                    <div key={userCata.id}>
                        <div className="border p-3 h-[100%] border-gray-300 rounded-xl" data-hashtag={userCata.type} onClick={()=>{reqCommentsProduct(userCata.id)}}>
                            <div className="safe-productaImage">
                            {checkToken?.id === userId ? (
                                    <div className='flex justify-between'>
                                        <button className='bg-yellow-400 hover:bg-yellow-700 transition' onClick={()=>openEditProductModal(userCata.id)}>
                                            <img className='w-7 h-7 p-1' src="/edit.png" alt="" />
                                        </button>
                                        <button className='bg-red-400 hover:bg-red-700 transition' onClick={()=>deleteProduct(userCata.id)}>
                                            <img className='w-7 h-7 p-1' src="/delete.png" alt="" />
                                        </button>
                                    </div>
                                ) : (
                                    <p></p>
                                )}
                                <img src={`${apiRequest}/uploads/products/${userCata.image}`} alt="Product" />
                            </div>
                            <p className="flex">
                            <img className='p-1' src="/ratingStar.png" alt="" /> 
                            {userCata.avgRating ? (
                                <span className='p-1'><span className='text-yellow-500'>:</span> {userCata.avgRating}</span>
                            ) : (
                                <span className='p-1'><span className='text-yellow-500'>:</span> 0 <span className='text-gray-400'>(no reviews)</span></span>
                            )}
                            </p>
                            <h3 className='text-[15px]' key={userCata.id}>{userCata.name}</h3>
                            <div className="footer-card">
                                {userCata.isSale ? (
                                    <div className='flex-col'>
                                    <p className='text-gray-400 line-through'>$<span className="sort-price">{userCata.oldPrice}</span></p>
                                    <p className='text-green-700'>$<span className="sort-price">{userCata.price}</span></p>
                                    </div>
                                ):(
                                    <p>$<span className="sort-price">{userCata.price}</span></p>
                                )}
                                <button className='h-10 p-2 text-green-700 border border-[#CBCBCB] rounded-md hover:bg-gray-300 transition duration-300' onClick={()=>toProduct(product.id)}>Discover</button>
                            </div>
                        </div>
                    </div>
                ))) : (
                    <p className='mx-5 my-10 text-center underline text-gray-400'>...Товарів поки немає...</p>
                )}
                </div>
            </div>
            <div className='flex flex-col-reverse justify-between'>
                <div className="comment_user">
                    <h3>Коментарі щодо товару:</h3>
                    <div>
                    {/* <p><strong>Comment ID:</strong> {comment.id}</p> */}
                        {productComments && productComments.length > 0 ? (
                            productComments
                            .filter(c=> !c.parentId)
                            .map((comment) => (
                            <div key={comment.id} className='flex flex-col'>
                                <div className='flex m-5 p-5 border'>
                                    <img className='w-30 h-30 rounded-xl' src={`${apiRequest}/uploads/users/${comment.user.avatar}`} alt="" />
                                    <div className='flex-grow ml-10'>
                                        <p className={comment.rating > 2.5 ? ('text-green-400') : ('text-yellow-400')}><strong>Rating: {comment.rating}</strong></p>
                                        <div className='flex justify-between w-[40%]'>
                                            <p><strong>{comment.user.name}</strong></p>
                                            <p className='text-gray-400 text-[13px] self-center'><strong>{comment.createdAt}</strong></p>
                                        </div>
                                        <p className='mt-3'><strong>{comment.text}</strong></p>
                                    </div>
                                    <div className='flex flex-col self-center'>
                                    <button 
                                            className='w-25 h-10 bg-gray-300 p-2 m-1 hover:bg-gray-600 hover:text-white transition' 
                                            onClick={()=>{toReply(comment.id)}}>Reply</button>  
                                    </div>
                                    <button 
                                        className='w-10 h-10 bg-red-400 self-center m-3 text-[20px] text-white hover:bg-red-700 hover:text-white transition' 
                                        onClick={()=>{
                                            openReport('COMMENT', comment.id)
                                        }}
                                    >!</button>
                                </div>
                                <div>
                                        {comment.replies?.map((reply)=>(
                                            <div className='flex ml-25 p-5 border justify-between'>
                                                <div className='flex-grow flex flex-col justify-center' key={reply.id}>
                                                    {/* <h1>Відповідь на коментар: {reply.name}</h1>
                                                    <h1>Відповідь на коментар: {reply.parentId}</h1> */}
                                                    <h1>User ID: {reply.userId}</h1>
                                                    <h1><strong>{reply.text}</strong></h1>
                                                </div>
                                                <div className='flex flex-col self-center'>
                                                    <button 
                                                            className='w-25 h-10 bg-gray-300 p-2 m-1 hover:bg-gray-600 hover:text-white transition' 
                                                            onClick={()=>{toReply(comment.id)}}>Reply</button>  
                                                    </div>
                                                    <button 
                                                        className='w-10 h-10 bg-red-400 self-center m-3 text-[20px] text-white hover:bg-red-700 hover:text-white transition' 
                                                        onClick={()=>{
                                                            openReport('COMMENT', comment.id)
                                                        }}
                                                >!</button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            ))
                        ) : (
                            <p className='text-gray-400 text-center p-5'>...Коментарів поки немає...</p>
                        )}
                    </div>
                </div>
                <div className="reports border m-4 p-3">
                    <h1>Фільтрація замовлень:</h1>
                    <div className='flex'>
                        <button className='bg-green-200 m-1 p-1 rounded-xs hover:bg-green-400 transition' onClick={()=>setFilterOrder('PENDING')}>PENDING</button>
                        <button className='bg-green-400 m-1 p-1 rounded-xs hover:bg-yellow-400 transition' onClick={()=>setFilterOrder('PAID')}>PAID</button>
                        <button className='bg-yellow-300 m-1 p-1 rounded-xs hover:bg-green-700 transition' onClick={()=>setFilterOrder('PROCESSING')}>PROCESSING</button>
                        <button className='bg-purple-400 m-1 p-1 rounded-xs hover:bg-red-400 transition' onClick={()=>setFilterOrder('SHIPPED')}>SHIPPED</button>
                        <button className='bg-green-500 m-1 p-1 rounded-xs hover:bg-red-400 transition' onClick={()=>setFilterOrder('COMPLETED')}>COMPLETED</button>
                        <button className='bg-red-200 m-1 p-1 rounded-xs hover:bg-red-400 transition' onClick={()=>setFilterOrder('CANCELLED')}>CANCELLED</button>
                    </div>

                    <h1>Всього замовлень: {ownerOrders.length}</h1>

                    <div className='max-h-[30vh] min-h-[30vh] overflow-y-scroll'>
                        {ownerOrders && ownerOrders.length > 0 ? (
                            ownerOrders
                            .filter(order => order.status == filterOrder)
                            .map(order=> (
                                <div className='border m-4 p-3' key={order.id}>
                                    <p>Order ID: {order.id}</p>
                                    <p>Phone number: {order.phoneNumber}</p>
                                    <p>Price: ${order.totalPrice}</p>
                                    <p>Token: {order.publicToken}</p>
                                    <label for='statues'>Статус замовлення:</label>
                                    <select className='bg-gray-300 m-2 p-1 text-l' onChange={(e)=>handleOrderStatus(order.publicToken, e.target.value)} name="status" id="statues" defaultValue={order.status}>
                                        <option value="PENDING">PENDING</option>
                                        <option value="PAID">PAID</option>
                                        <option value="PROCESSING">PROCESSING</option>
                                        <option value="SHIPPED">SHIPPED</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </div>
                            ))
                        ) : (
                            <p>Замовлень не знайдено</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default Profile