import React, { useEffect, useState } from 'react'
 
import { useNavigate } from 'react-router-dom';

const Index = () => {

    const [user, setUser] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
         
        const token = localStorage.getItem('token')

        if(!token){ 

        }else{

              
        }

    },[])

   

    console.log(user)
    return (
    <div></div>
  )
}

export default Index