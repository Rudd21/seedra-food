import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import "../../../index.css"
import "./productPage.scss"
import axios from 'axios';
import { apiRequest, uploads } from '../../../serverRequest';
import { useReportContext } from '../../modalWindows/ReportContext';
import Navigation from '../../navigation';
import Footer from '../../footer';

const ProductPage = () => {
    const [productInfo, setProductInfo] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [commentRating, setCommentRating] = useState(4.5);
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
        axios.get(`${apiRequest}/productPage/${id}`,{
            withCredentials: true,
        })
        .then(res=>{setProductInfo(res.data)})
        .catch(err=>{console.error("Памілка: ",err)})

    }, [id])

    useEffect(()=>{
      axios.get(`${apiRequest}/reqComment?productId=${productId}`,{
        withCredentials: true
      })
      .then(res=>{setGetComments(res.data)})
      .catch(err=>{console.error("Немає мабуть коментарів:", err)})
    },[])
    
    const addComment = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${apiRequest}/addComment`, {
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
        axios.post(`${apiRequest}/addReply`, formReply, {
            withCredentials: true
        }).then(console.log("Відповідь на коментар успішно додано!"))
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
    <div className='min-h-screen flex flex-col'>
        <Navigation />
        <main className='flex-grow w-[90%] lg:w-[70%] m-auto'>
            <div className="flex flex-col lg:flex-row">
                <img className='w-[300px] m-5 border border-gray-400 rounded-lg p-5' src={`${uploads}./uploads/products/${productInfo?.image}`} alt="Product_photo" />
                <div className="flex flex-col m-5 flex-grow">
                    <div className='flex border justify-between p-3 border-gray-400 text-[20px] rounded-lg'>
                        <h3>{productInfo?.name}</h3>
                        <p>Type: {productInfo?.type}</p>
                    </div>
                    <div className='flex border justify-between p-2 mt-2 border-gray-400 rounded-lg'>
                        <p className='text-[25px]'>Price: <span className='text-green-600'>${productInfo?.price}</span></p>
                        <Link className='bg-green-400 p-2 w-[30%] text-white text-center hover:bg-green-700 transition' to={`../takeOrder/${productInfo?.id}`}>Buy</Link>
                    </div>
                    <div className='flex flex-grow flex-col w-[100%] border justify-between p-3 mt-2 border-gray-400 text-[20px] rounded-lg'>
                        <p className='text-gray-500'>Description: <span>{productInfo?.description}</span></p>
                        <p>ID user: {productInfo?.userId}</p>
                    </div>
                </div>
                <button 
                    className='w-10 h-10 bg-red-400 m-3 text-[20px] text-white hover:bg-red-700 hover:text-white transition' 
                    onClick={()=>{
                        openReport('PRODUCT', productInfo.id)
                    }}
                    >!</button> 
            </div>
            <h3 className='text-[25px]'>Writing a comment:</h3>
            <div className="feedbacks mt-5">
                        {replyState ? (
                            <>
                                <p className='flex'>Reply to: ID {parentId}</p>
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
                            <div className='flex gap-5 flex-col lg:flex-row'>
                                <label>
                                    <p>Rating:</p>
                                    <input id='rating' type="range" min={0.5} max={5} step={0.5} defaultValue={4.5} onChange={e => setCommentRating(e.target.value)} />
                                    <label htmlFor="rating">{commentRating}</label>
                                </label>
                                <textarea 
                                    onChange={e => setCommentText(e.target.value)}
                                    className='w-full flex-grow h-20 px-3 py-2 border border-gray-300 rounded-md'
                                    required
                                    >

                                    </textarea>
                                <button onClick={addComment} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Submit</button>
                            </div>
                        )}
                </div>
                <h3 className='text-[25px] mt-5'>Comments:</h3>
                <div>
                {/* <p><strong>Comment ID:</strong> {comment.id}</p> */}
                    {getComments && getComments.length > 0 ? (
                        getComments
                        .filter(c=> !c.parentId)
                        .map((comment) => (
                        <div key={comment.id} className='flex flex-col'>
                            <div className='flex m-5 p-5 border'>
                                <img className='w-30 h-30 rounded-xl' src={`${uploads}./uploads/users/${comment.user.avatar}`} alt="" />
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
            </main>
        <Footer />
    </div>
  )
}

export default ProductPage