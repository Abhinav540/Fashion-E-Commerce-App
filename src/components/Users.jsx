import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import '../styles/Users.css'
import { useNavigate } from 'react-router-dom'

function Users() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editingImage, setEditingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });
  const navigate = useNavigate();

  const DEFAULT_AVATAR = "https://via.placeholder.com/150/cccccc/666666?text=No+Image";

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setLoggedInUser(parsedUser);
      
      // Load user orders
      const savedOrders = localStorage.getItem(`orders_${parsedUser.id}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      // Load user addresses
      const savedAddresses = localStorage.getItem(`addresses_${parsedUser.id}`);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleImageEdit = () => {
    if (newImageUrl.trim() === "") {
      alert("Please enter a valid image URL");
      return;
    }

    const updatedUser = { ...loggedInUser, image: newImageUrl };
    
    // Update localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    
    // Update in users array
    const allUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
    const updatedUsers = allUsers.map(u => u.id === loggedInUser.id ? updatedUser : u);
    localStorage.setItem('appUsers', JSON.stringify(updatedUsers));

    setLoggedInUser(updatedUser);
    setEditingImage(false);
    setNewImageUrl("");
    alert("Profile image updated successfully!");
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      alert("Please fill all address fields");
      return;
    }

    const address = {
      id: Date.now(),
      ...newAddress
    };

    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);
    localStorage.setItem(`addresses_${loggedInUser.id}`, JSON.stringify(updatedAddresses));
    
    setNewAddress({ street: "", city: "", state: "", zipCode: "", country: "" });
    setShowAddressForm(false);
    alert("Address added successfully!");
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem(`addresses_${loggedInUser.id}`, JSON.stringify(updatedAddresses));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  if (!loggedInUser) {
    return <div><Navbar /></div>;
  }

  return (
    <>
      <Navbar />
      <div className="users-container">
        
        {/* Current User Profile Section */}
        <section className="current-user-section">
          <h2>Your Profile</h2>
          <div className="user-profile-card">
            <div className="profile-image-container">
              <img 
                src={loggedInUser.image || DEFAULT_AVATAR} 
                alt={loggedInUser.name} 
                className="profile-image"
                onError={(e) => e.target.src = DEFAULT_AVATAR}
              />
              <button 
                className="edit-image-btn"
                onClick={() => setEditingImage(true)}
              >
                ✎ Edit
              </button>
            </div>

            <div className="profile-info">
              <h3>{loggedInUser.name}</h3>
              <p><strong>Username:</strong> {loggedInUser.username}</p>
              <p><strong>Email:</strong> {loggedInUser.email}</p>
              <p><strong>User ID:</strong> {loggedInUser.id}</p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Image Edit Modal */}
          {editingImage && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Update Profile Image</h3>
                <input 
                  type="text" 
                  placeholder="Enter image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="modal-input"
                />
                <div className="modal-actions">
                  <button 
                    className="modal-btn save-btn"
                    onClick={handleImageEdit}
                  >
                    Save
                  </button>
                  <button 
                    className="modal-btn cancel-btn"
                    onClick={() => {
                      setEditingImage(false);
                      setNewImageUrl("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Addresses Section */}
        <section className="addresses-section">
          <div className="section-header">
            <h2>Saved Addresses</h2>
            <button 
              className="add-btn"
              onClick={() => setShowAddressForm(!showAddressForm)}
            >
              + Add Address
            </button>
          </div>

          {showAddressForm && (
            <div className="form-container address-form">
              <input 
                type="text" 
                placeholder="Street Address"
                value={newAddress.street}
                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                className="form-input"
              />
              <input 
                type="text" 
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                className="form-input"
              />
              <input 
                type="text" 
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                className="form-input"
              />
              <input 
                type="text" 
                placeholder="Zip Code"
                value={newAddress.zipCode}
                onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                className="form-input"
              />
              <input 
                type="text" 
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                className="form-input"
              />
              <button 
                className="save-address-btn"
                onClick={handleAddAddress}
              >
                Save Address
              </button>
            </div>
          )}

          {addresses.length === 0 ? (
            <p className="empty-message">No addresses saved yet</p>
          ) : (
            <div className="addresses-grid">
              {addresses.map((addr) => (
                <div key={addr.id} className="address-card">
                  <p><strong>Street:</strong> {addr.street}</p>
                  <p><strong>City:</strong> {addr.city}</p>
                  <p><strong>State:</strong> {addr.state}</p>
                  <p><strong>Zip Code:</strong> {addr.zipCode}</p>
                  {addr.country && <p><strong>Country:</strong> {addr.country}</p>}
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteAddress(addr.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Orders Section */}
        <section className="orders-section">
          <h2>Your Orders</h2>

          {orders.length === 0 ? (
            <p className="empty-message">No orders yet</p>
          ) : (
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h4>{order.orderNumber}</h4>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                  <p><strong>Items:</strong> {order.items.length > 0 ? order.items.length : "0"}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Users