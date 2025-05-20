import { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import products from '../data/products';

function CatalogPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Filter products
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: featured
    return 0;
  });
  
  return (
    <div className="catalog-page">
      <div className="container">
        <h1>Our Products</h1>
        
        <div className="catalog-controls">
          <div className="filters">
            <label htmlFor="category-filter">Filter by:</label>
            <select 
              id="category-filter" 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sorting">
            <label htmlFor="sort-by">Sort by:</label>
            <select 
              id="sort-by" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        <div className="products-count">
          Showing {sortedProducts.length} products
        </div>
        
        <div className="products-grid">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <style jsx="true">{`
        .catalog-page {
          padding: var(--spacing-10) 0;
        }
        
        .catalog-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-6);
          flex-wrap: wrap;
          gap: var(--spacing-4);
        }
        
        .filters, .sorting {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }
        
        select {
          padding: var(--spacing-2) var(--spacing-4);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          background-color: white;
          color: var(--color-gray-800);
        }
        
        .products-count {
          margin-bottom: var(--spacing-6);
          color: var(--color-gray-600);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-6);
        }
        
        @media (max-width: 992px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .catalog-controls {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default CatalogPage;