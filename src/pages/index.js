import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getUsers } from './api/users/userApiRoutes';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ users }) {
    console.log(users)

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
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
                    {users.map((user, index) => 
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
                        {/* <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td> */}
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </main>
  )
}

export const getServerSideProps = async () => {
    const users = await getUsers();
    return { props: { users }, };
};