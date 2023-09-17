import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MoneyImg from '../assets/money.svg';
import {At, Money, TextAa, TrashSimple} from '@phosphor-icons/react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

require('../styles/pages/home.css');

const Home = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [history, setHistory] = useState([]);

    const [tmpLabel, setTmpLabel] = useState('');
    const [tmpAmount, setTmpAmount] = useState('');
    
    const getToken = () => {
        if (localStorage.getItem('token') === null) {
            return window.location.href="/";
        }
        return null;
    }
    
    function getUserData(){
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
            getUserHistory();
        })
        .catch(
            err => console.log(err)
        )
    }
    
    function getUserHistory(){
        let token = localStorage.getItem('token');
        axios.get('http://localhost:3000/api/history/getHistory', {
            headers: {
                'auth-token': token
            }
        })
        .then(res => {
            setHistory(res.data);
        })
        .catch(
            err => console.log(err)
        )
    }

    function deleteHistory(id) {
        let token = localStorage.getItem('token');
        axios.delete("http://localhost:3000/api/history/removeHistory/" + id, {
            headers: {
                'auth-token': token
            }
        })
        .then(res => {
            console.log("Item deleted !");
            getUserHistory();
        })
        .catch(
            err => console.log(err)
        )
    }

    function addHistory() {
        let token = localStorage.getItem('token');
        axios.post("http://localhost:3000/api/history/addHistory", {
            label: tmpLabel,
            amount: tmpAmount,
        }, {
            headers: {
                'auth-token': token
            }
        })
       .then(res => {
            console.log("Item added!");
            getUserHistory();
            setTmpAmount("");
            setTmpLabel("");
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
        getUserData();
    }, [])
    
    return (
        <div className="flex justify-center items-center bg-[#1B1D21] h-full w-full">
            <div className='w-96 lg:w-[1500px] md:w-96 sm:w-96 h-[700px] bg-[#E9E9E9] flex flex-row justify-between p-2.5 rounded-[30px]'>
                <div className='w-3/5 justify-center items-center lg:flex md:hidden sm:hidden hidden'>
                    <img src={MoneyImg} alt='Money logo' className='w-4/5'/>
                </div>                
                <div className='w-96 lg:w-2/5 bg-[white] rounded-[20px]'>
                    <div className='flex flex-row justify-between py-2.5 px-3.5 border-b-2 border-[#E9E9E9]'>
                        <div className='flex flex-col'>
                            <p>Name : <span className='font-bold'>{name}</span></p>
                            <p>Email : <span className='font-bold'>{email}</span></p>
                        </div>
                        <Button variant="outlined" color='danger' onClick={logOff}>Log off</Button>
                    </div>
                    <div className='flex justify-center'>
                        <FormControl className="w-80 py-5">
                            <FormLabel>Label :</FormLabel>
                            <Input
                                value={tmpLabel}
                                onChange={e => setTmpLabel(e.target.value)}
                                startDecorator={<TextAa size={25} weight="fill" />}
                                slotProps={{ input: { placeholder: 'Label', type: 'text' } }}
                                className="mb-3"
                                required
                            />
                            <FormLabel>Amount :</FormLabel>
                            <Input
                                value={tmpAmount}
                                onChange={e => setTmpAmount(e.target.value)}
                                startDecorator={<Money size={25} weight="fill" />}
                                slotProps={{ input: { placeholder: 'Amount', type: 'number' } }}
                                className="mb-3"
                                required
                            />
                            <Button type="submit" onClick={addHistory}>Add</Button>
                        </FormControl>
                    </div>
                    <div className='text-4xl py-5 flex flex-col justify-center items-center px-10'>
                        <table class="text-sm w-full">
                            <thead>
                                <tr className='border-b-2'>
                                    <th className='text-left'>Label</th>
                                    <th className='w-32'>Amount</th>
                                    <th className='w-10'></th>
                                </tr>
                            </thead>
                            <tbody className='overflow-y-scroll'>
                                {history.map((item) => (
                                    <tr className='border-b-2' key={item._id}>
                                        <th className='text-left'>{item.label}</th>
                                        <th className=''>{
                                            0 > item.amount?
                                            (<span className='bg-red-300 rounded-full px-3 py-1'>{item.amount}</span>) :
                                            (<span className='bg-lime-300 rounded-full px-3 py-1'>+{item.amount}</span>)
                                        }</th>
                                        <th className='flex justify-center p-1'>
                                            <button onClick={() => deleteHistory(item._id)} className='text-red-500'><TrashSimple size={32} weight="fill" /></button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
    export default Home;
    