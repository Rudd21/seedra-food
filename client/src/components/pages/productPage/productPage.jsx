import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import "./productPage.scss"
import axios from 'axios';

// ЗРОБИ ВИВІД КОМЕНТАРІВ МУДЄЄЄЄЄЄНЬ

const ProductPage = () => {
    const [checkToken, setCheckToken] = useState();
    const [productInfo, setProductInfo] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [getComments, setGetComments] = useState()

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
                text: commentText
            }, {
                withCredentials: true
            });
            console.log("Коментар додано!")
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
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
            </div>
            <div className="feedbacks">
                <h3>Написати коментар:</h3>
                <div className="inputs">
                <label>
                        <p>Форма для написання коментаря:</p>
                        <input
                        type="text"
                        onChange={e => setCommentText(e.target.value)}
                        required
                    />
                </label>
                </div>
                <button onClick={addComment}>Submit</button>
                <h3>Коментарі:</h3>
                <div>
                {getComments && getComments.length > 0 ? (
                    getComments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p><strong>User ID:</strong> {comment.userId}</p>
                        <p><strong>Username:</strong> {comment.user.name}</p>
                        <p><strong>Feedback:</strong>{comment.text}</p>
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