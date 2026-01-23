import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import "../../../index.css"
import "./productPage.scss"
import axios from 'axios';
import { useReportContext } from '../../modalWindows/ReportContext';
import Navigation from '../../navigation';
import Footer from '../../footer';

// ЗРОБИ ВИВІД КОМЕНТАРІВ МУДЄЄЄЄЄЄНЬ

const ProductPage = () => {
    const [productInfo, setProductInfo] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [commentRating, setCommentRating] = useState();
    const [getComments, setGetComments] = useState();

    const { openReport } = useReportContext();

    const [replyState, setReplyState] = useState(false)
    const [parentId, setParentId] = useState('')
    const [formReply, setFormReply] = useState({
        productId: '',
        parentId: '',
        replyText: ''
    })

    const {id} = useParams();
    const {id: productId} = useParams();

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
        setParentId(commentId)
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
            productId,
            parentId,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className='container'>
        <Navigation />
        <main className='w-[70%] m-auto'>
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
                                <p className='flex'>Відповідь на коментар: ID {parentId}</p>
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
                        getComments
                        .filter(c=> !c.parentId)
                        .map((comment) => (
                        <div key={comment.id} className='flex flex-col'>
                            <div className='flex justify-between m-5 p-5 border'>
                                <div>
                                    <p><strong>Comment ID:</strong> {comment.id}</p>
                                    <p><strong>User ID:</strong> {comment.userId}</p>
                                    <p><strong>Username:</strong> {comment.user.name}</p>
                                    <p><strong>Rating:</strong> {comment.rating}</p>
                                    <p><strong>Feedback:</strong>{comment.text}</p>
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
                                    {comment.replies?.map((reply)=>(
                                        <div className='flex ml-25 p-5 border justify-between'>
                                            <div key={reply.id}>
                                                <h1>Відповідь на коментар: {reply.parentId}</h1>
                                                <h1>Reply: {reply.text}</h1>
                                                <h1>ID Користувача: {reply.userId}</h1>
                                            </div>
                                            <div className='flex flex-col'>
                                                    <button 
                                                    className='w-35 h-10 bg-red-400 p-2 m-1 hover:bg-red-700 hover:text-white transition' 
                                                    onClick={()=>{
                                                        openReport('REPLY', reply.userId)
                                                    }}
                                                >Поскаржитись</button>
                                                <button 
                                                    className='w-35 h-10 bg-gray-300 p-2 m-1 hover:bg-gray-600 hover:text-white transition' 
                                                    onClick={()=>{toReply(reply.id)}}>Відповісти</button>  
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>Коментарів поки немає</p>
                    )}
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default ProductPage