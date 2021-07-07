import React from 'react'
import '../login/login.css'


const UserPage = ({username,setIsAuth,setAuthToken,setEmail,setPassword}) =>{

    const handleLogOut = () =>{
        setIsAuth(false)
        setAuthToken('')
        setEmail('')
        setPassword('')

    }

    return(<><div className='user'>
        <span>Имя пользователя:<b>{username}</b></span>
    </div>
    <button onClick={handleLogOut} className='logout'>Sign Out</button>
    </>)
}

export default UserPage