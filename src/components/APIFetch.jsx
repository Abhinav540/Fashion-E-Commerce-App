import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import '../styles/APIFetch.css';
import AnimatedCartButton from './AnimatedCartButton';

function APIFetch() {
  const [api, setApi] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data); // Debug log
        
        // Filter only fashion items: clothes, shoes, caps, etc.
        const fashionKeywords = ['dress', 'cap', 'hat', 'shoe', 'sneaker', 'boot', 'jacket', 'shirt', 'pant', 'jean', 'coat', 'top', 'sleeve', 't-shirt', 'hoodie', 'sweater', 'skirt', 'shorts', 'sock', 'clothing', 'apparel', 'wear', 'cloth', 'fashion'];
        // Exclude furniture and non-fashion items
        const excludeKeywords = ['sofa', 'table', 'chair', 'armchair', 'dining', 'furniture', 'desk', 'cabinet', 'bed', 'couch', 'ottoman', 'bench', 'stool', 'shelf'];
        
        const fashionItems = data.filter(item => {
          const title = item.title?.toLowerCase() || '';
          const description = item.description?.toLowerCase() || '';
          const category = item.category?.name?.toLowerCase() || '';
          
          // Check if item contains any excluded keywords
          const isExcluded = excludeKeywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword) || category.includes(keyword)
          );
          
          // Check if item contains fashion keywords OR is in a clothing category
          const isFashion = fashionKeywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword) || category.includes(keyword)
          ) || category.includes('cloth') || category.includes('wear');
          
          return isFashion && !isExcluded;
        });
        
        console.log('Filtered Fashion Items:', fashionItems); // Debug log
        setApi(fashionItems); // Only set fashion items
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="dark-shop-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>STORE</h1>
          <div className="header-icons">
            <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
              <ShoppingCart size={24} />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div className="cart-overlay" onClick={() => setShowCart(false)}></div>
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>Your Cart ({cart.length})</h2>
              <button onClick={() => setShowCart(false)} className="close-btn">✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="empty-msg">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <img 
                        src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/80'} 
                        alt={item.title} 
                      />
                      <div className="cart-item-details">
                        <h4>{item.title.substring(0, 30)}...</h4>
                        <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="remove-btn">✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-price">${getTotalPrice()}</span>
                  </div>
                  <button className="checkout-btn">Checkout</button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Products Grid */}
      <main className="main-container">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : api.length === 0 ? (
          <div className="loading">No fashion items found. Please check back later.</div>
        ) : (
          <div className="products-grid">
            {api.map((data) => (
              <div key={data.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={data.images && data.images.length > 0 ? data.images[0] : 'https://via.placeholder.com/300'} 
                    alt={data.title}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                  />
                </div>
                <div className="product-info">
                  <h3>{data.title.substring(0, 50)}{data.title.length > 50 ? '...' : ''}</h3>
                  <p className="price">${data.price.toFixed(2)}</p>
                  <p className="description">
                    {data.description.substring(0, 80)}{data.description.length > 80 ? '...' : ''}
                  </p>
                  <div className="button-group">
                    <AnimatedCartButton 
                      theme="dark"
                      onAddToCart={() => addToCart(data)}
                    />
                  </div>
                </div>                        
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default APIFetch;