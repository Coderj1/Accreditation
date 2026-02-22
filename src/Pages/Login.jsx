import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import img2 from '../img/acrre.png'
import img3 from '../img/prop.png'
import { account } from '../Appwriteconfig'
import { toast, ToastContainer } from 'react-toastify';
import bg_img from '../img/bkgrd.png'

function Login() {

  const [activeTab, setActiveTab] = useState('sign_in');

   const navigate = useNavigate()
   const [user, setUser] = useState({
        email: "",
        password: ""
   })

   const Login = async (e) => {
     e.preventDefault()

     try {
      await account.createEmailPasswordSession(user.email, user.password);
      navigate("/")
      window.location.reload();
      } catch (error) {
         console.log(error)
         toast.error("Login Failed..........")
      }
     }

    return (
      <div style={{ backgroundImage: `url(${bg_img})` }} className='min-h-screen flex items-center justify-center bg-cover'>
            <ToastContainer />
            <div className='md:grid-cols-2 grid grid-cols-1 gap-4 pt-20 mx-auto sm:w-fit w-full p-2'>
              <div className='sm:mt-16 p-4 sm:p-8 mx-auto bg-white bg-opacity-55 rounded-xl w-full'>
                <img src={img2} width={250} className='sm:w-80 mx-auto'/>
                <img src={img3} width={250} className='sm:w-80 mx-auto'/>
                
              </div>
              <div className='sm:mt-16 p-4 sm:p-8 mx-auto bg-white bg-opacity-55 rounded-xl w-full'>
                {/* right */}
                <div className='px-4 pt-4'>
                   <h1 className='text-2xl font-bold text-white'>Accéder à mon compte</h1>
                   <div className='border-b-4 border-green-400 w-52'></div>
                   <h1 className='text-xs text-gray-600 mt-1.5'>Accédez au site avec un compte</h1>
                </div>
                <div className='sm:w-80 w-full mx-auto pt-4'>
                  <form className='flex flex-col gap-4'>
                    <div> 
                       <input type='email' 
                      className='rounded-xl sm:w-80 w-full bg-transparent'
                        placeholder='Email'
                        id='email' 
                        name='email'
                        required 
                        onChange={(e) => {
                          setUser({
                            ...user,
                            email: e.target.value
                          })
                        }}/>
                    </div>
                    <div> 
                       <input type='password' 
                      className='rounded-xl sm:w-80 w-full bg-transparent'
                        placeholder='********'
                        id='password' 
                        name='password'
                        required 
                        onChange={(e) => {
                          setUser({
                            ...user,
                            password: e.target.value
                          })
                        }}/>
                    </div>
                    <button
                    className='rounded-xl bg-green-500 px-2 py-2.5 text-yellow-300 font-bold sm:w-80 w-full'
                    onClick={Login}
                    gradientDuoTone='purpleToPink' 
                    type='submit'>
                    Connecter
                    </button>
                  </form>
                  <div className="max-w-[290px] mx-auto p-2">
                    <div className="flex justify-between bg-white shadow-md rounded-xl overflow-hidden">
                      <Link to='/register'>
                      <div
                        onClick={() => setActiveTab('sign_up')}
                        className={`px-8 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                          activeTab === 'sign_up'
                            ? 'bg-blue-500 text-white scale-105 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        S’inscrire
                      </div>
                      </Link>
                      <div
                        onClick={() => setActiveTab('sign_in')}
                        className={`px-8 py-2 text-sm font-medium cursor-pointer transition-all duration-300 ${
                          activeTab === 'sign_in'
                            ? 'bg-green-500 text-white scale-105 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Se connecter
                      </div>
                    </div>
                  </div>
               </div>
              </div>
            </div>
      </div>
    )
  }

export default Login