'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Star, Clock, ChevronDown, Filter, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface CoffeeShop {
  id: number;
  name: string;
  rating: number;
  type: string;
  priceRange: string;
  organic: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface ActiveFilters {
  rating: number | null;
  type: string | null;
  priceRange: string | null;
  organic: boolean;
}

const CoffeeDeliveryPlatform: React.FC = () => {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [filteredCoffeeShops, setFilteredCoffeeShops] = useState<CoffeeShop[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState<CoffeeShop | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    rating: null,
    type: null,
    priceRange: null,
    organic: false
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockCoffeeShops: CoffeeShop[] = [
        { id: 1, name: 'Espresso Emporium', rating: 4.5, type: 'Espresso', priceRange: '$$', organic: false },
        { id: 2, name: 'Latte Lounge', rating: 4.8, type: 'Latte', priceRange: '$$$', organic: true },
        { id: 3, name: 'Cappuccino Corner', rating: 4.2, type: 'Cappuccino', priceRange: '$$', organic: false },
        { id: 4, name: 'Mocha Mansion', rating: 4.6, type: 'Mocha', priceRange: '$$$', organic: true },
        { id: 5, name: 'Americano Avenue', rating: 4.3, type: 'Americano', priceRange: '$', organic: false },
        { id: 6, name: 'Cold Brew Castle', rating: 4.7, type: 'Cold Brew', priceRange: '$$', organic: true },
        { id: 7, name: 'Macchiato Manor', rating: 4.4, type: 'Macchiato', priceRange: '$$', organic: false },
        { id: 8, name: 'Flat White Fortress', rating: 4.9, type: 'Flat White', priceRange: '$$$', organic: true },
        { id: 9, name: 'Affogato Alley', rating: 4.1, type: 'Affogato', priceRange: '$$', organic: false },
        { id: 10, name: 'Ristretto Retreat', rating: 4.5, type: 'Ristretto', priceRange: '$', organic: true },
      ];
      setCoffeeShops(mockCoffeeShops);
      setFilteredCoffeeShops(mockCoffeeShops);
      setLoading(false);
    };
    fetchCoffeeShops();
  }, []);

  useEffect(() => {
    let result = coffeeShops;
    if (searchQuery) {
      result = result.filter(shop => 
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeFilters.rating) {
      result = result.filter(shop => shop.rating >= activeFilters.rating!);
    }
    if (activeFilters.type) {
      result = result.filter(shop => shop.type === activeFilters.type);
    }
    if (activeFilters.priceRange) {
      result = result.filter(shop => shop.priceRange === activeFilters.priceRange);
    }
    if (activeFilters.organic) {
      result = result.filter(shop => shop.organic);
    }
    setFilteredCoffeeShops(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [coffeeShops, searchQuery, activeFilters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterType: keyof ActiveFilters, value: string | number | boolean) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoffeeShops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCoffeeShops.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CoffeeQuick</h1>
          <div className="flex items-center">
            <Button variant="outline" className="mr-2">
              <MapPin className="w-4 h-4 mr-2" />
              Set Location
            </Button>
            <Button>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({cart.length})
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search coffee shops or types"
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => handleFilterChange('rating', 4)}>
              <Star className="w-4 h-4 mr-2" />
              4+ Stars
            </Button>
            <Button variant="outline" onClick={() => handleFilterChange('organic', true)}>
              Organic
            </Button>
            <Button variant="outline" onClick={() => handleFilterChange('priceRange', '$')}>
              $ <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => handleFilterChange('priceRange', '$$')}>
              $$ <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => handleFilterChange('priceRange', '$$$')}>
              $$$ <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading coffee shops...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map(shop => (
                <Card key={shop.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image
                      src="/em-coffee-bourbon-img.png"
                      alt={shop.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-xl mb-2">{shop.name}</CardTitle>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{shop.rating}</span>
                      <Badge variant="secondary" className="ml-2">{shop.type}</Badge>
                      {shop.organic && <Badge variant="outline" className="ml-2">Organic</Badge>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{shop.priceRange}</span>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">15-30 min</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setSelectedCoffeeShop(shop)}>
                      View Menu
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  onClick={() => paginate(number)}
                >
                  {number}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CoffeeDeliveryPlatform;