import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import "../../../index.css"
import "./productPage.scss"
import axios from 'axios';
import { useReportContext } from '../../modalWindows/ReportContext';

// ЗРОБИ ВИВІД КОМЕНТАРІВ МУДЄЄЄЄЄЄНЬ

const ProductPage = () => {
    const [checkToken, setCheckToken] = useState();
    const [productInfo, setProductInfo] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [commentRating, setCommentRating] = useState();
    const [getComments, setGetComments] = useState();
    const [getReplies, setGetReplies] = useState();

    const { openReport } = useReportContext();

    const [windowState, setWindowState] = useState('fixed w-0 h-0 bg-red-400 z-0 p-0 mx-0 my-0 opacity-0')
    const [replyState, setReplyState] = useState(false)
    const [commentId, setCommentId] = useState('')
    const [formReply, setFormReply] = useState({
        commentId: '',
        replyText: ''
    })

    useEffect(()=>{
      axios.get("https://localhost:3000/user-data",{
        withCredentials: true
      })
      .then(res=>{setCheckToken(res.data)})
      .catch(err=>{console.error("Немає токену або що:", err)})
    },[])

    const {id} = useParams();
    const {id: productId} = useParams();
    const {id: userId} = useParams();

    useEffect(()=>{
        axios.get(`https://localhost:3000/productPage/${id}`,{
            withCredentials: true,
        })
        .then(res=>{setProductInfo(res.data)})
        .catch(err=>{console.error("Памілка: ",err)})

    }, [id])

    useEffect(()=>{
      axios.get(`https://localhost:3000/reqComment?productId=${productId}`,{
        withCredentials: true
      })
      .then(res=>{setGetComments(res.data)})
      .catch(err=>{console.error("Немає мабуть коментарів:", err)})
    },[])
    
    const addComment = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('https://localhost:3000/addComment', {
                productId,
                text: commentText,
                rating: commentRating
            }, {
                withCredentials: true
            });
            console.log("Коментар додано!")
        }catch(err){
            console.log(err)
            console.error("Невдалось додати коментар")
        }
    }

    const toReply = (commentId) =>{
        setReplyState(true)
        setCommentId(commentId)
    }

    const addReply = () =>{
        setReplyState(false)
        console.log("formReply: ", formReply)
        axios.post("https://localhost:3000/addReply", formReply, {
            withCredentials: true
        }).then(res=>{console.log("Відповідь на коментар успішно додано!")})
        .catch(err=>{
            console.log(err)
            console.error("Невдалося додати відповідь на коментар")
        })
    }

    const handleReply = (e) => {
        setFormReply({
            ...formReply,
            commentId,
            [e.target.name]: e.target.value
        })
    }

    
    const reqReply = (commentId) =>{
        axios.get(`https://localhost:3000/reqReply?q=${commentId}`)
        .then(res=>{setGetReplies(res.data)})
        .catch(err=>{
            console.log(err)
            console.error("Невдалося отримати список відповідей!")
        })
    }
  return (
    <div className='container'>
        <nav>
            <div className="text-nav">
            <img height={"25px"} src="Frame.svg" alt="" />
            <ul className="nav-ul">
                <li className="nav-list">ALL PRODUCTS</li>
                <li className="nav-list">ABOUT SEEDRA</li>
                <li className="nav-list">OUR BLOG</li>
                <li className="nav-list">SUPPORT</li>
            </ul>
            <div className="social-top">
                <a href="#"><img src="ant-design_instagram-filled.png" alt="" /></a>
                <a href="#"><img src="akar-icons_facebook-fill.png" alt="" /></a>
                </div>
                <div className="search-block">
                    <img src="icon_search.png" alt="" />
                    <input placeholder="Search" type="text" />
                </div>
                <div className="sort-heart">
                    <img src="Outline-green.png" alt="" />
                </div>
                {!checkToken ? (   
                    <Link className='nav-list' to="/register">Register</Link>    
                ) : (
                  <>
                    <Link className='nav-list' to="/">Main</Link>
                    <Link className='nav-list' to="/addProduct">AddProduct</Link>
                  </>
                )}
            </div>
        </nav>
        <main>
            <div className="product-info">
                <img src="../../../public/tomato.png" width={'400px'} alt="Product_photo" />
                <div className="product-text">
                    <h3>{productInfo?.name}</h3>
                    <p>Тип: {productInfo?.type}</p>
                    <p>ID користувача: {productInfo?.userId}</p>
                </div>
                <button 
                    className='w-35 h-15 bg-red-400 p-4 m-3 hover:bg-red-700 hover:text-white transition' 
                    onClick={()=>{
                        openReport('PRODUCT', productInfo.id)
                    }}
                    >Поскаржитись</button> 
            </div>
            <h3>Зформувати коментар:</h3>
            <div className="feedbacks">
                <div className="flex">
                        {replyState ? (
                            <>
                                <p className='flex'>Відповідь на коментар: ID {commentId}</p>
                                <input
                                    type="text"
                                    name="replyText"
                                    value={formReply.replyText}
                                    onChange={handleReply}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    required
                                    />
                                <button onClick={addReply} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Reply</button>
                            </>
                        ) : (
                            <>
                                <label>
                                    <input id='rating' type="range" min={0.5} max={5} step={0.5} defaultValue={4.5} onChange={e => setCommentRating(e.target.value)} />
                                    <label htmlFor="rating">{commentRating}</label>
                                </label>
                                <p>Коментар:</p>
                                <input
                                    type="text"
                                    onChange={e => setCommentText(e.target.value)}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    required
                                    />
                                <button onClick={addComment} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Submit</button>
                            </>
                        )}
                </div>
                <h3>Коментарі:</h3>
                <div>
                    {getComments && getComments.length > 0 ? (
                        getComments.map((comment) => (
                        <div key={comment.id} className='flex flex-col'>
                            <div className='flex justify-between m-5 p-5 border'>
                                <div>
                                    <p><strong>Comment ID:</strong> {comment.id}</p>
                                    <p><strong>User ID:</strong> {comment.userId}</p>
                                    <p><strong>Username:</strong> {comment.user.name}</p>
                                    <p><strong>Rating:</strong> {comment.rating}</p>
                                    <p><strong>Feedback:</strong>{comment.text}</p>
                                    <button onClick={()=>reqReply(comment.id)}>Показати відповіді: {comment.countReplies}</button>
                                </div>
                                <div className='flex flex-col'>
                                        <button 
                                        className='w-35 h-10 bg-red-400 p-2 m-1 hover:bg-red-700 hover:text-white transition' 
                                        onClick={()=>{
                                            openReport('COMMENT', comment.id)
                                        }}
                                    >Поскаржитись</button>
                                    <button 
                                        className='w-35 h-10 bg-gray-300 p-2 m-1 hover:bg-gray-600 hover:text-white transition' 
                                        onClick={()=>{toReply(comment.id)}}>Відповісти</button>  
                                </div>
                            </div>
                            <div>
                                <div>
                                    
                                </div>
                                    {getReplies && getReplies.length > 0 ? (
                                    getReplies.map((reply)=>(
                                        <div className='flex ml-25 p-5 border justify-between'>
                                            <div key={reply.id}>
                                                <h1>Відповідь на коментар: {reply.commentId}</h1>
                                                <h1>Reply: {reply.text}</h1>
                                                <h1>ID Користувача: {reply.userId}</h1>
                                            </div>
                                            <div className='flex flex-col'>
                                                    <button 
                                                    className='w-35 h-10 bg-red-400 p-2 m-1 hover:bg-red-700 hover:text-white transition' 
                                                    onClick={()=>{
                                                        openReport('REPLY', reply.id)
                                                    }}
                                                >Поскаржитись</button>
                                                <button 
                                                    className='w-35 h-10 bg-gray-300 p-2 m-1 hover:bg-gray-600 hover:text-white transition' 
                                                    onClick={()=>{toReply(reply.id)}}>Відповісти</button>  
                                            </div>
                                        </div>
                                    ))
                                ):(
                                    <></>
                                )}
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>Коментарів поки немає</p>
                    )}
                </div>
            </div>
        </main>
        <div className="footer-nav">
            <ul className='footer-list'>
                <li>ALL PRODUCTS</li>
                <li>ABOUT SEEDRA</li>
                <li>OUR BLOG</li>
                <li>
                    <img height={"25px"} src="Frame.svg" alt="" />
                </li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="social-footer">
            <div className="social">
                <img src="ant-design_instagram-filled-green.png" alt="" />
                <img src="akar-icons_facebook-fill-green.png" alt="" />
            </div>
            <p className="footer-text">All rights reserved</p>
        </div>
    </div>
  )
}

export default ProductPage