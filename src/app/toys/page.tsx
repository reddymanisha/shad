import TestProps from "@/components/ui/props";
import Camera from "@/app/Camera.jpeg";
import ElectronicGadgets from "@/app/Electronic gadgets.jpeg";
import HomeDecor from "@/app/home decor.jpeg";
import Toys from "@/app/toys.jpeg";

const productsData = [
  {
    id: 1,
    name: "Nyka",
    description: "An online shopping platform",
    price: 1000,
    images: {
      main: Camera,
      view1: Camera,
      view2: Camera,
      view3: Camera,
    }
  },
  {
    id: 2,
    name: "Electronic Gadgets",
    description: "Flat 50% off/-",
    price: 1000,
    images: {
      main: ElectronicGadgets,
      view1: ElectronicGadgets,
      view2: ElectronicGadgets,
      view3: ElectronicGadgets,
    }
  },
  {
    id: 3,
    name: "Home Decor",
    description: "Flat 50% off/-",
    price: 1000,
    images: {
      main: HomeDecor,
      view1: HomeDecor,
      view2: HomeDecor,
      view3: HomeDecor,
    }
  },
  {
    id: 4,
    name: "Toys",
    description: "Flat 50% off/-",
    price: 1000,
    images: {
      main: Toys,
      view1: Toys,
      view2: Toys,
      view3: Toys,
    }
  }
];

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsData.map((product) => (
          <TestProps 
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.images.main}
            imageUrl1={product.images.view1}
            imageUrl2={product.images.view2}
            imageUrl3={product.images.view3}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;