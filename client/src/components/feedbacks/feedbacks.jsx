import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import "./feedback.scss"
import axios from 'axios';
import {apiRequest} from '../../../apiRequest';

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
    <div>
        <div className="feedback">
        <h2 className='text-center text-[25px] hover:text-[#359740] transition'>What our clients say</h2>
            {generalCommentsList && generalCommentsList.length > 0 ? (
            generalCommentsList.map((comment)=>(
            <div className='bg-[#EAF1EB] p-3 rounded-sm'>
                <div className="feedback-item">
                    <div className="user-logo-feedback">
                        <img className='w-[55px] h-[55px] rounded-full' src={`${apiRequest}/uploads/users/${comment.user.avatar}`} alt={comment.user.name} />
                        <div className="text-user">
                            <p className="name-user">{comment.user.name}</p>
                            <div className='flex'>
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
        <div className='flex justify-center'>
            <Link className='border text-center p-2 bg-gray-300 w-65 rounded-sm hover:bg-gray-500 transition' to={"https://localhost:5000/generalComments"}>Написати властий коментар</Link>
        </div>
    </div>
  )
}

export default feedbacks