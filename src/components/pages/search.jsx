import React, { useEffect, useState } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { apiRequest } from '../../serverRequest'

const Search = () => {

    const [searchList, setSearchList] = useState([])

    const [searchParams] = useSearchParams();

    const type = searchParams.get('type');
    const text = searchParams.get('text');

    useEffect(() => {

        if (type == 'product') {

            axios.get(`${apiRequest}/search/product?q=${text}`)
                .then(res => { setSearchList(res.data) })
                .catch(err => { console.error("Невдалося отримати список подіних : ", err) })

        } else if (type == 'user') {

            axios.get(`${apiRequest}/search/user?q=${text}`)
                .then(res => { setSearchList(res.data) })
                .catch(err => { console.error("Невдалося отримати список подіних користувачів: ", err) })

        } else {
            console.log("Невизначено, що конкретно шукати")
        }

    }, [searchParams])

    return ( <
        div className = 'flex flex-col min-h-screen' >
        <
        Navigation / >
        <
        main className = 'flex-grow border m-auto border-gray-300 w-[90%] lg:w-[60%] border-b-0 p-5' > {
            searchList && searchList.length > 0 ? (
                searchList.map((obj) => ( <
                    div key = { obj.id }
                    className = 'border flex p-2 mt-3 rounded-lg border-gray-400' > {
                        type === 'product' ? ( <
                            div className = 'flex flex-col justify-items-center lg:flex-row p-2' >
                            <
                            img className = 'w-30 h-30 rounded-xl'
                            src = { `${apiRequest}/uploads/products/${obj.image}` }
                            alt = "" / >
                            <
                            div className = 'flex-grow flex flex-col gap-5 lg:flex-row lg:ml-10 self-center justify-between' >
                            <
                            div className = 'flex flex-col justify-evenly h-[100%]' >
                            <
                            p > < strong className = 'text-[13px] lg:text-[20px]' > Product ID: { obj.id } < /strong></p >
                            <
                            p > < strong > { obj.name } < /strong></p >
                            <
                            p className = 'text-gray-400 text-[13px]' > < strong > Type: { obj.type } < /strong></p > {
                                obj.isSale ? ( <
                                    div className = 'flex flex-row items-center' >
                                    <
                                    p > < strong > Price: < span className = 'text-green-600' > $ { obj.price } < /span></strong > < /p> <
                                    p className = 'line-through text-gray-600 ml-2 text-[13px]' > < strong > $ { obj.oldPrice } < /strong></p >
                                    <
                                    /div>
                                ) : ( <
                                    div >
                                    <
                                    p > < strong > Price: < span > $ { obj.price } < /span></strong > < /p> <
                                    /div>
                                )
                            } <
                            /div> <
                            button >
                            <
                            Link className = 'p-3 bg-blue-400 text-white hover:bg-blue-600 transition'
                            to = { `/productPage/${obj.id}` } > Product page < /Link> <
                            /button> <
                            /div> <
                            /div>
                        ) : ( <
                            div className = 'flex flex-col lg:flex-row p-2' >
                            <
                            img className = 'w-30 h-30 rounded-xl'
                            src = { `${apiRequest}/uploads/users/${obj.avatar}` }
                            alt = "" / >
                            <
                            div className = 'flex-grow flex lg:ml-10 flex-row self-center justify-between' >
                            <
                            div className = 'flex flex-col justify-evenly h-[100%]' >
                            <
                            p > < strong > User ID: { obj.id } < /strong></p >
                            <
                            p > < strong > { obj.name } < /strong></p >
                            <
                            p className = 'text-gray-400 text-[13px]' > < strong > { obj.email } < /strong></p >
                            <
                            p > < strong > Role: { obj.role } < /strong></p >
                            <
                            /div> <
                            button >
                            <
                            Link className = 'p-3 bg-blue-400 text-white hover:bg-blue-600 transition'
                            to = { `/profile/${obj.id}` } > Profile < /Link> <
                            /button> <
                            /div> <
                            /div>
                        )
                    } <
                    /div>
                ))
            ) : ( <
                p className = 'text-center text-gray-400' > ...Немає результату пошуку... < /p>
            )
        } <
        /main> <
        Footer / >
        <
        /div>
    )
}

export default Search