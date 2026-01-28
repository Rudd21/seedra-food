import React, {useState} from 'react'
import "./login.scss"
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { apiRequest } from '../../../../apiRequest';
import Navigation from '../../navigation';
import Footer from '../../footer';

const addProduct = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [responce, setResponce] = useState()

    const navigate = useNavigate();
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${apiRequest}/login`, formData, {
                withCredentials: true
            });

            setResponce("Login successfull")
            
            navigate('/')
        }catch(err){
            console.log(err)
            setResponce("Failed to log in")
        }
  };
  return (
    <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className='formRegister flex-grow w-[40%] m-auto'>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='form border border-gray-300 border-t-0 border-b-0 m-5'>
            <div className="flex flex-col items-center font-bold">
            <label>
                    <p>Email:</p>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                    <p>Password:</p>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                </label>
            </div>
            <button className='bg-green-400 hover:bg-green-600 transition' type="submit">Submit</button>
                {responce && responce == 'Failed to log in' ? (    
                    <div>
                        <p className='bg-red-400 p-2 text-center text-white'>{responce}</p>
                    </div>
                ):(
                    <></>
                )}
            </form>
        </main>
        <Footer />
    </div>
  )
}

export default addProduct