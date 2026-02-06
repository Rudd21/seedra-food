import React, {useState} from 'react'
import "./register.scss"
import { apiRequest } from '../../../../apiRequest';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Navigation from '../../navigation';
import Footer from '../../footer';

const addProduct = (e) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();        
        try{
            const hashedPassword = await bcrypt.hash(formData.password, 10)

            const dataToSend = {
                ...formData,
                password: hashedPassword
            };
            
            await axios.post(`${apiRequest}/register`, dataToSend, {
                withCredentials: true
            });
            console.log("Користувач успішно зарегіструвався!")
            navigate("/login")
        }catch(err){
            console.log(err)
        }
  };
  return (
    <div className="min-h-screen flex flex-col">
        <Navigation/>
        <main className='formRegister flex-grow w-[40%] m-auto'>
        <form onSubmit={handleSubmit} encType="multipart/form-data"  className='form lg:border lg:border-gray-300 lg:border-t-0 lg:border-b-0 m-5'>
            <div className="flex flex-col items-center">
            <label>
                    <p>Username:</p>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                    <p>Email:</p>
                    <input
                    className='bg-blue'
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
                {/* <br />
                <label>
                    Product Image:
                    <input
                    type="file"
                    name="image"
                    // required
                    />
                </label>
                <br /> */}
                <button className='bg-[#eaf1eb] cursor-pointer hover:bg-[#67AE6E] transition duration-300' type="submit">Submit</button>
            </form>
        </main>
        <Footer />
    </div>
  )
}

export default addProduct