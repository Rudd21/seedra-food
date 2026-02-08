import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEditProductContext } from '../../modalWindows/editProductByAdminContext';
import { apiRequest } from '../../../../apiRequest';
import Navigation from '../../navigation';
import Footer from '../../footer';

const AdminPanel = () => {

    const [checkToken, setCheckToken] = useState([])
    const { openModal } = useEditProductContext();

    const [reportsList, setReportsList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [userList, setUserList] = useState(false)
    const [productList, setProductList] = useState(false)
    const [commentList, setCommentList] = useState(false)
    const [filterReport, setFilterReport] = useState('OPEN')
    const [filterOrder, setFilterOrder] = useState('PENDING')

    const [searchUser, setSearchUser] = useState('')
    const [searchProduct, setSearchProduct] = useState('')
    const [searchComment, setSearchComment] = useState('')

    const [nameBlogPost, setNameBlogPost] = useState('')
    const [descBlogPost, setDescBlogPost] = useState('')

    const [imagePost, setImagePost] = useState()

    const [formBan, setFormBan] = useState({
        userId: '',
        days: '',
        reason: ''
    })
    const navigate = useNavigate()

    const fetchReports = ()=>{
        axios.get(`${apiRequest}/admin/getReports`, {withCredentials: true})
        .then(res=>{setReportsList(res.data)})
        .catch(err=>{
            console.log(err)
            console.error("Невдалося отримати список скарг!")
        })
    }

    const fetchOrders = ()=>{
        axios.get(`${apiRequest}/reqOrders`, {withCredentials: true})
        .then(res=>{setOrdersList(res.data)})
        .catch(err=>{
            console.log(err)
            console.error("Невдалося отримати список скарг!")
        })
    }

    useEffect(()=>{
        // Запит чи користувач авторизований
        axios.get(`${apiRequest}/user-data`,{withCredentials: true})
        .then(res=>{
            setCheckToken(res.data)
            if(res.data.role !== 'ADMIN'){
                navigate('/')
            }   
        })
        .catch(err=>{
            console.error("Немає токену або що:", err)
            navigate('/')
        })

        fetchReports()
        fetchOrders()
    }, []);

    const findUser = ()=>{
        axios.get(`${apiRequest}/admin/user?q=${searchUser}`)
        .then(res=>setUserList(res.data))
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при пошуку користувача")
        })
    }

    const findProduct = () =>{
        axios.get(`${apiRequest}/admin/product?q=${searchProduct}`)
        .then(res=>setProductList(res.data))
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при пошуку товару")
        })
    }

    const findComment = () =>{
        axios.get(`${apiRequest}/admin/comment?q=${searchComment}`)
        .then(res=>setCommentList(res.data))
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при пошуку коментаря")
        })
    }

    const handleReportStatus = (reportId, newStatus) =>{
        axios.post(`${apiRequest}/admin/productStatus`, {
            reportId, 
            status: newStatus
        },{
            withCredentials: true
        })
        .then(res=>fetchReports())
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при змінені статуса")
        })
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

    const handleBan = (e) => {
        setFormBan({ 
            ...formBan,
            userId: searchUser,
            [e.target.name]: e.target.value
    })
    }

    const submitBan = ()=>{
        axios.post(`${apiRequest}/admin/banUser`, formBan,
            {
                withCredentials: true
            }
        ).then(console.log("Успішно видано бан"))
        .catch(err=>{
            console.log(err)
            console.error("Невдалось видати бан")
        })
    }

    const unbanUser = (userId)=>{
        axios.post(`${apiRequest}/admin/unbanUser`, {
                userId
            },{
                withCredentials: true
            }
        ).then(res=>{console.log("Успішно знято бан")})
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при спробі зняти бан")
        })
    }

    const deleteComment = (commentId)=>{
        axios.post(`${apiRequest}/admin/deleteComment`, {
                commentId
            },{
                withCredentials: true
            }
        ).then(console.log("Успішно видалено коментар"))
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при спробі видалити коментар")
        })
    }

    const addBlogPost = ()=>{

        try{
            const data = new FormData();

            if(imagePost) data.append('image', imagePost)
            data.append("nameBlogPost", nameBlogPost)
            data.append("descBlogPost", descBlogPost)

            axios.post(`${apiRequest}/addBlogPost`, data,{
                withCredentials: true
            })

            console.log("Успішно додано новий пост в блог")
        }catch(err){
            console.log("Невдалося додати новий пост в блог ", err)
        }
    }

    const handleFileChoose = (e)=>{
        const file = e.target.files[0]

        if(!file) return;

        setImagePost(file)
    }


  return (
    <div>
        <Navigation />
        <main className='w-[90%] m-auto'>
            <h1 className='text-center text-xl m-5 underline italic'>Адмін Панель</h1>
            {/* <button onClick={()=>meAsAdmin()}>Зробити себе адміном!</button> */}

            {/* Зробити запит даних того хто увійшов сюди */}
            <div className='border m-3 p-4'>
                {checkToken ? (
                    <>
                        <h1>Твій профіль:</h1>
                        <p>Id: {checkToken.id}</p>
                        <p>Name: {checkToken.name}</p>
                        <p>Email: {checkToken.email}</p>
                        <p>Role: {checkToken.role}</p>
                    </>
                ):(
                    <p>Даних немає</p>
                )}
            </div>
            {/* Зробити список з всіма об'єктами бази даних сайту */}
            <div className='grid grid-cols-2 gap-3'>
                <div className="reports border m-4 p-3">
                    <h1>Фільтрація серед скарг користувачів:</h1>
                    <div className='flex'>
                        <button className='bg-green-200 m-1 p-1 rounded-xs hover:bg-green-400 transition' onClick={()=>setFilterReport('OPEN')}>OPEN</button>
                        <button className='bg-yellow-200 m-1 p-1 rounded-xs hover:bg-yellow-400 transition' onClick={()=>setFilterReport('IN_PROGRESS')}>IN PROGRESS</button>
                        <button className='bg-green-500 m-1 p-1 rounded-xs hover:bg-green-700 transition' onClick={()=>setFilterReport('RESOLVED')}>RESOLVED</button>
                        <button className='bg-red-200 m-1 p-1 rounded-xs hover:bg-red-400 transition' onClick={()=>setFilterReport('REJECTED')}>REJECTED</button>
                    </div>

                    <h1>Всього скарг: {reportsList.length}</h1>

                    <div className='max-h-[30vh] min-h-[30vh] overflow-y-scroll'>
                        {reportsList && reportsList.length > 0 ? (
                            reportsList
                            .filter(report => report.status == filterReport)
                            .map(report=> (
                                <div className='border m-4 p-3' key={report.id}>
                                    <p>ID користувача: {report.userId}</p>
                                    <p>Назва: {report.name}</p>
                                    <p>Опис: {report.description}</p>
                                    <p>Скарга на: {report.target}</p>
                                    <p>ID об'єкту скарги: {report.targetId}</p>
                                    <label for='statues'>Статус скарги:</label>
                                    <select className='bg-gray-300 m-2 p-1 text-l' onChange={(e)=>handleReportStatus(report.id, e.target.value)} name="status" id="statues" defaultValue={report.status}>
                                        <option value="OPEN">OPEN</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="RESOLVED">RESOLVED</option>
                                        <option value="REJECTED">REJECTED</option>
                                    </select>
                                </div>
                            ))
                        ) : (
                            <p>Скарг не знайдено</p>
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

                    <h1>Всього замовлень: {ordersList.length}</h1>

                    <div className='max-h-[30vh] min-h-[30vh] overflow-y-scroll'>
                        {ordersList && ordersList.length > 0 ? (
                            ordersList
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
                <div className="border m-4 p-3">
                    <h1>Пошук по користувачам за ID:</h1>
                    <input className='border bg-white' onChange={(e)=>setSearchUser(e.target.value)} type="text" />
                    <button className='bg-yellow-400 m-2 p-3 hover:bg-yellow-600 transition' onClick={()=>findUser()}>Шукати</button>
                    {userList ? (
                        <div className='column border m-4 p-3' key={userList.id}>
                            <div className='flex'>
                                <div>
                                    <h1>ID користувача: {userList.id}</h1>
                                    <h1>Ім'я користувача: {userList.name}</h1>
                                    <h1>Email користувача: {userList.email}</h1>
                                    <h1>Профіль: <a className='text-blue-500' href={`https://localhost:5000/profile/${userList.id}`}>{userList.name}</a></h1>
                                </div>
                                {userList.isBanned ? (
                                    <button className='h-10 bg-yellow-400 m-3 p-2 hover:bg-yellow-600 transition' onClick={()=>unbanUser(userList.id)}>Зняти бан</button>
                                ):(
                                    <div>
                                        <p>Введіть кількість днів бану: </p>
                                        <input className='border rounded-xs' type="number" name='days' onChange={handleBan} onClick={formBan.userId} value={formBan.days} />
                                        <p>Введіть причину бану: </p>
                                        <input className='border rounded-xs' type="text" name='reason' onChange={handleBan} value={formBan.reason} />
                                        <button className='bg-red-400 m-3 p-2 hover:bg-red-700 transition' onClick={submitBan}>Заблокувати</button>
                                    </div>
                                )}
                            </div> {/*6954560c8f49bf1e5fdf5cef*/}
                                {userList.isBanned ? (
                                    <p>Присутній бан до: {userList.banUntil}</p>
                                ):(
                                    <p>Немає бану</p>
                                )}
                        </div>
                    ) : (
                        <p>Користувача не знайдено</p>
                    )}
                </div>
                <div className="flex flex-col border m-4 p-3">
                    <h1>Пошук товарів</h1>
                    <div>
                        <input className='border bg-white' onChange={(e)=>setSearchProduct(e.target.value)} type="text" />
                        <button className='bg-yellow-400 m-2 p-3 hover:bg-yellow-600 transition' onClick={()=>findProduct()}>Шукати</button>
                    </div>
                    {productList ? (
                        <div className='border m-4 p-3' key={productList.id}>
                            <h1>ID товару: {productList.id}</h1>
                            <h1>Назва товару: {productList.name}</h1>
                            <h1>Опис товару: {productList.description}</h1>
                            <h1>Ціна товару: ${productList.price}</h1>
                            <h1>Видимість товару: {productList.isVisible? ("true"):("false")}</h1>
                            <h1>Посилання на товар: <a className='text-blue-500 hover:text-blue-700' href={`https://localhost:5000/productPage/${productList.id}`}>{productList.name}</a></h1>
                            <h1>ID автора: {productList.userId}</h1>
                            <button onClick={()=>openModal(productList.id)}>Редагувати</button>
                        </div>
                    ) : (
                        <p>Товар не знайдено</p>
                    )}
                </div>
                <div className="comments border m-4 p-3">
                    <h1>Пошук коментарів</h1>
                    <input className='border bg-white' onChange={(e)=>setSearchComment(e.target.value)} type="text" />
                    <button className='bg-yellow-400 m-2 p-3 hover:bg-yellow-600 transition' onClick={()=>findComment()}>Шукати</button>
                    {commentList ? (
                        <div className='flex border m-4 p-3' key={commentList.id}>
                            <div>
                                <h1>ID коментаря: {commentList.id}</h1>
                                <h1>Текст коментаря: {commentList.text}</h1>
                                <h1>Оцінка товару: {commentList.rating}</h1>
                                <h1>ID автора: {commentList.userId}</h1>
                            </div>
                            <button className='h-15 bg-red-400 p-2 m-3 hover:bg-red-700' onClick={()=>deleteComment(commentList.id)}>Видалити</button>
                        </div>
                    ) : (
                        <p>Коментаря не знайдено</p>
                    )}
                </div>
                <div className="comments flex flex-col gap-4 border m-4 p-3">
                    <h1>Створення посту в блог</h1>
                    {imagePost && (
                        <img className='p-2 h-80' src={URL.createObjectURL(imagePost)} alt="" />
                    )}
                    <div className='flex flex-col'>
                        Choose photo:
                        <input className='p-2 bg-gray-300' onChange={handleFileChoose} type="file" />
                        <br />
                        Write text:
                        <input className='border bg-white w-100' onChange={(e)=>setNameBlogPost(e.target.value)} placeholder='Blog Name' type="text" />
                        <br />
                        Write description:
                        <textarea className='border bg-white w-100 h-25' onChange={(e)=>setDescBlogPost(e.target.value)} placeholder='Description'  type="text" />
                        <br />
                        <button className='bg-yellow-400 m-2 p-3 w-30 hover:bg-yellow-600 transition' onClick={addBlogPost}>Створити</button>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default AdminPanel