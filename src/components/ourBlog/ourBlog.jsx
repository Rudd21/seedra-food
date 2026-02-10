import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {apiRequest} from '../../serverRequest';

const OurBlog = () => {
    const [blogList, seBlogList] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`${apiRequest}/reqBlogPosts`)
        .then(res=>{seBlogList(res.data)})
        .catch(err=>{
            console.error("Невдалося вибрати коментарі щодо сайту: ", err)
        })
    }, [])

  return (
    <div className='mt-5'>
        <div className="w-[77%] lg:w-[90%] m-auto">
        <h2 className='text-center text-[25px] hover:text-[#359740] transition'>OurBlog</h2>
            <div className='
                    grid 
                    
                    lg:grid-cols-4 
                    lg:gap-3
                    
                    sm:grid-cols-1
                '>
                {blogList && blogList.length > 0 ? (
                    blogList.map((blog)=>(
                    <div key={blog.id} className='rounded-lg bg-[#EAF1EB] '>
                        <div className='rounded-xs p-2 flex flex-col'>
                            <img className='h-45 rounded-lg' src={`${apiRequest}/uploads/posts/${blog.image}`} alt="" />
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
        </div>
    </div>
  )
}

export default OurBlog