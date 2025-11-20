import React, { useState } from "react";
import { motion } from "motion/react";

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const {
    src,
    alt,
    style,
    className,
    priority = false,
    loading: loadingProp,
    decoding: decodingProp,
    ...rest
  } = props;

  const loading = priority ? "eager" : loadingProp ?? "lazy";
  const decoding = priority ? "auto" : decodingProp ?? "async";
  const fetchPriority = priority ? "high" : "auto";

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="
          alt="Error loading image"
          {...rest}
          data-original-url={src}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={() => setDidError(true)}
    />
  );
}

// Navigation component
const Navigation = ({ isMobile, isMenuOpen, toggleMenu, onNavigate }) => {
  return (
    <nav className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-white font-bold text-2xl">
          <span className="text-[var(--accent)]">Nialiv</span> Games
        </div>
      </div>
      
      {isMobile ? (
        <>
          <button 
            onClick={toggleMenu} 
            className="text-white p-2 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
          
          {isMenuOpen && (
            <div className="absolute top-16 right-0 left-0 bg-[#0A0E1A] p-4 z-50 border-t border-[#1A2035]">
              <ul className="flex flex-col space-y-4">
                <li><a href="#top" onClick={(e) => { e.preventDefault(); onNavigate?.("top"); }} className="text-white hover:text-[var(--accent)] transition-colors">Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate?.("about"); }} className="text-white hover:text-[var(--accent)] transition-colors">About</a></li>
                <li><a href="#games" onClick={(e) => { e.preventDefault(); onNavigate?.("games"); }} className="text-white hover:text-[var(--accent)] transition-colors">Games</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate?.("contact"); }} className="text-white hover:text-[var(--accent)] transition-colors">Contact</a></li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <ul className="flex space-x-8">
          <li><a href="#top" onClick={(e) => { e.preventDefault(); onNavigate?.("top"); }} className="text-white hover:text-[var(--accent)] transition-colors">Home</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate?.("about"); }} className="text-white hover:text-[var(--accent)] transition-colors">About</a></li>
          <li><a href="#games" onClick={(e) => { e.preventDefault(); onNavigate?.("games"); }} className="text-white hover:text-[var(--accent)] transition-colors">Games</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate?.("contact"); }} className="text-white hover:text-[var(--accent)] transition-colors">Contact</a></li>
        </ul>
      )}
    </nav>
  );
};

// Button component
const Button = ({ primary = true, children, className = "", type = "button", ...props }) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        primary
          ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-[#090D17] hover:shadow-[var(--accent-shadow)]"
          : "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-soft)]"
      } ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

