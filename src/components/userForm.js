import { createUser } from '@/pages/api/users/userApiRoutes';
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { toast, Toaster } from "react-hot-toast";

const UserForm = ({ setAllUsers, allUsers }) => {
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
                toast.success("success");
                const updatedUsers = [...allUsers, response];
                setAllUsers(updatedUsers)
            })
            .catch((error) => {
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
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
  )
}

export default UserForm