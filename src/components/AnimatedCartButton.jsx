import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/AnimatedCartButton.css';

function AnimatedCartButton({ onAddToCart, theme = 'white' }) {
  const buttonRef = useRef(null);
  const morphRef = useRef(null);
  const shirtRefs = useRef([]);

  useEffect(() => {
    const button = buttonRef.current;
    const morph = morphRef.current;

    const handlePointerDown = (e) => {
      if (button.classList.contains('active')) {
        return;
      }
      gsap.to(button, {
        '--background-scale': 0.97,
        duration: 0.15
      });
    };

    const handleClick = (e) => {
      e.preventDefault();
      if (button.classList.contains('active')) {
        return;
      }
      button.classList.add('active');

      // Callback for parent component
      if (onAddToCart) {
        onAddToCart();
      }

      gsap.to(button, {
        keyframes: [{
          '--background-scale': 0.97,
          duration: 0.15
        }, {
          '--background-scale': 1,
          delay: 0.125,
          duration: 1.2,
          ease: 'elastic.out(1, 0.6)'
        }]
      });

      gsap.to(button, {
        keyframes: [{
          '--cart-x': '0px',
          '--cart-scale': 1,
          duration: 0.4,
          ease: 'power1.in'
        }, {
          '--cart-y': '2px',
          duration: 0.1
        }, {
          '--cart-tick-offset': '0px',
          '--cart-y': '0px',
          duration: 0.2
        }, {
          '--cart-x': '52px',
          '--cart-rotate': '-15deg',
          duration: 0.2
        }, {
          '--cart-x': '104px',
          '--cart-rotate': '0deg',
          duration: 0.2,
          clearProps: true,
          onComplete() {
            button.style.setProperty('--text-o', 0);
            button.style.setProperty('--text-x', '0px');
            button.style.setProperty('--cart-x', '-104px');
          }
        }, {
          '--text-o': 1,
          '--text-x': '12px',
          '--cart-x': '-48px',
          '--cart-scale': 0.75,
          duration: 0.25,
          clearProps: true,
          onComplete() {
            button.classList.remove('active');
          }
        }]
      });

      gsap.to(button, {
        keyframes: [{
          '--text-o': 0,
          duration: 0.3
        }]
      });

      gsap.to(morph, {
        keyframes: [{
          attr: { d: 'M0 12C6 12 20 10 32 0C43.9024 9.99999 58 12 64 12V13H0V12Z' },
          duration: 0.25,
          ease: 'power1.out'
        }, {
          attr: { d: 'M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z' },
          duration: 0.15,
          ease: 'none'
        }]
      });
    };

    button.addEventListener('pointerdown', handlePointerDown);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('pointerdown', handlePointerDown);
      button.removeEventListener('click', handleClick);
    };
  }, [onAddToCart]);

  return (
    <button ref={buttonRef} className={`add-to-cart ${theme}`}>
      <span>Add to cart</span>
      <svg className="morph" viewBox="0 0 64 13">
        <path ref={morphRef} d="M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z" />
      </svg>
      <div className="cart">
        <svg viewBox="0 0 36 26">
          <path d="M1 2.5H6L10 18.5H25.5L28.5 7.5L7.5 7.5" className="shape" />
          <path d="M11.5 25C12.6046 25 13.5 24.1046 13.5 23C13.5 21.8954 12.6046 21 11.5 21C10.3954 21 9.5 21.8954 9.5 23C9.5 24.1046 10.3954 25 11.5 25Z" className="wheel" />
          <path d="M24 25C25.1046 25 26 24.1046 26 23C26 21.8954 25.1046 21 24 21C22.8954 21 22 21.8954 22 23C22 24.1046 22.8954 25 24 25Z" className="wheel" />
          <path d="M14.5 13.5L16.5 15.5L21.5 10.5" className="tick" />
        </svg>
      </div>
    </button>
  );
}

export default AnimatedCartButton;