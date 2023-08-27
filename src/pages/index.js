import { Inter } from 'next/font/google'
import { deleteUser, editUser, getUsers } from './api/users/userApiRoutes';
import UserForm from '@/components/userForm';
import { useState } from 'react';
import { Edit, Trash } from 'react-feather';
import { toast, Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ users }) {
    const [allUsers, setAllUsers] = useState(users);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [street, setStreet] = useState("");
    const [userId, setUserId] = useState("");
    const [createLoading, setCreateLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const handleDelete = async (id) => {
        const res = await deleteUser({ id })
        .then((response) => {
            toast.success("User deleted");
            const updatedUsers = allUsers.filter(user => user.id !== id);
            setAllUsers(updatedUsers)
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }

    const handleEdit = async () => {
        const address = {};
        const company = {};
        address.street = street;
        company.name = companyName;
        setEditLoading(true);
        const res = await editUser({ id: userId, userData: { name, username, email, address, company, phone, }})
        .then((response) => {
            console.log(response);
            const updatedUsers = allUsers.map(user => {
                if (user.id === userId) {
                  return { ...user, ...response };
                }
                return user;
            });
            setEditLoading(false);
            setAllUsers(updatedUsers);
            setShowModal(false);
            toast.success("User edited");
        })
        .catch((error) => {
            toast.error(error.message);
            setEditLoading(false);
        });
    }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between py-24 ${inter.className}`}>
        <UserForm setAllUsers={setAllUsers} allUsers={allUsers} setCreateLoading={setCreateLoading} createLoading={createLoading} />
        <Toaster />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Company Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Street
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, index) => 
                    <tr key={index} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {user?.name}
                        </th>
                        <td className="px-6 py-4">
                            {user?.username}
                        </td>
                        <td className="px-6 py-4">
                            {user?.email}
                        </td>
                        <td className="px-6 py-4">
                            {user?.phone}
                        </td>
                        <td className="px-6 py-4">
                            {user?.company?.name}
                        </td>
                        <td className="px-6 py-4">
                            {user?.address?.street}
                        </td>
                        <td className="px-6 py-4 flex flex-row gap-2">
                            <Edit onClick={() => { setUserId(user.id); setName(user.name); setUsername(user.username); setEmail(user.email); setPhone(user.phone); setCompanyName(user.company.name); setStreet(user.address.street); setShowModal(true); }} className='cursor-pointer' />
                            <Trash onClick={() => handleDelete(user?.id)} className='cursor-pointer' />
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>

        {showModal &&
        <>
        <div className="flex overflow-x-hidden w-full overflow-y-auto fixed inset-0 z-[1002] outline-none focus:outline-none">
            <div className='flex justify-center overflow-y-auto items-center  mx-auto my-auto'>
                <div className='flex flex-col items-center my-4 bg-[#FFFFFF] gap-4 w-[554px] rounded-lg'>
                    <div className="w-full py-11 p-4">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4'>
                            <div className="mb-4">
                                <label htmlFor='name' className=" createFormLabels block text-sm mb-2">
                                    Name
                                </label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded w-full py-2 px-3" id="name" type="text" />
                            </div>
                            <div className="">
                                <label htmlFor='username' className=" createFormLabels block text-sm mb-2">
                                    Username
                                </label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} className="border rounded w-full py-2 px-3" id="username" type="text" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='phone' className=" createFormLabels block text-sm mb-2">
                                    Phone
                                </label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded w-full py-2 px-3" id="phone" type="text" />
                            </div>
                            <div className="">
                                <label htmlFor='email' className=" createFormLabels block text-sm mb-2">
                                    Email
                                </label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded w-full py-2 px-3" id="email" type="text" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='companyName' className=" createFormLabels block text-sm mb-2">
                                    Company name
                                </label>
                                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border rounded w-full py-2 px-3" id="companyName" type="text" />
                            </div>
                            <div className="">
                                <label htmlFor='street' className=" createFormLabels block text-sm mb-2">
                                    Street
                                </label>
                                <input value={street} onChange={(e) => setStreet(e.target.value)} className="border rounded w-full py-2 px-3" id="street" type="text" />
                            </div>
                        </div>
                        <div className="px-4 mt-4 flex flex-col justify-center items-center">
                            <button onClick={() => handleEdit()} className='flex justify-center items-center cursor-pointer w-[100px] py-1 mb-3 bg-[#CBD2E0] rounded-[20px]'>
                            {editLoading &&
                            <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>}
                                Save
                            </button>
                            <div onClick={() => setShowModal(false)} className='flex justify-center cursor-pointer items-center w-[100px] py-1 border rounded-[20px]'>Cancel</div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div className="opacity-25 fixed inset-0 z-[1001] bg-black"></div>
        </>}
    </main>
  )
}

export const getServerSideProps = async () => {
    const users = await getUsers();
    return { props: { users }, };
};