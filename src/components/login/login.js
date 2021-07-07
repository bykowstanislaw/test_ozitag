import React,{useState,useEffect} from 'react'
import './login.css'
import UserPage from '../userpage/userpage'


const Login = () => {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[authToken,setAuthToken]=useState('')
    const[isAuth,setIsAuth]=useState(false)
    const [username,setUsername]=useState('')
    const [error,setError]=useState('')

    const handleEmail= (e)=>{
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }


    const handleSignIn = async () => {
        const url = 'https://tager.dev.ozitag.com//api/auth/user ';
        const data = {
            clientId:1,
            email: email,
            password: password
        };
        
        try {
            const response = await fetch(url, {
                host: 'https://tager.dev.ozitag.com/',
                method: 'POST', 
                body: JSON.stringify(data), 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                
            });
            const json = await response.json();
            if(response.ok){
                setAuthToken(json.data.accessToken)
                console.log('Успех:', JSON.stringify(json));
                setError('')
            }
            else{
                setError(json.message)
            }
               
            
            
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(()=>{
        
    const handlePage = async() =>{
        const url='https://tager.dev.ozitag.com/api/tager/user/profile/'
        try {
            const response = await fetch(url, {
                method: 'GET', 
                 headers: {
                    "Authorization": 'Bearer '+authToken,
                    'Accept': 'application/json'
                }
            
            });
            const json = await response.json();
            setIsAuth(true)
            setUsername(json.data.name)
        }catch(error){
            console.error(error)
        }

    }
    if(authToken){
    handlePage()
    }
    },[authToken])

    return (<>{
        (!isAuth)?
        <div className='container'>
            <div>
                <div className="sign">E-mail</div>
                <input onChange={handleEmail} id="email" name="email"></input>
            </div>
            <div>
                <div className="sign">Password</div>
                <input onChange={handlePassword} id="password" name="password" type="password"></input>
            </div>
            {(error) && <div className="error">{error}</div>}
            <div> <button type="submit" onClick={handleSignIn} >Submit</button></div>
            </div>
          :
        <div>
        <UserPage username={username} setAuthToken={setAuthToken} setEmail={setEmail} setPassword={setPassword} setIsAuth={setIsAuth}/>
        </div>
}
    </>
    )
}

export default Login