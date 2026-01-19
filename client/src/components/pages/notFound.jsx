import React, { useRef } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'

const NotFound = () => {

  const ref = useRef(0)

  return (
    <div className='min-h-screen flex flex-col'>
        <Navigation />
        <main className='flex-grow'>
          <div className="p-0 m-0 flex rounded-[24px] bg-[#eaf1eb] overflow-hidden w-[80%] m-auto mt-[100px] bg-cover h-[455px]">
            <div ref={ref} className="background-leafs flex z-2">
              <img className='background-leaf leaf-1' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-2' src="leaf1.png" alt="" />
              <img className='background-leaf leaf-3' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-4' src="leaf1.png" alt="" />
              <img className='background-leaf leaf-5' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-6' src="leaf1.png" alt="" />
              <img className='background-leaf leaf-7' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-8' src="leaf1.png" alt="" />
            </div>
            <div className='flex justify-center self-center m-auto'>
              <div className="flex flex-col h-50 self-center">
                <h1 className='text-8xl'>404</h1>
                <h2 className='text-5xl'>Not Found</h2>
              </div>
              <img className="w-[350px] h-[350px] ml-0 z-0" src="bungles.png" alt="" />
            </div>
          </div>
        </main>
    </div>
  )
}

export default NotFound