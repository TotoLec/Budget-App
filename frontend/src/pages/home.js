import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MoneyImg from '../assets/money.svg';

require('../styles/pages/home.css');

const Home = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');

    const getToken = () => {
        if (localStorage.getItem('token') === null) {
            return window.location.href="/";
        }
        return null;
    }

    function getData(){
        let token = localStorage.getItem('token');
        axios.get('http://localhost:3000/api/user/getUser', {
            headers: {
                'auth-token': token
            }
        })
        .then(res => {
            setName(res.data.name);
            setEmail(res.data.email);
            setDate(res.data.date);
        })
        .catch(
            err => console.log(err)
        )

    }

    function logOff(){
        localStorage.removeItem('token');
        window.location.href="/";
    }

    useEffect(()=>{
        getToken();
        getData();
    }, [])

    return (
        <div className="flex justify-center items-center bg-[#1B1D21] h-full w-full">
            <div className='w-96 lg:w-[1000px] md:w-96 sm:w-96 h-[700px] bg-[#E9E9E9] flex flex-row justify-between p-2.5 rounded-[30px]'>
                <div className='w-3/5 justify-center items-center lg:flex md:hidden sm:hidden hidden'>
                    <img src={MoneyImg} alt='Mnoey logo' className='w-4/5'/>
                </div>                
                <div className='w-96 bg-[white] rounded-[20px]'>
                    <div className='flex flex-row justify-between p-2.5 border-b-2 border-[#E9E9E9]'>
                        <div className='flex flex-col'>
                            <p>Name : <span className='font-bold'>{name}</span></p>
                            <p>Email : <span className='font-bold'>{email}</span></p>
                        </div>
                        <Button variant="outlined" color='danger' onClick={logOff}>Log off</Button>
                    </div>
                    <div className='text-4xl py-48 flex flex-col justify-center items-center'>
                        <h1>Home Page</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Home;
    