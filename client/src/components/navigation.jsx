import React, { useEffect, useState, useParams, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'
import { apiRequest } from '../../apiRequest';
import { useBasketContext } from './modalWindows/BasketContext';
import { useReportContext } from './modalWindows/ReportContext';
import { useResultContext } from './modalWindows/resultContext';
import { useOrderContext } from './modalWindows/OrderContext';

const Navigation = () => {
    
    const {openBasketModal, reqBasket} = useBasketContext();
    const {openOrderModal,reqOrder} = useOrderContext();
    
    const [checkToken, setCheckToken] = useState();
    const [stateSearch, setStateSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [menuOpen, setMenuOpen] = useState(false)
    const searchRef = useRef(null);
    
    const navigate = useNavigate()
    const {openReport} = useReportContext();
    const {openResultModal, setNameResult, setDescResult} = useResultContext();

    useEffect(()=>{
      function handleClickOutside(e){
        if(searchRef.current && !searchRef.current.contains(e.target)){
          setStateSearch(false)
        }
      }
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    useEffect(()=>{
        axios.get(`${apiRequest}/user-data`,{
            withCredentials: true
        })
        .then(res=>{setCheckToken(res.data)})
        .catch(err=>{console.error("Немає токену або що:", err)})
    },[])

    function handleLogout() {
        axios.post(`${apiRequest}/logout`, {}, {withCredentials: true})
        .then(() => {
            setCheckToken(null);
            console.log("має по ідеї очиститись", checkToken)
            navigate("/");
        })
        .catch(err => console.error("Помилка під час логауту", err));
    }

  return (
        <nav className='z-3' ref={searchRef}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

            {/* LOGO */}
            <img className="h-7" src="Frame.svg" alt="logo" />

            {/* DESKTOP MENU */}
            <ul className="hidden items-center gap-6 lg:flex">
              <li><button>ALL PRODUCTS</button></li>
              <li><Link to="/aboutSeedra">ABOUT SEEDRA</Link></li>
              <li><Link to="/ourBlog">OUR BLOG</Link></li>

              {checkToken ? (
                <li>
                  <button onClick={() => openReport("OTHER", checkToken.id)}>SUPPORT</button>
                </li>
              ) : (
                <li>
                  <button onClick={() => {
                    setNameResult("Помилка")
                    setDescResult("Треба бути зареєстрованим")
                    openResultModal('error')
                  }}>SUPPORT</button>
                </li>
              )}
            </ul>

            {/* SEARCH (desktop) */}
            <div className="relative hidden lg:block">
              <input
                className="h-8 w-52 border px-2 text-sm"
                placeholder="Search"
                onInput={() => setStateSearch(true)}
                onChange={(e) => setSearchText(e.target.value)}
              />

              {stateSearch && (
                <div className="absolute top-full z-20 flex w-full flex-col border bg-white">
                  <button
                    className="p-3 text-sm hover:bg-gray-200"
                    onClick={() => {
                      navigate(`/search?type=user&text=${searchText}`)
                      setStateSearch(false)
                    }}
                  >
                    Search among users
                  </button>
                  <button
                    className="p-3 text-sm hover:bg-gray-200"
                    onClick={() => {
                      navigate(`/search?type=product&text=${searchText}`)
                      setStateSearch(false)
                    }}
                  >
                    Search among products
                  </button>
                </div>
              )}
            </div>

            {/* BURGER */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="flex flex-col gap-4 border-t bg-white px-4 py-4 lg:hidden">
              <Link to="/">Main</Link>
              <Link to="/aboutSeedra">About</Link>
              <Link to="/ourBlog">Blog</Link>

              {!checkToken ? (
                <>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <Link to={`/profile/${checkToken.id}`}>Profile</Link>
              )}

              <button onClick={() => {
                reqBasket()
                openBasketModal()
              }}>Basket</button>

              <button onClick={() => {
                reqOrder()
                openOrderModal()
              }}>Order</button>
            </div>
          )}
        </nav>
  )
}

export default Navigation