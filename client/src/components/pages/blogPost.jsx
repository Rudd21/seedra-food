import React, { useEffect, useState } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { apiRequest } from '../../../apiRequest'

const BlogPost = () => {

    const [postInfo, setPostInfo] = useState()

    const {id: blogId} = useParams();

    useEffect(()=>{
        axios.get(`${apiRequest}/reqBlogPost?id=${blogId}`)
        .then(res=>{setPostInfo(res.data)})
        .catch(err=>{console.error("Невдалося получити детальнішу інформацію про пост: ", err)})
    }, [])

    return (
        <div className='min-h-screen flex flex-col'>
            <Navigation />
            <main className='flex-grow w-[65%] border m-auto border-gray-300 border-b-0 p-5'>
            {postInfo ? (
                <div className='flex'>
                    <img className='rounded-lg' src={`${apiRequest}/uploads/posts/${postInfo.image}`} alt="" />
                    <div className='ml-3'>
                        <h1 className='text-[#359740] text-[25px]'><strong>{postInfo.name}</strong></h1>
                        <p>{postInfo.description}</p>
                    </div>
                </div>
            ):(
                <p className='text-center text-gray-400'>...Невдалося получити детальнішу інформацію про пост...</p>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default BlogPost