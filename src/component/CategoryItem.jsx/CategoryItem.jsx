/* eslint-disable react/prop-types */

export default function CategoryItem({productInfo}) {
    const { image,name } = productInfo
    return <>
            <div className="sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded-lg border-2 border-gray-200 p-4 hover:shadow-2xl transition-shadow duration-300">
                <img className="w-full border-b-2 object-cover h-80" src={image} alt="" />
                <h2 className="text-2xl mt-2 font-bold text-center text-primary-700">{name}</h2>
            </div>
    </>
}
