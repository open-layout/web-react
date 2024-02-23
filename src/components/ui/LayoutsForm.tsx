// Form.js
import { useState } from 'react';
import pencilicon from '@/assets/icons/pencilicon.svg';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        version: '',
        author: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData);
        // Puedes realizar acciones adicionales aquí, como enviar los datos a un servidor
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <form onSubmit={handleSubmit} className="mt-8">
                <div className="relative">
                    <label className="block mb-2 text-white">Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        required
                        onChange={handleChange}
                        className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                        placeholder='Repository name'
                    />
                    <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="mt-4 relative">
                    <label className="block mb-2 text-white">Description</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                        placeholder='Description of the repository'
                    />
                    <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className='flex flex-row gap-4'>
                    <div className="mt-4 relative">
                        <label className="block mb-2 text-white">Version</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                            placeholder='Version'
                        />
                        <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <div className="mt-4 relative">
                        <label className="block mb-2 text-white">Author</label>
                        <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                            placeholder='Author'
                        />
                        <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>
                <div className='flex flex-row gap-4 mt-4'> 
                    <div className="relative w-full">
                        <label className="block mb-2 text-white">Category</label>
                        <select
                            name="version"
                            value={formData.version}
                            required
                            onChange={handleChange}
                            className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                            
                        >
                            <option value="">Select Category</option>
                            <option value="Website" className='text-black'>Website</option>
                            <option value="Other" className='text-black'>Other</option>
                            {/* Agrega más opciones según sea necesario */}
                        </select>
                    </div>
                    <div className="relative w-full">
                        <label className="block mb-2 text-white">Language</label>
                        <select
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                        >
                            <option value="">Select Language</option>
                            <option value="Es" className='text-black'>Spanish</option>
                            <option value="En" className='text-black'>English</option>
                            {/* Agrega más opciones según sea necesario */}
                        </select>
                    </div>
                </div>
                <div className="relative mt-4">
                    <label className="block mb-2 text-white">Link Repo</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        required
                        onChange={handleChange}
                        className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                        placeholder='Repository Link'
                    />
                    <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="mt-6">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
