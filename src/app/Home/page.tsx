"use client";

import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Image from 'next/image';

// Import product images with unique paths and names
import CameraImage from "@/app/Camera.jpeg";
import GadgetsImage from "@/app/Electronic gadgets.jpeg";
import HomeDecorImage from "@/app/home decor.jpeg";

// Expanded product data
const products = [
  {
    id: 1,
    title: "Professional DSLR Camera",
    image: CameraImage,
    description: "High-end DSLR camera perfect for professional photography",
    price: 1299.99,
    brand: "Canon",
    category: "Cameras",
    specs: [
      "24.1MP Full-Frame Sensor",
      "4K Video Recording",
      "Dual Card Slots",
      "Weather-Sealed Body"
    ]
  },
  {
    id: 2,
    title: "Wireless Earbuds",
    image: GadgetsImage,
    description: "Premium wireless earbuds with noise cancellation",
    price: 199.99,
    brand: "Sony",
    category: "Electronics",
    specs: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Water Resistant",
      "Touch Controls"
    ]
  },
  {
    id: 3,
    title: "Modern Wall Art",
    image: HomeDecorImage,
    description: "Contemporary wall art piece for modern homes",
    price: 299.99,
    brand: "ArtDecor",
    category: "Home Decor",
    specs: [
      "Hand-crafted",
      "Premium Materials",
      "Size: 36\" x 24\"",
      "Ready to Hang"
    ]
  }
];

const FilterDialog = ({ isOpen, onClose, filters, setFilters }) => {
  const brands = ["All", "Canon", "Sony", "ArtDecor"];
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Under $200", min: 0, max: 200 },
    { label: "$200 - $500", min: 200, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "Over $1000", min: 1000, max: Infinity }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div 
                      key={range.label} 
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        id={range.label}
                        name="priceRange"
                        className="mr-2"
                        checked={filters.priceRange.label === range.label}
                        onChange={() => setFilters({
                          ...filters,
                          priceRange: range
                        })}
                      />
                      <label htmlFor={range.label}>{range.label}</label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="brand">
              <AccordionTrigger>Brand</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div 
                      key={brand} 
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        id={brand}
                        name="brand"
                        className="mr-2"
                        checked={filters.brand === brand}
                        onChange={() => setFilters({
                          ...filters,
                          brand
                        })}
                      />
                      <label htmlFor={brand}>{brand}</label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;
  
  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative h-[300px] rounded-lg overflow-hidden mb-4">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-2xl font-bold">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <div>
              <h3 className="font-semibold mb-2">Specifications:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.specs.map((spec: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function HomePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { label: "All", min: 0, max: Infinity },
    brand: "All"
  });

  const filteredProducts = products.filter(product => {
    const priceMatch = product.price >= filters.priceRange.min && 
                      product.price <= filters.priceRange.max;
    const brandMatch = filters.brand === "All" || product.brand === filters.brand;
    return priceMatch && brandMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Our Products</h1>
          <button 
            className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={20} />
            Filter Products
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome to Our Store</h2>
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
              src={GadgetsImage}
              alt="Featured electronics"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="h-48 relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">{product.brand}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </div>
  );
}