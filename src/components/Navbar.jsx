import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Deteksi scroll untuk efek visual tambahan
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Architecture Vision', 
      href: null, 
      children: [
        { name: 'Architecture Principles', href: '/vision/principles' },
        { name: 'Architecture Goals', href: '/vision/goals' },
        { name: 'Organization Decomposition Diagram', href: '/vision/organization' },
        { name: 'Stakeholder Catalog', href: '/vision/stakeholder' },
        { name: 'Solution Concept Diagram', href: '/vision/solution' },
        { name: 'Value Chain', href: '/vision/valuechain' },
        { name: 'Vision, Mission and Corporate Strategy', href: '/vision/strategy' },
      ]
    },
    { 
      name: 'Business Arch', 
      href: null, 
      children: [
        { name: 'Business Interaction', href: '/business/Interaction' },
        { name: 'Business Process', href: '/business/probis' },
        { name: 'Business Process - Application Matrix', href: '/business/appMatrix' },
        { name: 'Business Process - Data Matrix', href: '/business/dataMatrix' },
        { name: 'Business Process - Risk Matrix', href: '/business/RiskMatrix' },
        { name: 'Business Process Map', href: '/business/process' },
        { name: 'Corporate Governance', href: '/business/corporate_governance' },
        { name: 'Functional Decomposition Diagram', href: '/business/functional' },
        { name: 'Organizational Actor Catalog', href: '/business/organizational' },
      ]
    },
    {
      name: 'Data Arch', 
      href: '/data',
      children: [
        { name: 'Application - Data Matrix', href: '/data/appmatrix' },
        { name: 'Conceptual Data Diagram', href: '/data/concept' },
        { name: 'Data Entity - Business Functional Matrix', href: '/data/function_matrix' },
        { name: 'Data Entity - Data Component Catalog', href: '/data/component' },
        { name: 'Data Principles', href: '/data/dataprinciples' },
        { name: 'Logical Data Diagram', href: '/data/logical' },
      ]
    },
    { 
      name: 'Application', 
      href: null, 
      children: [
        { name: 'Application Use Case Diagram', href: '/app/usecase' },
        { name: 'Application Portfolio Catalog', href: '/app/portfolio' },
        { name: 'Application Principles', href: '/app/principles' },
        { name: 'Application - Business Process Matrix', href: '/app/process-matrix' },
        { name: 'Application - Classification Matrix', href: '/app/classification' },
        { name: 'Application - Communication Diagram', href: '/app/communicationDiagram' },
        { name: 'Application - Organization Matrix', href: '/app/org_matrix' },
        { name: 'Application - Portofolio Assessment', href: '/app/porto-assesment' },
        { name: 'Application - User and Location Diagram', href: '/app' },
      ]
    },
    { 
      name: 'Technology', 
      href: null, 
      children: [
        { name: 'Environment and Location Diagram', href: '/tech/environmentDiagram' },
        { name: 'Network Communication Diagram', href: '/tech/networkCommunicationDiagram' },
        { name: 'Technology - Application Matrix', href: '/tech/appMatrix' },
        { name: 'Technology Principles', href: '/tech/technologyPrinciples' },
        { name: 'Technology Standard Catalog', href: '/tech/standardsCatalog' },
      ]
    },

    { 
      name: 'Architecture Implementation', 
      href: null, 
      children: [
        { name: 'Architecture Implementation Planning', href: '/implemen' },
        { name: 'Architecture Governance', href: '/implemen' },
      ]
    },
  ];

  const isActive = (item) => {
    if (!item.href) return false;
    if (item.href === '/') return location.pathname === '/';
    return location.pathname.startsWith(item.href);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-shadow duration-300 font-sans ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* LOGO */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">EA</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl sm:text-2xl text-blue-900 leading-tight">EA BMKG</span>
                <span className="text-sm text-gray-500 font-medium">Balikpapan</span>
              </div>
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {navigation.map((item, index) => (
              <div key={index} className="relative group">
                
                {item.children ? (
                  <div className={`px-4 py-3 rounded-md text-base font-medium flex items-center gap-2 cursor-default text-gray-700 hover:text-blue-600 hover:bg-gray-50`}>
                    {item.name}
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-transform duration-200" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-2
                      ${isActive(item)
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* DROPDOWN DESKTOP */}
                {item.children && (
                  <div className="absolute left-0 mt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 pt-2">
                    <div className="h-4 w-full absolute -top-4"></div> 
                    
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white overflow-hidden">
                      <div className="py-1 max-h-96 overflow-y-auto">
                        {item.children.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className={`block px-5 py-3 text-base transition-all duration-150 border-l-2
                              ${location.pathname === subItem.href
                                ? 'bg-blue-50 text-blue-700 border-blue-500 font-medium'
                                : 'text-gray-700 border-transparent hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300'
                              }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SEARCH BUTTON */}
          <div className="hidden lg:flex items-center">
            <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* HAMBURGER BUTTON */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {navigation.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                
                {item.children ? (
                   <div className="flex-1 px-4 py-3 rounded-md text-lg font-bold text-gray-800 bg-gray-50">
                     {item.name}
                   </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex-1 px-4 py-3 rounded-md text-lg font-medium transition-colors
                      ${isActive(item)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
                
                {item.children && (
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="p-3 ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg 
                      className={`w-6 h-6 transition-transform duration-200 ${openSubmenu === index ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              
              {item.children && (
                <div className={`overflow-hidden transition-all duration-300 ${
                  openSubmenu === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 pr-2 space-y-1 border-l-2 border-blue-100 ml-3 mt-1 mb-2">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2.5 rounded-md text-base font-medium transition-colors
                          ${location.pathname === subItem.href
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;