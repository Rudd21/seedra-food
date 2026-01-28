import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import Navigation from "../navigation"
import Footer from "../footer"
import axios from 'axios'
import { apiRequest } from '../../../apiRequest'

const GeneralComments = () => {

    const [generalCommentsList, setGeneralCommentsList] = useState('')

    const [generalComment, setGeneralComment] = useState('')
    const [generalRating, setGeneralRating] = useState(4.5)

    useEffect(()=>{
        axios.get(`${apiRequest}/reqGeneralComments`)
        .then(res=>{setGeneralCommentsList(res.data)})
        .catch(err=>{
            console.error("Невдалося вибрати коментарі щодо сайту: ", err)
        })
    }, [])

    const addGeneralComment = () =>{
        axios.post(`${apiRequest}/addGeneralComment`, {generalComment, generalRating},{
            withCredentials: true
        }).catch(err=>{
            console.log("Невдалося залишити коментар: ", err)
        })
    }

  return (
    <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
            <form onSubmit={addGeneralComment}>
                <label>
                    <input id='rating' type="range" min={0.5} max={5} step={0.5} defaultValue={4.5} onChange={(e) => setGeneralRating(e.target.value)} />
                    <label htmlFor="rating">{generalRating}</label>
                </label>
                <label>
                    <p>Comment:</p>
                    <input
                    className='border p-2 m-2'
                    type="text"
                    onChange={(e)=>setGeneralComment(e.target.value)}
                    required
                />
                </label>
                <button className='bg-green-400 p-2 m-1 rounded-sm hover:bg-green-600 transition' type='submit'>Додати коментар</button>
            </form>
            {generalCommentsList && generalCommentsList.length > 0 ? (
                generalCommentsList.map((comment)=>(
                    <div className='border p-2 m-2'>
                        <p>User ID: {comment.userId}</p>
                        <p>Created: {comment.createdAt}</p>
                        <p>Feedback: {comment.text}</p>
                    </div>
                ))
            ) : (
                <p>Невдалось заполучити коментарі про сайт</p>
            )}
        </main>
        <Footer />
    </div>
  )
}

export default GeneralComments