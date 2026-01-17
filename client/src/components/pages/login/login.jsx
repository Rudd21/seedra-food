import React, {useState} from 'react'
import "./login.scss"
import { Link, useNavigate} from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import axios from 'axios';
import Navigation from '../../navigation';
import Footer from '../../footer';

const addProduct = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
            const response = await axios.post('https://localhost:3000/login', formData, {
                withCredentials: true
            });
            console.log("Користувач успішно залогінився!")

            const isAdmin = await axios.get('https://localhost:3000/admin/users',{ 
                withCredentials: true
            });
            if(isAdmin){
                navigate("/adminPanel")
            }else{
                navigate("/")
            }
        }catch(err){
            console.log(err)
        }
  };
  return (
    <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className='formRegister flex-grow'>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='form'>
            <div className="flex flex-col items-center">
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
                <button type="submit">Submit</button>
            </form>
        </main>
        <Footer />
    </div>
  )
}

export default addProduct