import React, {useEffect, useState} from 'react'
import "./addProduct.scss"
import { Link, useNavigate} from 'react-router-dom';
import { apiRequest } from '../../../../apiRequest';
import Navigation from '../../navigation';
import axios from 'axios';
import Footer from '../../footer';

const addProduct = (e) => {

    const ProductTypes = ["BUNDLES","HERBS","VEGETABLES","FRUITS","SUPPLIES","FLOWERS"]

    const [idUser, SetIdUser] = useState(null);
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(!file) return;

        setImage(file)
        console.log("Файлик є")
    };

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const data = new FormData();

            Object.entries(formData).forEach(([key, value])=>{
                data.append(key, value);
            })

            if(image) data.append('image', image);

            await axios.post(`${apiRequest}/addProduct`, data, {
                withCredentials: true
            });

            console.log("Продукт успішно додано!")
            
        }catch(err){
            console.log(err)
        }
  };

  return (
    <div className='container'>
        <Navigation />
        <main className='formToProduct flex m-auto'>
            <div className="h-15 select-none productSeems">
            <h1 className='m-2'>Preview:</h1>
            <div
                data-heart="no"
                className="h-95 w-65 m-3 bg-white product" 
                >
                <div className="safe-productaImage">
                <button value="1" className="heart" type="button"></button>
               {image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt='preview'
                        className='h-55 w-55'
                    />
                ):(
                    <img
                        src='./products/default.png'
                        alt='preview'
                        className='h-55 w-55'
                    />
                )}
                </div>
                <p className="flex">
                Rating: [rating]
                <span></span>
                </p>
                <h3 className='product_name'>{formData.name == '' ? "[Name]" : formData.name}</h3>
                <div className="footer-card">
                <div className="price">$<span className="sort-price">{formData.price == '' ? "[Price]" : formData.price}</span></div>
              <button className='h-10 w-10 text-green-700 border border-[#CBCBCB] rounded-md'>More</button>
              <button className='rounded-md' ><img className="basket-product" src="basket.png" alt="Basket" /></button>
                </div>
            </div> 
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='form flex flex-col justify-center self-center'>
                <label>
                    Image:
                    <input id="productType" list="TypesProduct"
                    className='bg-white rounded-xl'
                    type="file"
                    accept='image/*'
                    onChange={handleFileChange}
                />
                </label>
                <label>
                    Product Name:
                    <input
                    className='bg-white rounded-xl'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                    Product Type:
                    <input id="productType" list="TypesProduct"
                    className='bg-white rounded-xl'
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
                <datalist id="TypesProduct">
                    {ProductTypes.map((type, index) => (
                        <option key={index} value={type} />
                    ))}
                </datalist>
                </label>
                <br />
                <label>
                    Price:
                    <input
                    className='bg-white rounded-xl'
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                    className='bg-white rounded-xl'
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                </label>
                <button className='bg-green-300 hover:bg-green-600 transition' type="submit">Add Product</button>
            </form>
        </main>
        <Footer />
    </div>
  )
}

export default addProduct