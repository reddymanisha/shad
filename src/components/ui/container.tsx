import Image, { StaticImageData } from 'next/image';

interface TestPropsTypes {
  name: string;
  description: string;
  price: number;
  imageUrl: string | StaticImageData;
  imageUrl1: string | StaticImageData;
  imageUrl2: string | StaticImageData;
  imageUrl3: string | StaticImageData;
}

export default function TestProps({ 
  name, 
  description, 
  price, 
  imageUrl, 
  imageUrl1, 
  imageUrl2, 
  imageUrl3 
}: TestPropsTypes) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-lg group">
      {/* Main turquoise background */}
      <div className="absolute inset-0 bg-[#40E0D0]/20"></div>
      
      {/* Image container */}
      <div className="relative w-full h-[80%]">
        {/* First image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={`${name} - Primary`}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Additional images with hover effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Image
            src={imageUrl1}
            alt={`${name} - View 1`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-0 transition-opacity duration-300">
          <Image
            src={imageUrl2}
            alt={`${name} - View 2`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-0 transition-opacity duration-300">
          <Image
            src={imageUrl3}
            alt={`${name} - View 3`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      
      {/* Text overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-white">
        <div className="h-full flex flex-col justify-center items-center">
          <h2 className="text-gray-800 font-medium text-lg">{name}</h2>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
      </div>

      {/* Hover overlay with price - hidden by default, shown on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform scale-0 group-hover:scale-100">
          Buy Now ${price.toFixed(2)}
        </button>
      </div>
    </div>
  );
}