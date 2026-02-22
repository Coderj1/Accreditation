import { motion } from 'framer-motion';
import { useEffect, useState } from 'react'
import { databases } from '../Appwriteconfig'
import { Query } from 'appwrite'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom';

export default function Profile() {

  const [users, setUsers] = useState([])

  useEffect(() => {
        const getUsers = async () => {
          try {
            const response = await databases.listDocuments(
              '69992c2d003d317ac1df',
              'users',
              [
                Query.orderDesc('$createdAt'),
                Query.limit(1000)
              ]
            );
            setUsers(response.documents); // Returns an array of documents
          } catch (error) {
            console.error("Error fetching collection:", error);
          }
        }
        getUsers();
      }, []);

      const SubmitUser = users.filter(
            (user) => user.submit === "submit"
            );

      const ApprovedUser = users.filter(
            (user) => user.valide === "approve"
            );

      const RejectedUser = users.filter(
            (user) => user.valide === "reject"
            );

  return (
    <>
        <Helmet>
             <title>
                ADMIN | PROFILE
             </title>
        </Helmet>

     <div className='min-h-screen m-4'>
      <div className='m-2'>
        <h1 className='text-xl font-bold text-black'>Document Deposer</h1>
        <div className='border-b-4 border-green-400 w-36'></div>
      </div>
       <motion.div className='flex flex-wrap gap-4'>
         {
            SubmitUser.map((user) => (
              <div key={user.$id} className='bg-yellow-300 sm:w-80 w-full bg-opacity-50 rounded-xl p-4'>
               <div className='flex justify-between gap-2'>
                <div>
                  <h1 className='text-xl font-bold text-gray-700'>{user.username}</h1>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                  <p className='text-sm text-gray-500'>{user.phone}</p>
                  <p className='text-xs text-green-500 font-bold'>Document submited</p>
                </div>
                <Link to={`/updateuser/${user.$id}`}>
                  <button className='bg-white bg-opacity-8 text-green-400 px-2 h-10 mt-4 rounded-xl text-sm'>
                    Document
                  </button>
                </Link>
               </div>
              </div>
             )
            )}
       </motion.div>
       <div className='m-2'>
        <h1 className='text-xl font-bold text-black'>Utilisateur Accredite</h1>
        <div className='border-b-4 border-green-400 w-36'></div>
      </div>
       <motion.div className='flex flex-wrap gap-4'>
         {
            ApprovedUser.map((user) => (
              <div key={user.$id} className='bg-yellow-300 sm:w-80 w-full bg-opacity-50 rounded-xl p-4'>
               <div className='flex justify-between gap-2'>
                <div>
                  <h1 className='text-xl font-bold text-gray-700'>{user.username}</h1>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                  <p className='text-sm text-gray-500'>{user.phone}</p>
                  <p className='text-xs text-green-500 font-bold'>Accreditation Valide</p>
                </div>
                <Link to={`/updateuser/${user.$id}`}>
                  <button className='bg-white bg-opacity-8 text-green-400 px-2 h-10 mt-4 rounded-xl text-sm'>
                    Document
                  </button>
                </Link>
               </div>
              </div>
             )
            )}
       </motion.div>
       <div className='m-2'>
        <h1 className='text-xl font-bold text-black'>Utilisateur Rejete</h1>
        <div className='border-b-4 border-green-400 w-36'></div>
      </div>
       <motion.div className='flex flex-wrap gap-4'>
         {
            RejectedUser.map((user) => (
              <div key={user.$id} className='bg-yellow-300 sm:w-80 w-full bg-opacity-50 rounded-xl p-4'>
               <div className='flex justify-between gap-2'>
                <div>
                  <h1 className='text-xl font-bold text-gray-700'>{user.username}</h1>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                  <p className='text-sm text-gray-500'>{user.phone}</p>
                  <p className='text-xs text-red-500 font-bold'>Document Rejected</p>
                </div>
                <Link to={`/updateuser/${user.$id}`}>
                  <button className='bg-white bg-opacity-8 text-green-400 px-2 h-10 mt-4 rounded-xl text-sm'>
                    Document
                  </button>
                </Link>
               </div>
              </div>
             )
            )}
       </motion.div>
       <div className='m-2'>
        <h1 className='text-xl font-bold text-black'>Vos utilisateur</h1>
        <div className='border-b-4 border-green-400 w-36'></div>
      </div>
       <motion.div className='flex flex-wrap gap-4'>
         {
            users.map((user) => (
              <div key={user.$id} className='bg-yellow-300 sm:w-80 w-full bg-opacity-50 rounded-xl p-4'>
               <div className='flex justify-between gap-2'>
                <div>
                  <h1 className='text-xl font-bold text-gray-700'>{user.username}</h1>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                  <p className='text-sm text-gray-500'>{user.phone}</p>
                  <p className='text-xs text-green-500 font-bold'>Document submited</p>
                </div>
                <Link to={`/updateuser/${user.$id}`}>
                  <button className='bg-white bg-opacity-8 text-green-400 px-2 h-10 mt-4 rounded-xl text-sm'>
                    Document
                  </button>
                </Link>
               </div>
              </div>
             )
            )}
       </motion.div>
     </div>
    </>
  )
}
