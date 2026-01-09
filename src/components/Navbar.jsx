import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  const navigation = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Architecture Vision', 
      href: null, 
      children: [
        { name: 'Strategy Map', href: '/vision/strategy' },
        { name: 'Architecture Goals', href: '/vision/goals' },
        { name: 'Architecture Principles', href: '/vision/principles' },
        { name: 'Struktur Organisasi', href: '/business/organization' },
        { name: 'Value Chain', href: '/vision/valuechain' },
        { name: 'Stakeholder Catalog', href: '/vision/stakeholder' },
      ]
    },
    { 
      name: 'Business Arch', 
      href: null, 
      children: [
        { name: 'Organizational Actor Catalog', href: '/business/organizational' },
        { name: 'Business Process Map', href: '/business/pr' },
        { name: 'Functional Decomposition Diagram', href: '/business/functional' },
      ]
    },
    { 
      name: 'Data Arch', 
      href: '/data',
      children: [
        { name: 'Data Principles', href: '/data/dataprinciples' },
        { name: 'Data Entity - Data Component Catalog', href: '/data/component' },
        { name: 'Conceptual Data Diagram', href: '/data' },
        { name: 'Logical Data Diagram', href: '/data/logical' },
        { name: 'Data Entity - Business Functional Matrix', href: '/data/function_matrix' },
        { name: 'Application - Data Matrix', href: '/data' },
      ]
    },
    { 
      name: 'Technology', 
      href: null, 
      children: [
        { name: 'Infrastructure', href: '/tech/infra' },
        { name: 'Network Diagram', href: '/tech/network' },
      ]
    },
    { name: 'Migration', href: '/migration' },
  ];

  // Fungsi untuk cek apakah menu sedang aktif
  const isActive = (item) => {
    if (!item.href) return false; // Kalau null, pasti tidak active
    if (item.href === '/') return location.pathname === '/';
    return location.pathname.startsWith(item.href);
  };

  // Toggle submenu di mobile
  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm font-sans">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* LOGO */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">EA</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-xl text-blue-900 leading-tight">EA BMKG</span>
                <span className="text-xs text-gray-500 font-medium">Balikpapan</span>
              </div>
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item, index) => (
              <div key={index} className="relative group">
                
                
                {item.children ? (
                  // MENU INDUK (Hanya Teks & Icon, Bukan Link)
                  <div className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 cursor-default text-gray-700 hover:text-blue-600 hover:bg-gray-50`}>
                    {item.name}
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-transform duration-200" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                ) : (
                  //  MENU BIASA (Link)
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1
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
                  <div className="absolute left-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 pt-2">
                    {/* Jembatan transparan supaya hover tidak putus */}
                    <div className="h-4 w-full absolute -top-4"></div> 
                    
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white overflow-hidden">
                      <div className="py-1">
                        {item.children.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className={`block px-4 py-2.5 text-sm transition-all duration-150 border-l-2
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
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* HAMBURGER BUTTON */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
          {navigation.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                
                {/* Kalau punya anak, jadi DIV. Kalau tidak, jadi Link */}
                {item.children ? (
                   <div className="flex-1 px-3 py-2.5 rounded-md text-base font-bold text-gray-800 bg-gray-50">
                     {item.name}
                   </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)} // Tutup menu pas diklik
                    className={`flex-1 px-3 py-2.5 rounded-md text-base font-medium transition-colors
                      ${isActive(item)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Tombol Toggle Submenu Mobile */}
                {item.children && (
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="p-2 ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${openSubmenu === index ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Submenu Mobile */}
              {item.children && (
                <div className={`overflow-hidden transition-all duration-300 ${openSubmenu === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4 pr-2 space-y-1 border-l-2 border-blue-100 ml-3 mt-1 mb-2">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.href}
                        onClick={() => setIsOpen(false)} // Tutup menu saat submenu diklik
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors
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