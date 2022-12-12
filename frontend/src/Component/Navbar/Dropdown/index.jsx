import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Toast} from '../../ToastAlert'
import {Link, useNavigate} from "react-router-dom"
import Loader from '../../ButtonLoader'
import './dropdown.style.scss'
import Avatar from '../../../assets/svgs/default-brandkit.svg'
import CaretDown from '../../../assets/svgs/caret-up.svg'

 function DropDown() {
  let drop = document.querySelector(".drop")
  const handleToggle = (e) => {
     let drop = document.querySelector(".drop")
     let caretDown = document.querySelector("#caret-down")
     drop.classList.toggle("show")
     caretDown.classList.toggle('caret-down')
  }
  // window.addEventListener('click',() =>{
  //   drop.classList.add('none')
  // })
      
       
 const accessToken = JSON.parse(localStorage.getItem("userData")).token;
  const [profilePic, setProfilePic] = useState(null);
  const baseURL = "https://certgo.hng.tech/api";
  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  useEffect(()=> {
    const getImage = async () => {
      const res = await axiosPrivate.get("/profile/avatar")
      setProfilePic(res.data.data.avatar)
      console.log("Avatar", res.data.data.avatar);
    }
    getImage()
  },[])
  return (
    <div>
       <div className="dropdown-container" onClick={e => e.stopPropagation()}>
        <div className="dropdown__items" onClick={handleToggle}>
        <h3>My Account</h3>
        <img src={CaretDown} alt='caret-down' id='caret-down' />
       </div>
       <Link to='/profile'>
          <span className="dropdown__img">
          <img src={profilePic || Avatar} alt="avatar" />
          </span>
       </Link>
      
    </div>
       <Drop />
    </div>
   
  )
}
  export const Drop = () => {
  const baseURL = "https://certgo.hng.tech/api";
  const accessToken = JSON.parse(localStorage.getItem("userData")).token

   
  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
      const [loading, setLoading] = useState()
      const navigate = useNavigate()

  // Handle user Logout
  const handleLogout = async(e) =>{
    setLoading(true);
      e.preventDefault();  
         await axiosPrivate.delete('auth/logout')
          .then((res) => {    
               //navigate back to login  
               navigate('/login') 
               console.log('logged out', res);
               setLoading(false);
               localStorage.clear()
          }).catch(err =>{
            console.log(err || 'couldnt log out')
            setLoading(false)
                  Toast.fire({
                icon: "error",
                title: "Error logging out"
              });
          }) 
  }
    return(
      <div className='drop'> 
        <Link to="/dashboard"><span className='drop__item'>Dashboard</span></Link> 
        <Link to="/profile"><span className='drop__item'>Edit Profile</span> </Link> 
        <span className='drop__item' onClick={handleLogout}>
          {loading ? <span>Logging out...</span> : <span>Log out</span>}
        </span>
      </div>
    )
  }

export default DropDown