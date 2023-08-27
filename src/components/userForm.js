import { createUser } from '@/pages/api/users/userApiRoutes';
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { toast, Toaster } from "react-hot-toast";

const UserForm = ({ setAllUsers, allUsers, setCreateLoading, createLoading }) => {
    const defaultValues = {
        name: "",
        username: "",
        phone: "",
        email: "",
        companyName: "",
        street: "",
    };
    const { control, setError, handleSubmit, formState: { errors }, } = useForm({ defaultValues });

    const onSubmit = async (data) => {

        if (Object.values(data).every((field) => field !== null && field !== "")) {

            const address = {};
            const company = {};
            address.street = data.street;
            company.name = data.companyName;
            setCreateLoading(true);
            const res = await createUser({
                name: data.name,
                username: data.username,
                email: data.email,
                address,
                company,
                phone: data.phone,
            })
            .then((response) => {
                console.log(response)
                toast.success("User created!");
                setCreateLoading(false);
                const updatedUsers = [...allUsers, response];
                setAllUsers(updatedUsers)
            })
            .catch((error) => {
                setCreateLoading(false);
                toast.error(error.message);
            });
        } else {
            for (const key in data) {
                if (data[key]?.length === 0) {
                    setError(key, {
                    type: "manual",
                    message: `Please enter a valid ${key}`,
                    });
                }
            }
        }
    };

  return (
    <div>
            <div>
                <h4>Add User</h4>
            </div>
            <Toaster />
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <Controller
                                id="name"
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        placeholder="name"
                                        className={`mt-1 p-2 w-full border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.name && (<p className="mt-1 text-red-500 text-sm">Name is required</p>)}
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <Controller
                                id="username"
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className={`mt-1 p-2 w-full border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.username && (<p className="mt-1 text-red-500 text-sm">Username is required</p>)}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <Controller
                                id="phone"
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        className={`mt-1 p-2 w-full border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.phone && (<p className="mt-1 text-red-500 text-sm">Phone is required</p>)}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Controller
                                control={control}
                                id="email"
                                name="email"
                                render={({ field }) => (
                                    <input
                                        type="email"
                                        placeholder="email"
                                        className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && <p className="mt-1 text-red-500 text-sm">Email is required</p>}
                        </div>
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                Company name
                            </label>
                            <Controller
                                id="companyName"
                                name="companyName"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        placeholder="companyName"
                                        className={`mt-1 p-2 w-full border rounded-md ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyName && (<p className="mt-1 text-red-500 text-sm">Company name is required</p>)}
                        </div>
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                Street
                            </label>
                            <Controller
                                id="street"
                                name="street"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        placeholder="street"
                                        className={`mt-1 p-2 w-full border rounded-md ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.street && (<p className="mt-1 text-red-500 text-sm">Street is required</p>)}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 text-white flex flex-row justify-center items-center bg-blue-500 rounded-md hover:bg-blue-600">
                            {createLoading &&
                            <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>}
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
  )
}

export default UserForm