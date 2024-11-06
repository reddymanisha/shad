import  Navbar  from '@/components/ui/navbar';
import  Footer  from '@/components/ui/footer';
import Image from 'next/image';

// Import product images with corrected paths
import Camera from "@/app/Camera.jpeg";
import ElectronicGadgets from "@/app/Electronic gadgets.jpeg";
import HomeDecor from "@/app/home decor.jpeg";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      title: "Camera Collection",
      image: Camera,
      description: "Discover our premium range of professional cameras."
    },
    {
      id: 2,
      title: "Electronic Gadgets",
      image: ElectronicGadgets,
      description: "Explore powerful tools designed to enhance your productivity."
    },
    {
      id: 3,
      title: "Home Decor",
      image: HomeDecor,
      description: "Transform your space with our elegant home decor collection."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-lg mb-6">
              Discover amazing products at unbeatable prices. From cameras to home decor,
              we have everything you need to enhance your lifestyle.
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Shop Now
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition duration-300">
                View Deals
              </button>
            </div>
          </div>
          
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={ElectronicGadgets}
              alt="Featured electronics"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}