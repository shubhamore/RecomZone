import React from 'react'
import Navbar from '../components/Navbar'
import { Link,useNavigate } from 'react-router-dom'


export default function Home() {
  const navigate = useNavigate()
  return (
      <div className='bg-slate-900 text-white min-h-full flex-1 flex'>
        <div className='flex justify-center items-center min-h-full min-w-full flex-col text-center'>
        <h1 className='text-3xl italic my-10'>We Provide Recommendation on any kind of Datasets</h1>
        <button onClick={()=>navigate('upload')} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-9 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Try Demo Now</button>
        </div>
      </div>
  )
}