// Game Card component
const GameCard = ({ title, description, image }) => {
  return (
    <motion.div 
      className="bg-[#0A0E1A] rounded-xl overflow-hidden flex flex-col h-full"
      whileHover={{ 
        boxShadow: "var(--accent-shadow)",
        y: -5,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        <Button primary={false} className="self-start">Learn More</Button>
      </div>
    </motion.div>
  );
};

// Social Link component
const SocialLink = ({ icon, href, label }) => {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center border border-[#1A2035] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors text-[var(--accent)]"
    >
      {icon}
    </a>
  );
};

export default function NialivGamesWebsite({ accentColor = "#00C8FF", secondaryColor = "#2BEAFF" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const accentVars = React.useMemo(
    () => ({
      "--accent": accentColor,
      "--accent-2": secondaryColor,
      "--accent-soft": `color-mix(in srgb, ${accentColor} 12%, transparent)`,
      "--accent-shadow": `0 0 20px color-mix(in srgb, ${accentColor} 35%, transparent)`,
    }),
    [accentColor, secondaryColor]
  );
  
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setFormStatus("Message sent. We'll get back to you soon.");
    event.target.reset();
  };

  const games = [
    {
      id: 1,
      title: "Astronigma",
      description: "A sci-fi puzzle adventure set in a mysterious space station.",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Neon Drift",
      description: "High-speed racing through futuristic cityscapes with custom vehicles.",
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Quantum Break",
      description: "A time-bending adventure where your choices alter reality.",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Cyber Nexus",
      description: "Explore a cyberpunk world filled with hackers, AI, and corporate intrigue.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      title: "Stellar Odyssey",
      description: "An epic space exploration game with procedurally generated galaxies.",
      image: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 6,
      title: "Void Runners",
      description: "Fast-paced multiplayer combat in zero-gravity environments.",
      image: "https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div
      id="top"
      className="bg-[#090D17] text-white font-['Inter',sans-serif] min-h-screen w-full"
      style={accentVars}
    >
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#090D17] via-[#0A1428] to-[#0D1A38] z-0"></div>
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="py-6">
            <Navigation isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} onNavigate={handleNavClick} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 md:py-32 items-center">
            <div className="md:col-span-6 space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold font-['Space_Grotesk',sans-serif] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[var(--accent)]">Nialiv</span> Games
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We create worlds worth exploring.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button className="w-full sm:w-auto" onClick={() => scrollToSection("games")}>View Our Games</Button>
                <Button primary={false} className="w-full sm:w-auto" onClick={() => scrollToSection("contact")}>Contact Us</Button>
              </motion.div>
            </div>
            
            <div className="md:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-2xl blur opacity-30"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Nialiv Games Hero"
                  className="w-full h-auto rounded-2xl relative z-10"
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk',sans-serif] relative inline-block">
                About Us
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"></div>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                We are independent game developers focused on creating immersive, visually driven experiences across mobile and indie platforms. Our team combines artistic vision with technical expertise to craft games that transport players to extraordinary worlds.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Founded in 2018, Nialiv Games has grown from a small passion project to a dedicated studio with a focus on innovative gameplay and compelling narratives. We believe games should be both beautiful and meaningful.
              </p>
            </div>
            
            <div className="md:col-span-6">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-2xl blur opacity-20"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Nialiv Games Team"
                  className="w-full h-auto rounded-2xl relative z-10"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Games Section */}
      <section id="games" className="py-20 md:py-32 bg-[#070A14]">
        <div className="container mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk',sans-serif] relative inline-block">
              Our Games
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"></div>
            </h2>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              Explore our collection of immersive gaming experiences, each crafted with passion and attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map(game => (
              <GameCard 
                key={game.id}
                title={game.title}
                description={game.description}
                image={game.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Game Section */}
      <section id="astronigma" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#080B16] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-10 z-0"></div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 md:order-2">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-2xl blur opacity-40"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Astronigma Game"
                  className="w-full h-auto rounded-2xl relative z-10"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </motion.div>
            </div>
            
            <div className="md:col-span-6 md:order-1 space-y-6">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk',sans-serif] relative inline-block">
                  <span className="text-[var(--accent)]">Astronigma</span> — Our Upcoming Sci-Fi Puzzle Adventure
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mt-6">
                  Astronigma is a mind-bending puzzle adventure set aboard the abandoned space station Helios. As Dr. Elena Reyes, you must solve intricate puzzles that manipulate gravity, time, and light to uncover the station's dark secrets and find your missing crew.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  Featuring stunning visuals, an atmospheric soundtrack, and a narrative that adapts to your choices, Astronigma represents our most ambitious project to date.
                </p>
                <div className="pt-6">
                  <Button onClick={() => scrollToSection("astronigma")}>Discover Astronigma</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-[#070A14]">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk',sans-serif] relative inline-block">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"></div>
              </h2>
              <p className="text-gray-300 text-lg">
                Have questions or want to collaborate? We'd love to hear from you. Reach out through any of our channels or use the contact form.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A0E1A] flex items-center justify-center text-[var(--accent)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <a href="mailto:hello@nialivgames.com" className="text-gray-300 hover:text-[var(--accent)]">hello@nialivgames.com</a>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <SocialLink 
                  href="#" 
                  label="Instagram"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  }
                />
                <SocialLink 
                  href="#" 
                  label="Twitter"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  }
                />
                <SocialLink 
                  href="#" 
                  label="GitHub"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  }
                />
              </div>
            </div>
            
            <div className="md:col-span-7">
              <div className="bg-[#0A0E1A] p-8 rounded-xl border border-[#1A2035]">
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-[#0D1220] border border-[#1A2035] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-[#0D1220] border border-[#1A2035] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-3 bg-[#0D1220] border border-[#1A2035] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-white"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full sm:w-auto" type="submit">Send Message</Button>
                  {formStatus && <p className="text-sm text-[var(--accent)]">{formStatus}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#060913] border-t border-[#1A2035]">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <div className="text-2xl font-bold mb-4">
                <span className="text-[var(--accent)]">Nialiv</span> Games
              </div>
              <p className="text-gray-400 mb-6">
                Creating immersive gaming experiences that transport players to extraordinary worlds.
              </p>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#top" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-[var(--accent)] transition-colors">About</a></li>
                <li><a href="#games" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Games</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="text-lg font-semibold mb-4">Games</h3>
              <ul className="space-y-2">
                <li><a href="#astronigma" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Astronigma</a></li>
                <li><a href="#games" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Neon Drift</a></li>
                <li><a href="#games" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Quantum Break</a></li>
                <li><a href="#games" className="text-gray-400 hover:text-[var(--accent)] transition-colors">All Games</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#1A2035] mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Nialiv Games. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
