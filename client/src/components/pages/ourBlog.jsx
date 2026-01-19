import React, { useState,useEffect } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import axios from 'axios'

const OurBlog = () => {

  const [blogList, setBlogList] = useState([])

  useEffect(()=>{
    axios.get("https://localhost:3000/reqBlogPosts")
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
        <main className='flex-grow w-[65%] m-auto p-5'>
          <h1>Останні записи в блозі:</h1>
          {blogList && blogList.length > 0 ? (
              blogList.map((blog)=>(
              <div key={blog.id} className='grid grid-cols-3 gap-3'>
                <div className='border rounded-xs p-2 flex flex-col'>
                  <img src="/farm.jpg" alt="" />
                  <h1>{blog.name}</h1>
                  <h2>{blog.description}</h2>
                  {/* <button className='text-white bg-gray-400 p-3 w-25 rounded-xs hover:bg-[#359740] transition'>More →</button> */}
                </div>
              </div>
              ))
          ):(
              <p className='text-gray-400 text-center'>...Невдалося загрузити блог...</p>
          )}
        </main>
        <Footer/>
    </div>
  )
}

export default OurBlog