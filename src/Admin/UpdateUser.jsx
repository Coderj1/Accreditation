import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { account, databases } from '../Appwriteconfig'
import { Button, FileInput, Select, Textarea, TextInput } from 'flowbite-react'
import { customAlphabet } from "nanoid";
import { toast, ToastContainer } from 'react-toastify'
import logo from '../img/acess denied.png'

export default function UpdateUser() {

    const navigate = useNavigate()

    const {userId} = useParams()

    const [image, setImg] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state
    const [userData, setUserData] = useState()
    const [userdetail, setUserdetail] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

    useEffect(() => {
        const getUserdetail = async () => {
            try {
              const response = await databases.getDocument(
                '69992c2d003d317ac1df',
                'users',
                userId // Replace with your Document ID
              );
              setUserdetail(response); // Returns an array of document
      
            } catch (error) {
              console.error("Error fetching collection:", error);
            }
          }
          if(userId) {
            getUserdetail();
          }
        }, [userId]);
  
     const generateMatricule = () => {
        const year = new Date().getFullYear();

        // numbers only
        const nanoid = customAlphabet("ABCDEFGH0123456789", 6);
        const randomNumber = nanoid();

        return `FECAFOOT-${year}-${randomNumber}`;
};

const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
        rank: userdetail.rank,
        matricule: userdetail.matricule === null ? generateMatricule() : userdetail.matricule,
        valide: userdetail.valide,
        message: userdetail.message
    };

    try {
        // Update blog post document in Appwrite
        await databases.updateDocument(
            '69992c2d003d317ac1df',
            'users',
            userId,
            updatedData
        );

        toast.success('Utilisateur Updated successfully!!!');

        setTimeout(() => {
            navigate('/users')
          }, 5000);

    } catch (err) {
        toast.error('Failed: ' + err.message);
    } finally {
        setLoading(false);
    }
};


  return (
    <>
        { userData?.labels[0] === 'admin' ? (
            <div className='sm:mt-16 p-3 max-w-6xl mx-auto flex-1 w-full'>
                <ToastContainer />
                <h1 className='text-center text-3xl my-7 font-semibold'>
                Valide Utilisateur
                </h1>
                <div className='p-4 flex flex-wrap gap-4 justify-between'>
                        <span>
                            <h1 className='text-2xl font-bold'>Full Name</h1>
                            <p className='line-clamp-2'>{userdetail?.fullname}</p>
                        </span>
                   <span>
                        <h1 className='text-2xl font-bold'>Boite Mail</h1>
                        <p className='line-clamp-2'>{userdetail?.mailbox}</p>
                    </span>
                    <span>
                        <h1 className='text-2xl font-bold'>Numero</h1>
                        <p className='line-clamp-2'>{userdetail?.phone}</p>
                    </span>
                    <span className=''>
                        <h1 className='text-2xl font-bold'>Entreprise</h1>
                        <p className='line-clamp-3'>{userdetail?.company}</p>
                    </span>
                    <span className=''>
                        <h1 className='text-2xl font-bold'>Department</h1>
                        <p className='line-clamp-3'>{userdetail?.department}</p>
                    </span>
                    <span className=''>
                        <h1 className='text-2xl font-bold'>Poste</h1>
                        <p className='line-clamp-3'>{userdetail?.poste}</p>
                    </span>
                    <span className=''>
                        <h1 className='text-2xl font-bold'>Address Ville</h1>
                        <p className='line-clamp-3'>{userdetail?.town_adress}</p>
                    </span>
                    <span className='w-80'>
                        <h1 className='text-2xl font-bold'>Evenement</h1>
                        <p className='line-clamp-3'>{userdetail?.event}</p>
                    </span>
                    <span>
                        <h1 className='text-2xl font-bold'>Season</h1>
                        <p className='line-clamp-2'>{userdetail?.season}</p>
                    </span>
                    <span>
                        <h1 className='text-2xl font-bold'>4x4 Photo</h1>
                        <img src={userdetail?.photo} alt="" width={100} />
                    </span>
                    <span>
                        <h1 className='text-2xl font-bold'>CNI Avant</h1>
                        <img src={userdetail?.id_front} alt="" width={100} />
                    </span>
                    <span>
                        <h1 className='text-2xl font-bold'>CNI Arreire</h1>
                        <img src={userdetail?.id_back} alt="" width={100} />
                    </span>
                </div>
                <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
                  <div> 
                   <Select
                    value={userdetail.rank}
                    onChange={(e) =>
                        setUserdetail({
                        ...userdetail,
                        rank: e.target.value,
                        })
                    }
                    >
                    <option value="">
                        Rank
                    </option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                    </Select>
                </div>
                <div> 
                   <Select
                    value={userdetail.valide}
                    onChange={(e) =>
                        setUserdetail({
                        ...userdetail,
                        valide: e.target.value,
                        })
                    }
                    >
                    <option value="">
                        Status
                    </option>
                    <option value="approve">Valide</option>
                    <option value="reject">Rejete</option>
                    <option value="delete">Supprime</option>
                    </Select>
                </div>
                <Textarea type='text'
                    placeholder='Message'
                    className='mb-3'
                    value={userdetail.message}
                    onChange={(e) => setUserdetail({...userdetail, message: e.target.value})}
                />
                <Button type='submit' gradientDuoTone='purpleToPink' outline disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </Button>
                </form>
            </div>
        ) : (
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-center min-h-screen'>
            <img src={logo} alt="" className='w-80'/>
            <h1 className='text-2xl font-bold'>Access Denied</h1>
          </div>
        )}
    </>
  )
}
