import React, { useState,useEffect } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { apiRequest, uploads } from '../../serverRequest'

const OurBlog = () => {

  const [blogList, setBlogList] = useState([])

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`${apiRequest}/reqBlogPosts`)
    .then(res=>{
      setBlogList(res.data)
    })
    .catch(err=>{
      console.error("Помилка при отримані блогу: ", err);
    })
  }, [])


  return (
    <div className='min-h-screen flex flex-col'>
        <Navigation/>
        <main className='flex-grow w-[90%] lg:w-[77%] m-auto p-5'>
          <h1>Latest posts in blog:</h1>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
                {blogList && blogList.length > 0 ? (
                    blogList.map((blog)=>(
                    <div key={blog.id} className='rounded-lg bg-[#EAF1EB] '>
                        <div className='rounded-xs p-2 flex flex-col'>
                            <img className='h-45 rounded-lg' src={`${uploads}/uploads/posts/${blog.image}`} alt="" />
                            <div className='flex p-3 h-[75px] items-center justify-between'>
                                <h1>{blog.name}...</h1>
                                <button className='text-white bg-gray-400 border border-b-5 border-black p-3 w-25 rounded-xs hover:bg-[#359740] hover:border-b-1 transition' onClick={()=>navigate(`/blogPost/${blog.id}`)}><p>More →</p></button>
                            </div>
                        </div>
                    </div>
                    ))
                ):(
                    <p className='text-gray-400 text-center'>...Невдалося загрузити блог...</p>
                )}
          </div>
        </main>
        <Footer/>
    </div>
  )
}

export default OurBlog