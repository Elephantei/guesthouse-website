// src/App.tsx
import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  // Replace with your actual image files in public/images/
  const heroImage = '/images/hero1.jpg';
  const galleryBackground = '/images/hero2.jpg';

  const galleryImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop',
  ];

  // const galleryImages = [
  //   '/images/image1.jpg',
  //   '/images/image2.jpg',
  //   '/images/image3.jpg',
  //   '/images/image4.jpg',
  //   '/images/image5.jpg',
  //   '/images/image6.jpg',
  // ];

  // const amenities = [
  //   { icon: Wifi, text: 'Free Wi-Fi' },
  //   { icon: Car, text: 'Free Parking' },
  //   { icon: Coffee, text: 'Coffee & Tea' },
  //   { icon: Utensils, text: 'Kitchen Access' },
  // ];

  // const testimonials = [
  //   {
  //     name: 'Sarah Johnson',
  //     text: 'Absolutely beautiful place! The hospitality was exceptional and the views are breathtaking.',
  //     rating: 5,
  //   },
  //   {
  //     name: 'Mike Chen',
  //     text: 'Perfect getaway location. Clean, comfortable, and the hosts were incredibly welcoming.',
  //     rating: 5,
  //   },
  //   {
  //     name: 'Emma Davis',
  //     text: 'Exceeded all expectations. Will definitely be coming back!',
  //     rating: 5,
  //   },
  // ];

  // Scroll animation with fallback
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the section ID from the closest section element
            const sectionId = entry.target.closest('section')?.id || entry.target.id;
            if (sectionId) {
              setIsVisible((prev) => ({ ...prev, [sectionId]: true }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe sections and animated elements
    document.querySelectorAll('section[id], [data-animate]').forEach((el) =>
      observer.observe(el)
    );

    // Fallback: Set visibility based on scroll position
    const handleScroll = () => {
      const sections = ['gallery', 'contact'];
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // If section is in viewport (with some margin)
          if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
            setIsVisible((prev) => ({ ...prev, [sectionId]: true }));
          }
        }
      });
    };

    // Initial check and scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Guest House</div>
          <div className="space-x-6 hidden md:flex">
            {['hero', 'gallery', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center text-white pt-24"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Paradise
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience luxury and comfort in our beautiful guest house
          </p>
          <button
            onClick={() => scrollToSection('gallery')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-lg font-semibold transition hover:scale-105"
          >
            View Gallery
          </button>
        </div>
        <div className="absolute bottom-6 text-white animate-bounce z-10">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Gallery */}
      <section
        id="gallery"
        className="py-20 bg-fixed bg-center bg-cover text-white"
        style={{ backgroundImage: `url(${galleryBackground})` }}
      >
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div
            id="gallery-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.gallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4">Gallery</h2>
            <p className="text-lg text-gray-200">
              Take a look inside our beautiful guest house
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {galleryImages.map((src, index) => (
              <div
                key={index}
                data-animate
                className={`overflow-hidden rounded-lg shadow-lg transition hover:scale-105 duration-300 ${
                  isVisible.gallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40 z-0" />
      </section>

      {/* Testimonials - Hidden */}
      {/* <section id="testimonials" className="py-20 bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">What Our Guests Say</h2>
            <p className="text-gray-600">Real experiences from happy guests</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-animate
                className={`p-6 bg-white rounded-lg shadow-lg transition-all duration-700 hover:scale-105 ${
                  isVisible.testimonials
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex mb-2 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={20} className="fill-current" />
                  ))}
                </div>
                <p className="italic mb-4">"{t.text}"</p>
                <p className="font-semibold">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-300 mb-8">
            Ready to book your stay? Contact us below.
          </p>
          <div className="space-y-4">
            <div className="flex justify-center items-center space-x-3">
              <MapPin />
              <span>123 Paradise Lane, Dream City</span>
            </div>
            <div className="flex justify-center items-center space-x-3">
              <Phone />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex justify-center items-center space-x-3">
              <Mail />
              <span>info@guesthouse.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        &copy; {new Date().getFullYear()} Guest House. All rights reserved.
      </footer>
    </div>
  );
}

export default App;