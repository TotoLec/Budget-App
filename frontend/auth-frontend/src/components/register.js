import { At, Key, User, UserCircle } from "@phosphor-icons/react";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Alert from '@mui/joy/Alert';
import { useState } from "react";
import axios from "axios";


require('../styles/components/register.css');



const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function sendData(e) {
        e.preventDefault();      
        axios.post('http://localhost:3000/api/user/register', {
            name: {name}.name,
            email: {email}.email,
            password: {password}.password   
          })
          .then(function (response) {
            let token = response.data;
            localStorage.setItem('token', JSON.stringify(token));
            window.location.href="/home";
          })
          .catch(function (error) {
            console.log(error.response.data);
            setMessage(error.response.data)

          });
    };

    function redirectLogin(){
        window.location.href = "/";
    }

    return (
        <div className="auth-register-container">
            <UserCircle size={64} class="my-8"/>
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 mb-8">Please enter your details</p>
            <form>
                <FormControl>
                    <FormLabel>Name :</FormLabel>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        startDecorator={<User weight="fill"/>}
                        slotProps={{ input: { placeholder: 'Name', type: 'string' } }}
                        className="mb-3"
                        required
                    />
                    {message === '"name" length must be at least 6 characters long' ? (
                        <Alert
                            variant="outlined"
                            color="danger"
                            className="mb-3"
                        >
                        Name length must be at least 6 characters long!
                        </Alert>
                    ): null}

                    <FormLabel>Email :</FormLabel>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        startDecorator={<At weight="fill"/>}
                        slotProps={{ input: { placeholder: 'Email', type: 'email' } }}
                        className="mb-3"
                        required
                    />
                    {message === "Email already exist" ? (
                        <Alert
                            variant="outlined"
                            color="danger"
                            className="mb-3"
                        >
                        {message}
                        </Alert>
                    ): null}
                    {message === '"email" must be a valid email' ? (
                        <Alert
                            variant="outlined"
                            color="danger"
                            className="mb-3"
                        >
                        Must be a valid email!
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
                    {message === '"password" length must be at least 6 characters long' ? (
                        <Alert
                            variant="outlined"
                            color="danger"
                            className="mb-3"
                        >
                        The password length must be at least 6 characters long!
                        </Alert>
                    ): null}

                    <Button type="submit" onClick={sendData}>Sign up</Button>
                    <p className="text-xs text-center mt-12">I already have an account! <span className="font-bold hover:underline cursor-pointer" onClick={redirectLogin}>Log in</span></p>
                </FormControl>
            </form>
        </div>
    )
}
    
export default Register;
    