import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import "./feedback.scss"

const feedbacks = () => {
  return (
    <div>
        <div className="feedback">
            <h2>What our clients say</h2>
            <div className="feedback-item">
            <div className="user-logo-feedback">
                <img src="user-logo.png" alt="" />
                <div className="text-user">
                    <p className="name-user">Carla Samantoes-Diego</p>
                    <p className="date-feedback">12.09.2021</p>
                </div>
            </div>
            <div className="text-feedback">
                <img className="user-rating" width="125px" height="25px" src="user-rainting.png" alt="" />
                <p>
                    SEEDRA Spinach Seeds - contains 600 seeds in 2 Packs and professional instructions created by PhD Helga George. 
                    Be sure of our quality - the freshest batches of this season. Non-GMO, Heirloom - our seeds were tested 
                    and have the best germination ratings.
                </p>
            </div>
            <Link className='border text-center p-2 bg-gray-300 rounded-sm hover:bg-gray-500 transition' to={"https://localhost:5000/generalComments"}>Написати властий коментар</Link>
        </div>
        </div>
    </div>
  )
}

export default feedbacks