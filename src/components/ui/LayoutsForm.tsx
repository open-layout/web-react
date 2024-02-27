// Form.js
import { useState } from 'react';
import pencilicon from '@/assets/icons/pencilicon.svg';
import { HexColorPicker } from "react-colorful";

interface FormData {
    name: string;
    description: string;
    category: string;
    language: string;
    version: string;
    author: string;
    node_versions?: {
        current: string;
        LTS: string;
    };
    progLanguage: string;
    collaborators?: string
    colors?: string[];
    requirements?: string;
    ide?: string;
    images?: string[];
    linkRepo: string;
    linkPreview?: string;
    linkReadme?: string;
    linkTutorial?: string;
    linkDocs?: string;
    linkDev?: string;
    color_palette?: {
        [key: string]: string;
    };
    github?: string;
    discord?: string;
    x?: string;
}

const Form = (target?: string) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        category: '',
        language: '',
        version: '',
        author: '',
        collaborators: '',
        colors: [],
        progLanguage: '',
        requirements: '',
        node_versions: {
            current: '',
            LTS: '',
        },
        ide: '',
        images: [],
        linkRepo: '',
        linkPreview: '',
        linkReadme: '',
        linkTutorial: '',
        linkDocs: '',
        linkDev: '',
        color_palette: {},
        github: '',
        discord: '',
        x: '',

    });
    
    
    formData.linkRepo = target || '';
    
    const [imageUrl, setImageUrl] = useState<string>('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string>(''); // Estado para almacenar el color seleccionado

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    const handleAddImage = () => {
        // Verificar si la URL de la imagen es válida
        const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(imageUrl);

        // Verificar si el número de imágenes es menor que 3 y si la URL es válida
        if ((formData.images?.length ?? 0) < 3 && isValidUrl) {
            setFormData({
                ...formData,
                images: [...(formData.images ?? []), imageUrl], // Agregar la URL de la imagen al array de imágenes

            });
            console.log(formData.images)
            setImageUrl(''); // Limpiar la URL de la imagen
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (formData.images?.length ?? 0));
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (formData.images?.length ?? 0)) % (formData.images?.length ?? 0));
    };

    const handleColorConfirm = () => {
        if (selectedColor) {
            const newColorIndex = (formData.colors?.length ?? 0) + 1; // Obtener el nuevo índice del color
            setFormData({
                ...formData,
                colors: [...(formData.colors ?? []), selectedColor], // Añadir el color seleccionado al array de colores
                color_palette: {
                    ...formData.color_palette, // Mantener los colores anteriores
                    [`color${newColorIndex}`]: selectedColor // Añadir el nuevo color con una clave única
                }
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

    const handleDownloadJSON = () => {
        const colorPalette: { [key: string]: string } = {};

        if (formData.colors) {
            formData.colors.forEach((color, index) => {
                colorPalette[`color${index + 1}`] = color;
            });
        }
        // Verificar si todos los campos requeridos están completos
        if (
            formData.name &&
            formData.description &&
            formData.version &&
            formData.author &&
            formData.category &&
            formData.language &&
            formData.progLanguage &&
            formData.linkRepo
        ) {
            const requirementsArray = formData.requirements ? formData.requirements.split(',').map((item: string) => item.trim()) : [];
            const collaboratorsArray = formData.collaborators ? formData.collaborators.split(',').map((item: string) => item.trim()) : [];

            const jsonData: any = {
                name: formData.name,
                version: formData.version,
                description: formData.description,
                author: formData.author,
                category: formData.category,
                language: formData.language,
                repository: formData.linkRepo,
                languages: [formData.progLanguage],


            };
            if (colorPalette && Object.keys(colorPalette).length > 0) {
                jsonData.color_palette = colorPalette;
            }
            if (formData.images?.length && formData.images?.length > 0) {
                jsonData.images = formData.images;
            }

            if (requirementsArray.length > 0) {
                jsonData.requirements = requirementsArray;
            }
            if (formData.node_versions?.current && formData.node_versions?.LTS) {
                jsonData.node_versions = {
                    current: formData.node_versions.current,
                    LTS: formData.node_versions.LTS,
                };
            }
            if (formData.ide && formData.ide.length > 0) {
                jsonData.frameworks = [formData.ide];
            }
            if (collaboratorsArray.length > 0) {
                jsonData.collaborators = collaboratorsArray;
            }
            if (formData.linkPreview && formData.linkPreview.length > 0) {
                jsonData.live_preview = formData.linkPreview;
            }
            if (formData.linkReadme && formData.linkReadme.length > 0) {
                jsonData.readme = formData.linkReadme;
            }
            if (formData.linkTutorial && formData.linkTutorial.length > 0) {
                jsonData.tutorial = formData.linkTutorial;
            }
            if (formData.linkDocs && formData.linkDocs.length > 0) {
                jsonData.documentation = formData.linkDocs;
            }
            if (formData.linkDev && formData.linkDev.length > 0) {
                jsonData.website = formData.linkDev;
            }
            if (formData.github && formData.github.length > 0 || formData.discord && formData.discord.length > 0 || formData.x && formData.x.length > 0) {
                jsonData.socials = {
                    github: formData.github,
                    discord: formData.discord,
                    x: formData.x,
                };
            }


            const json = JSON.stringify(jsonData, null, 2);


            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'form_data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            alert('Please fill in all required fields before downloading.');
        }
    };

    const handleCopyJSON = () => {
        const colorPalette: { [key: string]: string } = {};

        if (formData.colors) {
            formData.colors.forEach((color, index) => {
                colorPalette[`color${index + 1}`] = color;
            });
        }
        // Verificar si todos los campos requeridos están completos
        if (
            formData.name &&
            formData.description &&
            formData.version &&
            formData.author &&
            formData.category &&
            formData.language &&
            formData.progLanguage &&
            formData.linkRepo
        ) {
            const requirementsArray = formData.requirements ? formData.requirements.split(',').map((item: string) => item.trim()) : [];
            const collaboratorsArray = formData.collaborators ? formData.collaborators.split(',').map((item: string) => item.trim()) : [];

            const json = JSON.stringify({
                name: formData.name,
                version: formData.version,
                description: formData.description,
                author: formData.author,
                category: formData.category,
                collaborators: collaboratorsArray,
                language: formData.language,
                repository: formData.linkRepo,
                live_preview: formData.linkPreview,
                color_palette: colorPalette,
                node_versions: {
                    current: formData.node_versions?.current,
                    LTS: formData.node_versions?.LTS,
                },
                requirements: requirementsArray,
                frameworks: [formData.ide],
                languages: [formData.progLanguage],
                readme: formData.linkReadme,
                images: formData.images,
                tutorial: formData.linkTutorial,
                documentation: formData.linkDocs,
                website: formData.linkDev,
                socials: {
                    github: formData.github,
                    discord: formData.discord,
                    x: formData.x,
                },
            }, null, 2);
            navigator.clipboard.writeText(json);
            alert('JSON Copied to Clipboard!');
        } else {
            alert('Please fill in all required fields before copying.');
        }
    };


    return (
        <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-2xl m-4 border-2 border-title  p-4">
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <form onSubmit={handleSubmit} className="mt-8">
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

                        <div className="relative mt-4">
                            <label className="block mb-2 text-white">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
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
                                name="description"
                                value={formData.description}
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
                                    name="version"
                                    required
                                    value={formData.version}
                                    onChange={handleChange}
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                    placeholder='Version'
                                />
                                <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <div className="mt-4 relative">
                                <label className="block mb-2 text-white">Author</label>
                                <input
                                    type="text"
                                    required
                                    name="author"
                                    value={formData.author}
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
                                    name="category"
                                    value={formData.category}
                                    required
                                    onChange={handleChange}
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"

                                >
                                    <option value=""></option>
                                    <option value="Website" className='text-black'>Website</option>
                                    <option value="Other" className='text-black'>Other</option>
                                    {/* Agrega más opciones según sea necesario */}
                                </select>
                            </div>
                            <div className="relative w-full">
                                <label className="block mb-2 text-white">Language</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    required
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                >
                                    <option value=""></option>
                                    <option value="Es" className='text-black'>Spanish</option>
                                    <option value="En" className='text-black'>English</option>
                                    {/* Agrega más opciones según sea necesario */}
                                </select>
                            </div>
                            <div className="relative w-full">
                                <label className="block mb-2 text-white">Prog Lang</label>
                                <select
                                    name="progLanguage"
                                    value={formData.progLanguage}
                                    required
                                    onChange={handleChange}
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"

                                >
                                    <option value=""></option>
                                    <option value="Java" className='text-black'>
                                        Java
                                    </option>
                                    <option value="Kotlin" className='text-black'>
                                    Kotlin
                                    </option>
                                    {/* Agrega más opciones según sea necesario */}
                                </select>
                            </div>
                        </div>

                        <div className="relative mt-4">
                            <label className="block mb-2 text-white">Link Repo</label>
                            <input
                                type="text"
                                name="linkRepo"
                                value={formData.linkRepo}
                                required
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Repository Link'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>


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

                        <label htmlFor="color" className="block text-white mb-2">Color Picker</label>
                        <div className="mb-4 flex items-center">

                            <div
                                className="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full mr-3"
                                onClick={() => setShowColorPicker(!showColorPicker)}
                            >
                                <span className="text-white">+</span>
                            </div>
                            {formData.colors?.map((color, index) => (
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
                        <div className="mt-4 relative">
                            <label className="block mb-2 text-white">Node Version</label>
                            <input
                                type="text"
                                required
                                name="node_versions"
                                value={formData.node_versions?.current && formData.node_versions?.LTS}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Node Version'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        {formData.images?.length && formData.images?.length > 0 && (
                            <div className="mt-2 flex justify-between">
                                <button type="button" onClick={handlePrevImage} className="text-white">&#10094;</button>
                                <img
                                    src={formData.images?.[currentImageIndex]}
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
                        <div className="mb-4 relative mt-4">
                            <label htmlFor="requirements" className="block text-white mb-2">Requirements</label>
                            <textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Requirements of the repository'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="requirements" className="block text-white mb-2">Collaborators</label>
                            <textarea
                                name="collaborators"
                                value={formData.collaborators}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Collaboratos'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="relative w-full">
                            <label className="block mb-2 text-white">IDE</label>
                            <select
                                name="ide"
                                value={formData.ide}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"

                            >
                                <option value="">Select Ide</option>
                                <option value="Website" className='text-black'>Eclipse</option>
                                <option value="Other" className='text-black'>InteliJ</option>
                                {/* Agrega más opciones según sea necesario */}
                            </select>
                        </div>


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
                        <div className="relative">
                            <label className="block mb-2 text-white">Preview Link</label>
                            <input
                                type="text"
                                name="linkPreview"
                                value={formData.linkPreview}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Preview Link'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="mt-4 relative">
                            <label className="block mb-2 text-white">Readme Link</label>
                            <input
                                name="linkReadme"
                                value={formData.linkReadme}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Readme Link'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="relative mt-4">
                            <label className="block mb-2 text-white">Tutorial Link</label>
                            <input
                                type="text"
                                name="linkTutorial"
                                value={formData.linkTutorial}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Tutorial Link'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="mt-4 relative">
                            <label className="block mb-2 text-white">Docs Link</label>
                            <input
                                name="linkDocs"
                                value={formData.linkDocs}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Docs Link'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="relative mt-4">
                            <label className="block mb-2 text-white">Dev Link</label>
                            <input
                                type="text"
                                name="linkDev"
                                value={formData.linkDev}
                                onChange={handleChange}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                placeholder='Developer github Link'
                            />
                            <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className='flex flex-row gap-4'>
                            <div className="mt-4 relative">
                                <label className="block mb-2 text-white">Github</label>
                                <input
                                    type="text"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                    placeholder='Username'
                                />
                            </div>
                            <div className="mt-4 relative">
                                <label className="block mb-2 text-white">Discord</label>
                                <input
                                    type="text"
                                    name="discord"
                                    value={formData.discord}
                                    onChange={handleChange}
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                    placeholder='Username'
                                />
                            </div>
                            <div className="mt-4 relative">
                                <label className="block mb-2 text-white">X</label>
                                <input
                                    type="text"
                                    name="x"
                                    value={formData.x}
                                    onChange={handleChange}
                                    className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                                    placeholder='Username'
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                    <button type="button" onClick={handleDownloadJSON} className="bg-title text-white py-2 px-4 rounded-xl w-40">
                        Download
                    </button>
                    <button type="button" onClick={handleCopyJSON} className="bg-title text-white py-2 px-4 rounded-xl w-40">
                        Copy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;