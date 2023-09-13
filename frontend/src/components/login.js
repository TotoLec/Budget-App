// https://dribbble.com/shots/21953371-WeStud-Creative-Log-In-For-The-Educational-Platform

import { At, Key, UserCircle } from "@phosphor-icons/react";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Alert from '@mui/joy/Alert';
import { useEffect, useState } from "react";
import axios from 'axios';

require('../styles/components/login.css');

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function sendData(e) {
        e.preventDefault();        
        axios.post('http://localhost:3000/api/user/login', {
            email: {email}.email,
            password: {password}.password   
          })
          .then(function (response) {
            let token = response.data;
            localStorage.setItem('token', JSON.stringify(token));
            window.location.href="/home";
          })
          .catch(function (error) {
            setMessage(error.response.data)

          });
    };

    const getToken = () => {
        if (localStorage.getItem('token') !== null) {
            return window.location.href="/home";
        }
        return null;
    }

    function redirectRegister(){
        window.location.href="/register";
    }
    
    useEffect(()=>{
        getToken();
    }, [])

    

    return (
        <div className="auth-login-container">
            <UserCircle size={64} className="my-12"/>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="mt-2 mb-12">Please enter your details</p>
            <form>
                <FormControl>
                    <FormLabel>Email :</FormLabel>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        startDecorator={<At weight="fill"/>}
                        slotProps={{ input: { placeholder: 'Email', type: 'email' } }}
                        className="mb-3"
                        required
                    />
                    {message === "Email doesn't exist" ? (
                        <Alert
                            variant="outlined"
                            color="danger"
                            className="mb-3"
                        >
                        {message}
                        </Alert>
                    ): null}
                    

                    <FormLabel>Password :</FormLabel>
                    <Input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        startDecorator={<Key weight="fill" />}
                        slotProps={{ input: { placeholder: 'Password', type: 'password' } }}
                        className="mb-6"
                        required 
                    />
                    {message === "Invalid Password" ? (
                        <Alert
                            variant="outlined"
                            color="danger"
                            className="mb-3"
                        >
                        {message}
                        </Alert>
                    ): null}
                    <Button type="submit" onClick={sendData}>Log in</Button>
                    <p className="text-xs text-center mt-32">Don't have an account? <span className="font-bold hover:underline cursor-pointer" onClick={redirectRegister}>Sign up</span></p>
                </FormControl>
            </form>
        </div>
    )
}
    
export default Login;
    