// import React, { useState } from 'react';
// import '../styles/Home.css';
// import Navbar from './Navbar';
// import DomeGallery from './DomeGallery';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const navigate = useNavigate();
//   const [showGallery, setShowGallery] = useState(false);

//   const handleNextSlide = () => {
//     setShowGallery(true);
//   };

//   const handleCloseGallery = () => {
//     setShowGallery(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="continuous-scroll-container">
        
//         {/* HOME SECTION */}
//         <section className="hero-section">
//           <div className="hero-background">
//             <img 
//               src="https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" 
//               alt="Hero Banner" 
//               className="hero-image"
//             />
//           </div>

//           <div className="hero-content">
//             <p className="hero-subtitle">Welcome to Dress Code</p>
//             <h2 className="hero-tagline">Dont Waste Your Time.</h2>
//             <button 
//               className="hero-button"
//               onClick={() => navigate('/product')}
//             >
//               Shop Now
//             </button>
//           </div>

//           <div className="hero-controls">
//             <div className="dot-indicators">
//               <span className="dot active"></span>
//               <span className="dot"></span>
//             </div>
//             <div className="nav-arrows">
//               <button className="arrow-btn prev">⮐</button>
//               <button 
//                 className="arrow-btn next"
//                 onClick={handleNextSlide}
//               >
//                 ⯯
//               </button>
//             </div>
//           </div>

//           <div className="scroll-hint">
//             <p>Scroll down to explore</p>
//             <div className="scroll-arrow">↓</div>
//           </div>
//         </section>

        

//         {/* ABOUT SECTION */}
//         <section className="about-hero">
//           <div className="about-hero-bg">
//             <img 
//               src="https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
//               alt="About Banner"
//               className="about-bg-image"
//             />
//             <div className="about-overlay"></div>
//           </div>
//           <div className="about-hero-content">
//             <h1>About DRESS CODE</h1>
//             <p>Defining Style. Expressing Identity. Creating Impact.</p>
//           </div>
//         </section>

//         {/* Mission Section */}
//         <section className="about-section">
//           <div className="section-content">
//             <h2>Our Mission</h2>
//             <p>
//               At DRESS CODE, we believe that fashion is more than just clothing—it's a form of self-expression. 
//               Our mission is to provide high-quality, trendy, and timeless pieces that help you define your unique style 
//               and express your authentic identity to the world.
//             </p>
//           </div>
//         </section>

//         {/* Vision Section */}
//         <section className="about-section alternate">
//           <div className="section-content">
//             <h2>Our Vision</h2>
//             <p>
//               We envision a world where everyone feels confident in their choices and empowered by their wardrobe. 
//               DRESS CODE aims to be the go-to destination for fashion-forward individuals who value quality, 
//               sustainability, and personal style. We're committed to making premium fashion accessible to everyone.
//             </p>
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="about-section">
//           <div className="section-content">
//             <h2>Our Values</h2>
//             <div className="values-grid">
//               <div className="value-card">
//                 <h3>Quality</h3>
//                 <p>We source the finest materials and ensure every piece meets our high standards of craftsmanship.</p>
//               </div>
//               <div className="value-card">
//                 <h3>Authenticity</h3>
//                 <p>We celebrate individuality and believe fashion should be a true reflection of who you are.</p>
//               </div>
//               <div className="value-card">
//                 <h3>Sustainability</h3>
//                 <p>We're committed to ethical practices and reducing our environmental impact through responsible fashion.</p>
//               </div>
//               <div className="value-card">
//                 <h3>Innovation</h3>
//                 <p>We stay ahead of trends while creating timeless pieces that stand the test of time.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Story Section */}
//         <section className="about-section alternate">
//           <div className="section-content">
//             <h2>Our Story</h2>
//             <p>
//               DRESS CODE was founded on the belief that everyone deserves access to fashion that makes them feel confident 
//               and beautiful. What started as a small passion project has grown into a thriving brand, serving customers across 
//               the globe who share our values of quality, authenticity, and self-expression.
//             </p>
//             <p>
//               From curating the latest trends to creating timeless classics, we're dedicated to helping you find the perfect 
//               pieces that complete your wardrobe and tell your story. Every collection is carefully designed with you in mind.
//             </p>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="about-cta">
//           <h2>Ready to Discover Your Style?</h2>
//           <p>Explore our collections and find pieces that speak to you.</p>
//           <button className="cta-button" onClick={() => navigate('/products')}>Shop Now</button>
//         </section>

