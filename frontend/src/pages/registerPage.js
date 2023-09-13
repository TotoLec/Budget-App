import AuthSignInImg from '../assets/auth_register.svg';
import Register from '../components/register';

const RegisterPage = () => {
    return (
        <div className="flex justify-center items-center bg-[#1B1D21] h-full w-full">
            <div className='w-96 lg:w-[1000px] md:w-96 sm:w-96 h-[700px] bg-[#E9E9E9] flex flex-row justify-between p-2.5 rounded-[30px]'>
                <div className='w-3/5 justify-center items-center lg:flex md:hidden sm:hidden hidden'>
                    <img src={AuthSignInImg} alt='Auth logo' className='w-4/5 drop-shadow-xl'/>
                </div>
                <div className='w-96 bg-[white] rounded-[20px]'>
                    <Register />
                </div>
            </div>
        </div>
    )
}
    
export default RegisterPage;
    