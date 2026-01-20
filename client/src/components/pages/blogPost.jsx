import React, { useEffect, useState } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const BlogPost = () => {

    const [postInfo, setPostInfo] = useState()

    const {id: blogId} = useParams();

    useEffect(()=>{
        axios.get(`https://localhost:3000/reqBlogPost?id=${blogId}`)
        .then(res=>{
            setPostInfo(res.data)
            console.log(res.data)
        })
        .catch(err=>{console.error("Невдалося получити детальнішу інформацію про пост: ", err)})
    }, [])

    return (
        <div className='min-h-screen flex flex-col'>
            <Navigation />
            <main className='flex-grow w-[65%] border m-auto border-gray-300 border-b-0 p-5'>
            {postInfo ? (
                <div>
                    <img src="/farm.jpg" alt="" />
                    <h1>{postInfo.name}</h1>
                    <p>{postInfo.description}</p>
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