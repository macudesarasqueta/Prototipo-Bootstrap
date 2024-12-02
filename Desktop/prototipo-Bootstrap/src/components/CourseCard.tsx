import React from 'react';

interface CourseCardProps {
    title: string;
    price: string;
    category: string;
    image: string;
    onContract: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    price,
    category,
    image,
    onContract
}) => {
    return (
<div className="relative rounded-2xl overflow-hidden shadow-lg group h-[100px] md:h-[250px]">

            {/* Categoría centrada en la parte superior */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-cyan-400 text-md z-20">
                {category}
            </div>

            {/* Gradiente superpuesto */}
            <div className="absolute -inset-2 bg-gradient-to-b from-transparent via-black/60 to-black/90 z-10" />


            {/* Imagen */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />

            {/* Contenido inferior */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white p-4">
                <h3 className="text-base font-semibold mb-3 leading-tight text-center">{title}</h3>
                <button
                    onClick={onContract}
                    className="bg-white text-cyan-500 px-8 py-2 rounded-full text-sm font-bold absolute bottom-8"
                >
                    {price}
                </button>
            </div>
        </div>
    );
};


export default CourseCard;