//         {/* Dome Gallery Modal */}
//         {showGallery && (
//           <div className="gallery-modal">
//             <button 
//               className="gallery-close-btn"
//               onClick={handleCloseGallery}
//             >
//               ✕
//             </button>
//             <DomeGallery />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Navbar from './Navbar';
import DomeGallery from './DomeGallery';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'gallery', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <div className="continuous-scroll-container">
        
        {/* HOME SECTION */}
        <section id="home" className="hero-section">
          <div className="hero-background">
            <img 
              src="https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" 
              alt="Hero Banner" 
              className="hero-image"
            />
          </div>

          <div className="hero-content">
            <p className="hero-subtitle">Welcome to Dress Code</p>
            <h2 className="hero-tagline">Don't Waste Your Time.</h2>
            <button 
              className="hero-button"
              onClick={() => navigate('/product')}
            >
              Shop Now
            </button>
          </div>

          <div className="hero-controls">
            <div className="dot-indicators">
              <span className="dot active"></span>
              <span className="dot"></span>
            </div>
          </div>

          <div className="scroll-hint">
            <p>Scroll down to explore</p>
            <div className="scroll-arrow">↓</div>
          </div>
        </section>

        {/* DOME GALLERY SECTION */}
        <section id="gallery" className="gallery-section">
          <div className="gallery-header">
            <h2>Explore Our Collection</h2>
            <p>Discover the latest fashion trends</p>
          </div>
          <div className="gallery-wrapper">
            <DomeGallery 
              fit={0.6}
              minRadius={500}
              maxRadius={800}
              dragSensitivity={25}
              grayscale={false}
              imageBorderRadius="20px"
              openedImageWidth="300px"
              openedImageHeight="400px"
            />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="about-hero">
          <div className="about-hero-bg">
            <img 
              src="https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
              alt="About Banner"
              className="about-bg-image"
            />
            <div className="about-overlay"></div>
          </div>
          <div className="about-hero-content">
            <h1>About DRESS CODE</h1>
            <p>Defining Style. Expressing Identity. Creating Impact.</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              At DRESS CODE, we believe that fashion is more than just clothing—it's a form of self-expression. 
              Our mission is to provide high-quality, trendy, and timeless pieces that help you define your unique style 
              and express your authentic identity to the world.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="about-section alternate">
          <div className="section-content">
            <h2>Our Vision</h2>
            <p>
              We envision a world where everyone feels confident in their choices and empowered by their wardrobe. 
              DRESS CODE aims to be the go-to destination for fashion-forward individuals who value quality, 
              sustainability, and personal style. We're committed to making premium fashion accessible to everyone.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-section">
          <div className="section-content">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Quality</h3>
                <p>We source the finest materials and ensure every piece meets our high standards of craftsmanship.</p>
              </div>
              <div className="value-card">
                <h3>Authenticity</h3>
                <p>We celebrate individuality and believe fashion should be a true reflection of who you are.</p>
              </div>
              <div className="value-card">
                <h3>Sustainability</h3>
                <p>We're committed to ethical practices and reducing our environmental impact through responsible fashion.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>We stay ahead of trends while creating timeless pieces that stand the test of time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-section alternate">
          <div className="section-content">
            <h2>Our Story</h2>
            <p>
              DRESS CODE was founded on the belief that everyone deserves access to fashion that makes them feel confident 
              and beautiful. What started as a small passion project has grown into a thriving brand, serving customers across 
              the globe who share our values of quality, authenticity, and self-expression.
            </p>
            <p>
              From curating the latest trends to creating timeless classics, we're dedicated to helping you find the perfect 
              pieces that complete your wardrobe and tell your story. Every collection is carefully designed with you in mind.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <h2>Ready to Discover Your Style?</h2>
          <p>Explore our collections and find pieces that speak to you.</p>
          <button className="cta-button" onClick={() => navigate('/product')}>Shop Now</button>
        </section>
      </div>
    </>
  );
}

export default Home;
