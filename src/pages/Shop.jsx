// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { Grid2X2, List } from 'lucide-react';


const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, loading, error, pagination, filters } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterInput, setFilterInput] = useState(filters.filter);
  const [isGridView, setIsGridView] = useState(true);
  const productsPerPage = 25;

  const handleProductClick = (product) => {
    const slugifiedName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const gender = product.category?.gender?.toLowerCase() === 'e' ? 'erkek' : 'kadin';
    const category = product.category?.name?.toLowerCase().replace(/\s+/g, '-') || 'general';
    const categoryId = product.category?.id || '0';
    
    navigate(`/shop/${gender}/${category}/${categoryId}/${slugifiedName}/${product.id}`);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    dispatch(setFilters({ sort: newSort }));
    setCurrentPage(1);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ filter: filterInput }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const offset = (currentPage - 1) * productsPerPage;
    dispatch(fetchProducts({ 
      limit: productsPerPage, 
      offset,
      sort: filters.sort,
      filter: filters.filter,
      category: filters.category
    }));
  }, [dispatch, currentPage, filters]);

  const totalPages = Math.ceil(pagination.total / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  if (!Array.isArray(products)) {
    return <div className="container mx-auto px-4 py-8">No products available</div>;
  }

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, pagination.total);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Shop Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
    
      </div>
      <Categories></Categories>
      <div className="flex flex-col py-4 pb-8 sm:flex-row justify-between items-start sm:items-center gap-4">
          <form onSubmit={handleFilterSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              placeholder="Search products..."
              className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Filter
            </button>
          </form>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 border rounded-lg hover:bg-gray-100"
              title={isGridView ? "Switch to list view" : "Switch to grid view"}
            >
              {isGridView ? (
                <Grid2X2 className="w-5 h-5" />
              ) : (
                <List className="w-5 h-5" />
              )}
            </button>
            <select
              value={filters.sort}
              onChange={handleSortChange}
              className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort by</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
          </div>
        </div>

      {/* Product Count Display */}
      <div className="mb-4 text-gray-600">
        Showing {startProduct}-{endProduct} of {pagination.total} products
      </div>

      {/* Product Grid/List */}
      <div className={isGridView 
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        : "flex flex-col gap-4"
      }>
        {products.map((product) => (
          <div
            key={product.id}
            className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              isGridView ? '' : 'flex gap-4'
            }`}
            onClick={() => handleProductClick(product)}
          >
            <div className={`${isGridView ? 'aspect-w-1 aspect-h-1 w-full' : 'w-48 h-48'}`}>
              <img
                src={product.images && product.images[0] ? product.images[0].url : 'https://via.placeholder.com/300'}
                alt={product.name}
                className={`${isGridView ? 'w-full h-48' : 'w-48 h-48'} object-cover`}
              />
            </div>
            <div className={`p-4 ${isGridView ? '' : 'flex-1'}`}>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">{Number(product.rating).toFixed(1)}</span>
                <span className="text-sm text-gray-500">({product.sell_count} sold)</span>
              </div>
              <p className="text-gray-600 font-semibold">${Number(product.price).toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-2">{product.stock} in stock</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToCart(product));
                }}
                className={`mt-4 ${isGridView ? 'w-full' : 'w-auto'} bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 3 ||
              pageNumber === currentPage + 3
            ) {
              return <span key={pageNumber}>...</span>;
            }
            return null;
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
