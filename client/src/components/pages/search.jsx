import React, { useEffect, useState } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Search = () => {

    const [searchList, setSearchList] = useState([])

    const [searchParams]= useSearchParams();

    const type = searchParams.get('type');
    const text = searchParams.get('text');
    
    useEffect(()=>{

        if( type == 'product' ) {

            axios.get(`https://localhost:3000/search/product?q=${text}`)
            .then(res=>{setSearchList(res.data)})
            .catch(err=>{console.error("Невдалося отримати список подіних : ", err)})

        } else if ( type == 'user' ) {

            axios.get(`https://localhost:3000/search/user?q=${text}`)
            .then(res=>{setSearchList(res.data)})
            .catch(err=>{console.error("Невдалося отримати список подіних користувачів: ", err)})
        
        } else {
            console.log("Невизначено, що конкретно шукати")
        }

    }, [searchParams])

    return (
        <div className='flex flex-col min-h-screen'>
            <Navigation />
            <main className='flex-grow border m-auto border-gray-300 w-[60%] border-b-0 p-5'>
            {searchList && searchList.length > 0 ? (
                searchList.map((obj)=>(
                    <div key={obj.id} className='border p-2'>
                        <h1>ID: {obj.id}</h1>
                        <h1>Name: {obj.name}</h1>
                        {type === 'product' ? (
                            <Link className='text-blue-400' to={`/productPage/${obj.id}`}>Product page</Link>
                        ):(
                            <Link className='text-blue-400' to={`/profile/${obj.id}`}>Profile</Link>
                        )}
                    </div>
                ))
            ):(
                <p className='text-center text-gray-400'>...Немає результату пошуку...</p>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default Search