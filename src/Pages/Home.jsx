import { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import img3 from '../img/prof.png'
import { account, avatars, databases } from '../Appwriteconfig'
import { toast, ToastContainer } from 'react-toastify';
import bg_img from '../img/egr.jpg'
import bg_img1 from '../img/card.png'
import img1 from '../img/fecaft.png'
import { Helmet } from 'react-helmet-async'
import { FileInput, Select } from 'flowbite-react';
import { FaStar } from "react-icons/fa";
import { MdGppGood } from "react-icons/md";
import Loader from './Loader';

export default function Home() {

  const [userData, setUserData] = useState()
  const [user, setUser] = useState({})
  const [img, setImg] = useState(null);
  const [idFrontImg, setIdFrontImg] = useState(null);
  const [idBackImg, setIdBackImg] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state
  const [pageload, setPageload] = useState(true);  // Page loading state
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
      const getData = async () => {
        const response = await account.get()
        setUserData(response)
      }
      getData()
    }, [])
    

    const Signout = async () => {
      try {
        await account.deleteSession('current');
      } catch (error) {
        toast.error('Logout failed:', error.message);
      }
      window.location.reload();
     };

    useEffect(() => {
  const getUser = async () => {
    try {
      const response = await databases.getDocument(
        "69992c2d003d317ac1df", // database ID
        "users",              // collection ID
        userData.$id          // document ID
      );

      setUser(response); // single document
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  if (userData?.$id) {
    getUser();
  }
}, [userData]);


       const CLOUD_NAME = 'dbub1gaog';
       const UPLOAD_PRESET = 'can_2025';
   
       const uploadImage = async (file) => {
       const formData = new FormData();
       formData.append('file', file);
       formData.append('upload_preset', UPLOAD_PRESET);
   
       try {
           const response = await fetch(
               `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
               {
                   method: 'POST',
                   body: formData,
               }
           );
   
           if (!response.ok) {
               throw new Error('Image upload failed');
           }
   
           const data = await response.json();
           return data.secure_url;
       } catch (err) {
         throw new Error('Failed to upload image: ' + err.message);
        }
      };

      const handleImageChange = async (e) => {
          const file = e.target.files[0];
          if (file) {
              try {
                  setLoading(true);
                  const imageUrl = await uploadImage(file);
                  setImg(imageUrl);
              } catch (err) {
                  toast.error(err.message);
              } finally {
                  setLoading(false);
              }
          }
      };

      const handleIdFrontChange = async (e) => {
         const file = e.target.files[0];
         if (file) {
             try {
                 setLoading(true);
                 const idfrontimg = await uploadImage(file);
                 setIdFrontImg(idfrontimg);
             } catch (err) {
                 toast.error(err.message);
             } finally {
                 setLoading(false);
             }
         }
     };

     const handleIdBackChange = async (e) => {
         const file = e.target.files[0];
         if (file) {
             try {
                 setLoading(true);
                 const idbackimg = await uploadImage(file);
                 setIdBackImg(idbackimg);
             } catch (err) {
                 toast.error(err.message);
             } finally {
                 setLoading(false);
             }
         }
     };

     const handleUpdate = async (e) => {
         e.preventDefault();
         setLoading(true);
     
         const updatedData = {
             fullname: user.fullname,
             email: user.email,
             mailbox: user.mailbox,
             event: user.event,
             company: user.company,
             town_adress: user.town_adress,
             season: user.season,
             department: user.department,
             poste: user.poste,
             id_front: idFrontImg,
             id_back: idBackImg,
             photo: img,
             phone: user.phone,
             submit: user.submit
         };
     
         try {
             // Update blog post document in Appwrite
             await databases.updateDocument(
                 '69992c2d003d317ac1df',
                 'users',
                 userData.$id,
                 updatedData
             );
     
             toast.success('Document Envoyé avec succès!!!');
     
             setTimeout(() => {
                
               }, 5000);
     
         } catch (err) {
             toast.error('Failed: ' + err.message);
         } finally {
             setLoading(false);
         }
     };

     useEffect(() => {
         const timer = setTimeout(() => setPageload(false), 2500);
         return () => clearTimeout(timer);
       }, []);

     if (pageload) return <Loader />;

  if (user.valide === "reject") {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
      
  return (
    <>

    <Helmet>
      <title>
         ACCREDITATION FECAFOOT
      </title>
      <meta name='description' content='The Website for the AFCON 2025 on the soil of Africa' />
    </Helmet>

    <div style={{ 
                     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${bg_img})`
                   }} className='min-h-screen flex flex-col items-center justify-center bg-cover'>
                <ToastContainer />
                <img src={img1} className='w-20 h-24 p-2' />
                <div className='md:grid-cols-2 grid gap-4 pt-8 pb-8 max-w-7xl justify-center mx-auto w-full p-2'>
                  <div className='sm:mt-8 p-4 sm:p-4 mx-auto bg-yellow-300 bg-opacity-75 rounded-xl lg:w-fit w-full h-fit'>
                    { userData ? (
                      <>
                      <div className='flex gap-2 items-center'>
                        <img src={avatars.getInitials(userData.username)} width={60} className='rounded-full text-white border-4 border-white'/>
                        <div className='text-xs'>
                          <p className='text-sm text-white font-medium flex gap-1'>{userData?.name || "Unknown User"} <FaStar color='green' size={16} className='mt-0.5' /></p>
                          <p className='font-medium'>{userData?.email || "No Email"}</p>
                          <p className='font-medium'>{userData?.phone || "Phone No"}</p>
                        </div>
                      </div>
                      <div className='pt-4 mx-4'>
                        <div>
                          <p className='text-lg font-bold text-white'>Accreditation Fecafoot</p>
                          <div className='border-b-4 border-green-400 w-52'></div>
                          <div>
                              {/*
                                <p className='text-sm opacity-70 mx-4'>Accreditation en cours de validation....</p>
                              */}
                              <div className='flex gap-3 items-center mx-2 mt-1'>
                                <p className='font-semibold text-sm'>Matriculation</p>
                                <p className='text-sm text-white font-medium'>{user?.matriculation || "No Matriculation"}</p>
                              </div>
                              <div className='flex gap-3 items-center mx-2'>
                                <p className='font-semibold text-sm'>Fiche</p>
                                <p className='text-sm text-white font-medium'>{user?.department || "No Fiche"}</p>
                              </div>
                              <div className='flex gap-3 items-center mx-2'>
                                <p className='font-semibold text-sm'>Rank</p>
                                <p className='text-sm text-white font-medium'>{user?.rank || "No Rank"}</p>
                              </div>
                              <div className='flex gap-3 items-center mx-2'>
                                <p className='font-semibold text-sm'>Season</p>
                                <p className='text-sm text-white font-medium'>{user?.season || "No Season"}</p>
                              </div>
                          </div>
                            { userData?.labels[0] === 'admin' ? (
                            <p className='text-sm text-center mt-2 text-green-700 font-bold'></p>
                            ) : (
                              <p className='text-sm text-center mt-2 text-green-700 font-bold'>{user?.event || "No Event"}</p>
                            )}
                        </div>
                           { userData?.labels[0] === 'admin' ? (
                            <div>
                              <Link to='/users'>
                              <button className='rounded-full mt-1 bg-green-500 px-2 py-2.5 bg-opacity-70 text-white font-bold sm:w-80 w-full'>
                                Administrateur 
                              </button>
                              </Link>
                            </div>
                           ) : (
                            <div>
                              <p className='font-bold opacity-70 mt-2 mx-4 text-sm'>Document {user?.submit === 'submit' ? 'envoye' : ''}</p>
                              <button className={` ${user?.valide === 'approve' ? 'bg-green-500' : user?.valide === 'reject' ? 'bg-red-500' : 'bg-blue-500 bg-opacity-50'} rounded-full px-2 py-2.5 bg-opacity-70 text-white font-bold sm:w-80 w-full`}>
                                Document {user?.valide === 'approve' ? 'Valide' : user?.valide === 'reject' ? 'Rejete' : user?.submit === 'submit' ? 'En cours de traitement' : ''} 
                              </button>
                            </div>
                           )}

                              {showMessage && (
                                <p className="text-red-500 mt-2 font-bold text-sm">
                                  {user.message}
                                </p>
                              )}
                            
                        </div>
                      </>
                    ) : (
                      <>
                      <div className='px-4 pt-4 sm:w-80'>
                        <img src={img3} width={200} className='mx-auto p-2'/>
                        <p className='text-sm text-blue-500 font-bold text-center'>Pas de Compte</p>
                        <h1 className='text-xl font-bold text-center'>Accreditation Fecafoot</h1>
                        <p className='text-xs text-gray-500 font-semibold text-center mb-1'>Acceder a votre compte Utilisateur</p>
                         <Link to='/login'>
                         <button
                              className='rounded-xl bg-green-500 px-2 py-2.5 text-yellow-300 font-bold w-full'
                              type='submit'>
                              Connecter
                          </button>
                          </Link>
                      </div>
                      </>
                    )}
                  </div>
                  <div>
                    {
                      userData ? (
                        <div style={{ 
                          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${bg_img1})`,
                        }} className='sm:mt-8 bg-cover bg-opacity-10 bg-center p-4 sm:p-8 mx-auto bg-green-300 shadow-xl rounded-xl w-full'>
                          {
                            user.valide === 'reject' || user.submit !== 'submit' ? (
                              <>
                                <div className='px-4 pt-4'>
                                  <h1 className='text-2xl font-bold text-white'>Submit Document</h1>
                                  <div className='border-b-4 border-green-400 w-44'></div>
                                  <h1 className='text-xs text-gray-600 mt-1.5'>Envoi vos document pour l'accreditation</h1>
                                </div>
                                <div className='w-full mx-auto pt-4'>
                                  <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
                                    <div> 
                                      <h1 className='text-sm font-medium text-gray-700'>4x4 Pic</h1>
                                      <FileInput type='file'
                                        accept='image/*'
                                        onChange={handleImageChange} />

                                         {img && (<p className='text-center text-green-500'>Upload Completed</p>)}
                                    </div>
                                    <div> 
                                      <input type='text' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Full Name'
                                        id='fullname' 
                                        name='fullname'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            fullname: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <input type='email' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Email'
                                        id='mailbox' 
                                        name='mailbox'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            mailbox: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <input type='text' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Phone'
                                        id='phone' 
                                        name='phone'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            phone: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <Select
                                        value={user.event}
                                        onChange={(e) =>
                                            setUser({
                                            ...user,
                                            event: e.target.value,
                                            })
                                        }
                                        >
                                        <option value="">
                                            Evenement
                                        </option>
                                        <option value="Cameroun Ballon d'or">Cameroun Ballon d'or</option>
                                        <option value="Championnat Football">Championnat Football</option>
                                        </Select>
                                    </div>
                                    <div>
                                      <h1 className='text-sm font-medium text-gray-700'>Id Card (Front)</h1>
                                     <FileInput type='file'
                                        accept='image/*'
                                        onChange={handleIdFrontChange} />

                                        {idFrontImg && (<p className='text-center text-green-500'>Upload Completed</p>)}
                                    </div>
                                    <div>
                                      <h1 className='text-sm font-medium text-gray-700'>Id Card (Back)</h1>
                                     <FileInput type='file'
                                        accept='image/*'
                                        onChange={handleIdBackChange} />

                                        {idBackImg && (<p className='text-center text-green-500'>Upload Completed</p>)}
                                    </div>
                                    <div> 
                                      <input type='text' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Town Adress'
                                        id='town_adress' 
                                        name='town_adress'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            town_adress: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <input type='text' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Season'
                                        id='season' 
                                        name='season'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            season: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <input type='text' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Company'
                                        id='company' 
                                        name='company'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            company: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <input type='text' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Department'
                                        id='department' 
                                        name='department'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            department: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <input type='text' 
                                      className='rounded-xl border-0 w-full'
                                        placeholder='Poste'
                                        id='poste' 
                                        name='poste'
                                        required 
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            poste: e.target.value
                                          })
                                        }}/>
                                    </div>
                                    <div> 
                                      <select value={user.submit}
                                        onChange={(e) =>
                                            setUser({
                                            ...user,
                                            submit: 'submit',
                                            })}
                                        className='rounded-xl border-0 w-full'>
                                          <option value='submit'>Submit</option>
                                        </select>
                                    </div>
                                    <button
                                     disabled={loading}
                                      className='rounded-xl bg-red-500 px-2 py-2.5 text-yellow-300 font-bold w-full'
                                      type='submit'>
                                      Envoyer
                                    </button>
                                  </form>
                              </div>
                              </>
                            ) : user.valide === 'approve' ? (
                              <>
                              <h1 className=' sm:mx-4 text-xl font-bold text-green-500 flex gap-1'>Accreditation valide <MdGppGood size={16} className='mt-1.5' /> </h1>
                              <div className='sm:mx-4 border-b-4 border-yellow-300 mb-2 w-56'></div>
                                <div className='flex gap-2 w-full items-center'>
                                  <img src={img3} width={60} className=''/>
                                  <div className='text-xs'>
                                    <p className='text-sm text-white font-medium flex gap-1'>{user?.fullname} <FaStar color='green' size={16} className='mt-0.5' /></p>
                                    <p className='font-medium'>{user?.email}</p>
                                    <p className='font-medium text-blue-500'>{user?.company}</p>
                                  </div>
                                </div>
                          <div className='pt-4 w-full'>
                            <div>
                              <div>
                                  {/*
                                    <p className='text-sm opacity-70 mx-4'>Accreditation en cours de validation....</p>
                                  */}
                                  <div className='flex gap-3 items-center mx-2 mt-1'>
                                    <p className='font-semibold text-sm'>Matriculation</p>
                                    <p className='text-sm text-white font-medium'>{user?.matriculation}</p>
                                  </div>
                                  <div className='flex gap-3 items-center mx-2'>
                                    <p className='font-semibold text-sm'>Fiche</p>
                                    <p className='text-sm text-white font-medium'>{user?.department}</p>
                                  </div>
                                  <div className='flex gap-3 items-center mx-2'>
                                    <p className='font-semibold text-sm'>Rank</p>
                                    <p className='text-sm text-white font-medium'>{user?.rank}</p>
                                  </div>
                                  <div className='flex gap-3 items-center mx-2'>
                                    <p className='font-semibold text-sm'>Season</p>
                                    <p className='text-sm text-white font-medium'>{user?.season}</p>
                                  </div>
                              </div>
                                <p className='text-sm text-center mt-2 text-green-700 font-bold'>{user?.event}</p>
                                  <div className='mx-2'>
                                    <p className='text-xs text-white font-bold uppercase'>{user?.poste}</p>
                                    <p className='text-xs text-gray-400 font-bold uppercase'>{user?.town_address}</p>
                                  </div>
                            </div>
                                <div>
                                  <button className='rounded-full uppercase bg-green-500 px-2 py-2.5 bg-opacity-70 text-white font-bold  w-full'>
                                    Passe par tout 
                                  </button>
                                </div>
                            </div>
                              </>
                            ) : user.submit === 'submit' && (
                               <div className='sm:mt-8 bg-center flex justify-center items-center p-2 sm:p-8 mx-auto shadow-xl rounded-xl h-80 w-full'>
                             <h1 className='text-center text-white w-40 font-bold text-md'>Document Envoye en cour de traitement....</h1>
                              </div>
                            )
                          }
                          {/* right */}
                        </div>
                      ) : (
                       <div className='sm:mt-8 bg-white bg-opacity-40 bg-center flex justify-center items-center p-2 sm:p-8 mx-auto shadow-xl rounded-xl h-80 w-full'>
                             <h1 className='text-center text-red-500 w-40 font-bold text-xl'>Aucun Access au Information....</h1>
                              </div>
                      )}
                  </div>
                </div>
                {
                  userData && (
                  <button className='rounded-xl bg-red-700 px-16 py-2.5 m-4 text-white font-bold w-fit' onClick={Signout}>
                    Se Deconnecter
                  </button>
                  )
                }
          </div>
    </>
  )
}

