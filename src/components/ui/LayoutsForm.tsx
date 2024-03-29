// Form.js
import { useEffect, useState } from 'react';

import { HexColorPicker } from "react-colorful";

import pencilicon from '@/assets/icons/pencilicon.svg';

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
type Repository = {
    name: string;
    description: string;
    author?: string;
    proglanguage?: string;

};

const Form = ({ target }: { target?: string }) => {

    const [description, setDescription] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [repository, setRepository] = useState<Repository>();
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
        linkRepo: target || '',
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
    const extractGitHubTarget = (url: string) => {
        const parts = url.split('/');
        if (parts.length >= 4) {
            return `${parts[3]}/${parts[4]}`;
        } else {
            return null;
        }
    };

    const githubTarget = extractGitHubTarget(formData.linkRepo);
    console.log(githubTarget);

    const fetchGitHubData = async () => {
        try {
            const response = await fetch(`https://api.github.com/repos/${githubTarget}`);
            if (!response.ok) {
                throw new Error('Failed to fetch GitHub data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            return null;
        }
    };


    console.log(formData.linkRepo)
    console.log(repository)
    console.log(formData.name)


    useEffect(() => {
        if (!target) {
            setFormData({ ...formData, linkRepo: '' });
        }
        const fetchData = async () => {
            const repositoryResponse = await fetchGitHubData();
            console.log(repositoryResponse);

            if (repositoryResponse) {
                formData.name = repositoryResponse.name || '';
                setDescription(repositoryResponse.description || '')
                setAuthor(repositoryResponse.owner.login || '');
                formData.description = repositoryResponse.description || '';
                formData.author = repositoryResponse.owner.login || '';
                formData.progLanguage = repositoryResponse.language || '';
                const repositoryData: Repository = {
                    name: repositoryResponse.name,
                    description: repositoryResponse.description,
                    author: repositoryResponse.owner.login,
                    proglanguage: repositoryResponse.language,
                };
                console.log(repositoryData);
                setRepository(repositoryData);

            }
        };

        fetchData();
    }, [target]);

    const [imageUrl, setImageUrl] = useState<string>('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string>('');

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    const handleAddImage = () => {
        const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(imageUrl);

        if ((formData.images?.length ?? 0) < 3 && isValidUrl) {
            setFormData({
                ...formData,
                images: [...(formData.images ?? []), imageUrl],

            });
            console.log(formData.images)
            setImageUrl('');
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
            const newColorIndex = (formData.colors?.length ?? 0) + 1;
            setFormData({
                ...formData,
                colors: [...(formData.colors ?? []), selectedColor],
                color_palette: {
                    ...formData.color_palette,
                    [`color${newColorIndex}`]: selectedColor
                }
            });
            setSelectedColor('');
            setShowColorPicker(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData);
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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            a.download = 'manifest.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            window.location.href = '';

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
    const handleChangeVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regex = /^(\d+(\.\d*)?|\.\d+)$/;


        if (regex.test(inputValue) || inputValue === '') {
            setFormData({ ...formData, version: inputValue }); 
        }
    };


    const handleBlurVersion = () => {

        if (formData.version === '') {
            setFormData({ ...formData, version: '1.0' });
        }
    };


    return (
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl m-4 border-2 bg-black/90 border-title  p-4">
            <form onSubmit={handleSubmit} className="   " autoComplete='off'>
                <div className="relative">
                    <label className="block mb-2 text-white text-xl">Repository Link</label>
                    <input
                        type="text"
                        name="linkRepo"
                        value={formData.linkRepo}
                        required
                        
                        onChange={handleChange}
                        readOnly={!!target}
                        className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent"
                        placeholder='Link'
                    />
                    {!target && (
                        <img src={pencilicon} className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                    )}

                </div>
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
                                autoComplete='off'
                                maxLength={30}
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
                                readOnly={!!description}
                                required
                                maxLength={200}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent overflow-auto resize-none"
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
                                    onChange={handleChangeVersion}
                                    onBlur={handleBlurVersion}
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
                                    readOnly={!!author}
                                    onChange={handleChange}
                                    maxLength={24}
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
                                    <option value="website" className='text-black'>Website</option>
                                    <option value="other" className='text-black'>Other</option>
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
                                    <option value="es" className='text-black'>Spanish</option>
                                    <option value="en" className='text-black'>English</option>
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
                                    <option value="java" className='text-black'>
                                        Java
                                    </option>
                                    <option value="kotlin" className='text-black'>
                                        Kotlin
                                    </option>
                                </select>
                            </div>
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


                        <label htmlFor="color" className="block text-white mb-2">Color Picker</label>
                        <div className="mb-4 mt-4 flex items-center">

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
                                maxLength={20}
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
                                maxLength={200}
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
                                maxLength={100}
                                className="block w-full p-2 pr-8 border-b border-gray-400 focus:outline-none focus:border-blue-500 text-white bg-transparent overflow-auto resize-none"
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
                                <option value="eclipse" className='text-black'>Eclipse</option>
                                <option value="intelij" className='text-black'>InteliJ</option>
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