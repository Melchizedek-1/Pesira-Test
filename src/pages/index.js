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
        const res = await editUser({ id: userId, userData: {
            name,
            username,
            email,
            address,
            company,
            phone,
        } })
        .then((response) => {
            console.log(response);
            const updatedUsers = allUsers.map(user => {
                if (user.id === userId) {
                  return { ...user, ...response };
                }
                return user;
            });
            setAllUsers(updatedUsers);
            setShowModal(false);
            toast.success("User edited");
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between py-24 ${inter.className}`}>
        <UserForm setAllUsers={setAllUsers} allUsers={allUsers} />
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
                            <button onClick={() => handleEdit()} className='flex justify-center cursor-pointer w-[100px] py-1 mb-3 bg-[#CBD2E0] rounded-[20px]'>
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