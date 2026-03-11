import { useState } from "react"
import api from "../../api"

function AddGallery() {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    // Add this style tag in your component
    const animationStyles = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounceSlow {
            0%, 100% {
                transform: translateY(-5%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-bounce-slow {
            animation: bounceSlow 2s infinite;
        }
    `

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const submit = async () => {
        if (!image) {
            alert("Please select an image first!")
            return
        }

        setLoading(true)
        const formData = new FormData()
        formData.append("image", image)

        try {
            await api.post("/gallery/add", formData)
            alert("✨ Image Added Successfully!")
            setImage(null)
            setPreview(null)
        } catch (error) {
            alert("❌ Error adding image. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const removeImage = () => {
        setImage(null)
        setPreview(null)
    }

    return (
        <>
            {/* Add style tag with animations */}
            <style>{animationStyles}</style>

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-10 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-4">
                            Add to Gallery
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 text-lg">Share your beautiful moments with the world</p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 transform transition-all duration-500 hover:shadow-green-200/50 animate-fade-in-up">

                        {/* Upload Area */}
                        <div
                            className={`relative border-3 border-dashed rounded-2xl p-8 transition-all duration-300 ${dragActive
                                ? "border-green-500 bg-green-50/50 scale-105"
                                : preview
                                    ? "border-green-400 bg-green-50/30"
                                    : "border-gray-300 hover:border-green-400 hover:bg-green-50/30"
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                            />

                            {!preview ? (
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center cursor-pointer space-y-4"
                                >
                                    {/* Upload Icon */}
                                    <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center animate-bounce-slow">
                                        <svg
                                            className="w-12 h-12 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                    </div>

                                    {/* Upload Text */}
                                    <div className="text-center">
                                        <p className="text-xl font-semibold text-gray-700 mb-2">
                                            Drop your image here
                                        </p>
                                        <p className="text-gray-500">
                                            or <span className="text-green-600 font-medium">browse</span> to choose a file
                                        </p>
                                    </div>

                                    {/* File Info */}
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <span>PNG, JPG, GIF up to 10MB</span>
                                    </div>
                                </label>
                            ) : (
                                /* Image Preview */
                                <div className="relative animate-fade-in">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-96 object-cover rounded-xl shadow-lg"
                                    />

                                    {/* Overlay with actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center space-x-4">
                                        <button
                                            onClick={removeImage}
                                            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transform transition-all duration-300 hover:scale-110 shadow-lg"
                                            title="Remove image"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        <label
                                            htmlFor="image-upload"
                                            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full transform transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                                            title="Change image"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </label>
                                    </div>

                                    {/* Success Badge */}
                                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                                        ✓ Image Selected
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Image Details */}
                        {preview && (
                            <div className="mt-6 p-4 bg-green-50/50 rounded-xl animate-fade-in">
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">
                                        <span className="font-semibold">Filename:</span> {image?.name}
                                    </span>
                                    <span className="text-sm">
                                        <span className="font-semibold">Size:</span> {(image?.size / 1024).toFixed(2)} KB
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={submit}
                                disabled={!image || loading}
                                className={`
                                    relative overflow-hidden group px-8 py-4 rounded-xl font-semibold text-lg
                                    transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                                    ${!image || loading
                                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                        : "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white hover:shadow-green-200"
                                    }
                                `}
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                        <span>Uploading...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <span>Upload to Gallery</span>
                                        <svg
                                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                )}
                            </button>

                            {preview && (
                                <button
                                    onClick={removeImage}
                                    className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Tips for best results:
                            </h3>
                            <ul className="text-xs text-gray-500 space-y-1 ml-5 list-disc">
                                <li>Use high-quality images for better display</li>
                                <li>Recommended size: 1200x800 pixels or larger</li>
                                <li>Square images work best in the gallery grid</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddGallery
