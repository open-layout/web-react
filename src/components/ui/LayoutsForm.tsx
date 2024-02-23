// Form.js
import { useState } from 'react';
import pencilicon from '@/assets/icons/pencilicon.svg';
import { HexColorPicker } from "react-colorful";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    version: string;
    author: string;
    colors: string[]; // Especifica que colors es un array de strings
    requirements: string;
    ide: string;
    images: string[]; // Especifica que image es un array de strings o null
}

const Form = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        version: '',
        author: '',
        colors: [], // Inicializa colors como un array vacío
        requirements: '',
        ide: '',
        images: [], // Inicializa images como un array vacío o null
    });

    const [imageUrl, setImageUrl] = useState<string>('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string>(''); // Estado para almacenar el color seleccionado

    const handleColorPickerClick = () => {
        setShowColorPicker(true);
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    const handleAddImage = () => {
        // Verificar si la URL de la imagen es válida
        const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(imageUrl);

        // Verificar si el número de imágenes es menor que 3 y si la URL es válida
        if (formData.images.length < 3 && isValidUrl) {
            setFormData({
                ...formData,
                images: [...formData.images, imageUrl], // Agregar la URL de la imagen al array de imágenes
                
            });
            console.log(formData.images)
            setImageUrl(''); // Limpiar la URL de la imagen
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % formData.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + formData.images.length) % formData.images.length);
    };

    const handleColorConfirm = () => {
        if (selectedColor) {
            setFormData({
                ...formData,
                colors: [...formData.colors, selectedColor], // Agregar el color seleccionado al array de colores
            });
            setSelectedColor(''); // Limpiar el color seleccionado
            setShowColorPicker(false);
        }
    };
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
    const toggleAccordion = (accordionId: number) => {
        for (let i = 1; i <= 3; i++) {
            if (i !== accordionId) {
                const otherAccordionBody = document.getElementById(`accordion-flush-body-${i}`);
                if (otherAccordionBody) {
                    otherAccordionBody.classList.add('hidden');
                }
            }
        }

        const accordionBody = document.getElementById(`accordion-flush-body-${accordionId}`);
        const isExpanded = accordionBody?.classList.contains('hidden');

        if (isExpanded) {
            accordionBody?.classList.remove('hidden');
        } else {
            accordionBody?.classList.add('hidden');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                <h2 id="accordion-flush-heading-1">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                        onClick={() => toggleAccordion(1)}
                        aria-expanded="false"
                        aria-controls="accordion-flush-body-1"
                    >
                        <span className='font-bold text-2xl'>Required Form</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
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
                            <div className="relative w-full">
                                <label className="block mb-2 text-white">Programation Lang</label>
                                <select
                                    name="prog lang"
                                    value={formData.version}
                                    required
                                    onChange={handleChange}
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"

                                >
                                    <option value="">Select Lang</option>
                                    <option value="Website" className='text-black'>Java</option>
                                    <option value="Other" className='text-black'>Kotlin</option>
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

                    </form>
                </div>
                <h2 id="accordion-flush-heading-2">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                        onClick={() => toggleAccordion(2)}
                        aria-expanded="false"
                        aria-controls="accordion-flush-body-2"
                    >
                        <span className='font-bold text-xl'>Important Form</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
                    //important here
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <label htmlFor="color" className="block text-white mb-2">Color Picker</label>
                        <div className="mb-4 flex items-center">

                            <div
                                className="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full mr-3"
                                onClick={() => setShowColorPicker(!showColorPicker)}
                            >
                                <span className="text-white">+</span>
                            </div>
                            {formData.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full mr-3"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                            {showColorPicker && (
                                <div className="cursor-pointer w-10 h-10 flex border border-gray-400 rounded-full mr-3">
                                    <div className="absolute z-10 ">
                                        <HexColorPicker
                                            color={selectedColor || '#ffffff'}
                                            onChange={handleColorChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {selectedColor && (
                                <button
                                    type="button"
                                    onClick={handleColorConfirm}
                                    className="bg-blue-500 text-white py-2 px-4 ml-48 rounded"
                                >
                                    Confirmar
                                </button>
                            )}

                        </div>
                        {formData.images.length > 0 && (
                            <div className="mt-2 flex justify-between">
                                <button type="button" onClick={handlePrevImage} className="text-white">&#10094;</button>
                                <img
                                    src={formData.images[currentImageIndex]}
                                    alt="Preview"
                                    className="block mx-auto"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                                <button type="button" onClick={handleNextImage} className="text-white">&#10095;</button>
                            </div>
                        )}
                        <div className="relative mt-4">
                            <label htmlFor="imageUrl" className="block mb-2 text-white">Image URL</label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={handleImageUrlChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Enter Image URL'
                            />
                            <button
                                type="button"
                                onClick={handleAddImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Add Image
                            </button>
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="requirements" className="block text-white mb-2">Requirements</label>
                            <textarea
                                name="messagrequirementse"
                                value={formData.requirements}
                                onChange={handleChange}
                                required
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Requirements of the repository'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="relative w-full">
                            <label className="block mb-2 text-white">IDE</label>
                            <select
                                name="ide"
                                value={formData.ide}
                                required
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"

                            >
                                <option value="">Select Ide</option>
                                <option value="Website" className='text-black'>Eclipse</option>
                                <option value="Other" className='text-black'>InteliJ</option>
                                {/* Agrega más opciones según sea necesario */}
                            </select>
                        </div>

                    </form>
                </div>
                <h2 id="accordion-flush-heading-3">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                        onClick={() => toggleAccordion(3)}
                        aria-expanded="false"
                        aria-controls="accordion-flush-body-3"
                    >
                        <span className='font-bold text-lg'>Socials & Links</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
                    // Socials here
                </div>
            </div>
            <div className="mt-6">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Form;