import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import "./feedback.scss"
import axios from 'axios';
import {apiRequest, clientRequest} from '../../../serverRequest';

const feedbacks = () => {
    const [generalCommentsList, setGeneralCommentsList] = useState('')

    useEffect(()=>{
        axios.get(`${apiRequest}/reqGeneralComments`)
        .then(res=>{setGeneralCommentsList(res.data)})
        .catch(err=>{
            console.error("Невдалося вибрати коментарі щодо сайту: ", err)
        })
    }, [])

  return (
    <div className=''>
        <div className="
                grid
                m-auto 
                p-5
                ">
            <h2 className='text-center text-[25px] hover:text-[#359740] transition'>What our clients say</h2>
            <div className='grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-5 m-auto w-[80%]'>
                {generalCommentsList && generalCommentsList.length > 0 ? (
                generalCommentsList.map((comment)=>(
                <div key={comment.id} className='bg-[#EAF1EB] p-4 rounded-sm'>
                    <div className="feedback-item">
                        <div className="user-logo-feedback">
                            <img className='w-[55px] h-[55px] rounded-full' src={`${apiRequest}/uploads/users/${comment.user.avatar}`} alt={comment.user.name} />
                            <div className="text-user">
                                <p className="name-user">{comment.user.name}</p>
                                <div className='flex text-[12px] items-center'>
                                    <img src="./clock-three.png" alt="" />
                                    <p className="date-feedback">{comment.createdAt}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-feedback">
                            <p>Rating: {comment.rating}</p>
                            <p>
                                {comment.text}
                            </p>
                        </div>
                    </div>
                </div>))
                ) : (
                    <p>...Невдалось витягнути коментарі...</p>
                )}
            </div>
        </div>
        <div className='flex justify-center'>
            <Link className='text-white bg-gray-400 border border-b-5 border-black p-3 rounded-xs hover:bg-[#359740] hover:border-b-1 transition' to={`${clientRequest}/generalComments`}>Write own comment</Link>
        </div>
    </div>
  )
}

export default feedbacks