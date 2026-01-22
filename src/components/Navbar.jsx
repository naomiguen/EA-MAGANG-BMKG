import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  // State untuk Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const location = useLocation();

  // Deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus ke input saat search dibuka
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navigation = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Architecture Vision', 
      href: null, 
      children: [
        { name: 'Architecture Principles', href: '/vision/principles', keywords:'Arsitektur, Standardization, Collaboration, data Quality' },
        { name: 'Architecture Goals', href: '/vision/goals', keywords: 'Arsitektur' },
        { name: 'Organization Decomposition Diagram', href: '/vision/organization', keywords:'Diagram, Kepala stasiun, Koordinator, Anggota' },
        { name: 'Stakeholder Catalog', href: '/vision/stakeholder', keywords:'Stekholder, Katalog, Peran, Kepentingan' },
        { name: 'Solution Concept Diagram', href: '/vision/solution', keywords:'Diagram, Solusi, User Layer' },
        { name: 'Value Chain', href: '/vision/valuechain', keywords:'Aktivitas Pendukung, Aktifitas Utama' },
        { name: 'Vision, Mission and Corporate Strategy', href: '/vision/strategy', keywords:'Visi, Misi, Map, Strategi' },
      ]
    },
    { 
      name: 'Business Arch', 
      href: null, 
      children: [
        { name: 'Business Process - Application Matrix', href: '/business/appMatrix' },
        { name: 'Business Process - Data Matrix', href: '/business/dataMatrix' },
        { name: 'Organizational Actor Catalog', href: '/business/organizational', keywords:'Jabatan, Katalog, Aktor, Pimpinan' },
        { name: 'Business Process - Risk Matrix', href: '/business/RiskMatrix', keywords: 'Corporate, Korporat' },
        { name: 'Functional Decomposition Diagram', href: '/business/functional', keywords: 'Fungsi bisnis, Tugas, Level' },
        { name: 'Business Process', href: '/business/probis', keywords:'Bisnis proses, Proses Bisnis Leveel 0-1' },
        { name: 'Business Interaction', href: '/business/Interaction', keywords:'Bisnis Interkasi, Business Interaction, Support, Internal, eksternal' },
        { name: 'Corporate Governance', href: '/business/corporate_governance', keywords:'Legal Foundation, Dsar hukum, undang-undang, UU, Perpres, PP, international standards, Operational Procedures, Peta konsep, Business process map' },

      ]
    },
    {
      name: 'Data Arch', 
      href: '/data',
      children: [
        { name: 'Application - Data Matrix', href: '/data/appmatrix', keywords:'Aplikasi, Data entity, BMKG Soft' },
        { name: 'Conceptual Data Diagram', href: '/data/concept', keywords: 'hubungan konnseptual' },
        { name: 'Data Entity - Business Functional Matrix', href: '/data/function_matrix', keywords:'data entity, fungsi bisnis, entitas data' },
        { name: 'Data Entity - Data Component Catalog', href: '/data/component', keywords:'entitas, logical data' },
        { name: 'Data Principles', href: '/data/dataprinciples', keywords:'Data accuracy, prinsip data' },
        { name: 'Logical Data Diagram', href: '/data/logical', keywords:'ERD, Hubunagn entitas' },
      ]
    },
    { 
      name: 'Application', 
      href: null, 
      children: [
        { name: 'Application Principles', href: '/app/principles', keywords:'perpres NO.95/2018, Perka BMKG' },
        { name: 'Application Portfolio Catalog', href: '/app/portfolio', keywords:'Aplikasi, BMKGsoft, Synergie, Radar, Sakti, Simak, Siman, SIPNB, Simas, Nowcasting' },
        { name: 'Application Use Case Diagram', href: '/app', keywords:'BMKGSoft' }, //belum selesai
        { name: 'Application - Portofolio Assessment', href: '/app/porto-assesment', keywords:'functional quality, technical quality, replace, maintain, eliminate, reassess, bmkgsoft, nowcasting, simas' },
        { name: 'Application - User and Location Diagram', href: '/app' },
        { name: 'Application - Communication Diagram', href: '/app/communicationDiagram', keywords:'data observasi, sistem sumber data, aplikasi target, tujuan data, web based' },
        { name: 'Application - Business Process Matrix', href: '/app/process-matrix', keywords:'matriks aplikasi, proses bisnis, pengamatan unsur cuaca, radar ' },
        { name: 'Application - Classification Matrix', href: '/app/classification', keywords:'klasifikasi matriks, aplikasi umum, aplikasi khusus' },
        { name: 'Application - Organization Matrix', href: '/app/org_matrix', keywords:'aplikasi, unit organisasi, tata usaha, keuangan, kepegawaian, unit teknisi' },
      ]
    },
    { 
      name: 'Technology', 
      href: null, 
      children: [
        { name: 'Environment and Location Diagram', href: '/tech/environmentDiagram', keywords:'Arsitektur lingkungan, bmkg pusat, stamet' },
        { name: 'Network Communication Diagram', href: '/tech/networkCommunicationDiagram', keywords:'EA design' },
        { name: 'Technology - Application Matrix', href: '/tech/appMatrix', keywords:'Teknologi, hardware ' },
        { name: 'Technology Principles', href: '/tech/technologyPrinciples', Keywords:'Prinsip arsitektur teknologi, perpres no.95 tahun 2018, landasan' },
        { name: 'Technology Standard Catalog', href: '/tech/standardsCatalog', keywords:'Perka BMKG no.9 tahun 2023, Katalog standar teknologi, Arsitektur SPBE, DAA' },
      ]
    },
    { 
      name: 'Architecture Implementation', 
      href: null, 
      children: [
        { name: 'Architecture Implementation Planning', href: '/imp/planning' },
        { name: 'Architecture Governance', href: '/implemen' },
      ]
    },
  ];

  // Menu tersembunyi
  const hiddenSearchItems = [
    { name: 'SOP Operasional Teknisi', href: '/', category: 'Dok', keywords: ''},
  ];

  // --- LOGIKA PENCARIAN (Flattening Data) ---
  const searchableItems = useMemo(() => {
    let items = [];
    navigation.forEach(parent => {
      // 1. Masukkan Parent jika punya href (bukan null)
      if (parent.href) {
        items.push({ 
          name: parent.name, 
          href: parent.href, 
          category: 'Main Menu' 
        });
      }
      // 2. Masukkan semua Children
      if (parent.children) {
        parent.children.forEach(child => {
          items.push({ 
            name: child.name, 
            href: child.href, 
            category: parent.name 
          });
        });
      }
    });

    items = [...items, ...hiddenSearchItems];
    return items;
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const results = searchableItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        (item.keywords && item.keywords.toLowerCase().includes(query)) 
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const isActive = (item) => {
    if (!item.href) return false;
    if (item.href === '/') return location.pathname === '/';
    return location.pathname.startsWith(item.href);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 font-sans ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <div className={`flex items-center transition-opacity duration-200 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
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
          {!isSearchOpen && (
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navigation.map((item, index) => (
                <div key={index} className="relative group">
                  {item.children ? (
                    <div className="px-4 py-3 rounded-md text-base font-medium flex items-center gap-2 cursor-default text-gray-700 hover:text-blue-600 hover:bg-gray-50">
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
                        ${isActive(item) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* DROPDOWN HOVER */}
                  {item.children && (
                    <div className="absolute left-0 mt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 pt-2 z-50">
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
          )}

          {/* SEARCH BAR COMPONENT */}
          <div className={`flex items-center ${isSearchOpen ? 'flex-1 ml-4 justify-end' : ''}`}>
            {isSearchOpen ? (
              <div className="relative w-full max-w-lg transition-all duration-300">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700"
                    placeholder="Cari menu, diagram, atau dokumen..."
                    value={searchQuery}
                    onChange={handleSearch}
                    onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button onClick={closeSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500">
                     <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
                </div>

                {/* SEARCH RESULTS DROPDOWN */}
                {searchQuery && (
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50 ring-1 ring-black ring-opacity-5">
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((result, idx) => (
                          <Link
                            key={idx}
                            to={result.href}
                            onClick={closeSearch}
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                          >
                            <div className="text-sm font-semibold text-blue-600 mb-0.5">{result.category}</div>
                            <div className="text-gray-800 font-medium">{result.name}</div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
                        Tidak ditemukan hasil untuk "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                aria-label="Search"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}

            {/* HAMBURGER BUTTON (Mobile) */}
            {!isSearchOpen && (
              <div className="flex items-center lg:hidden ml-2">
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
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isOpen && !isSearchOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
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
                      ${isActive(item) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                  >
                    {item.name}
                  </Link>
                )}
                {item.children && (
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="p-3 ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg className={`w-6 h-6 transition-transform duration-200 ${openSubmenu === index ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {item.children && (
                <div className={`overflow-hidden transition-all duration-300 ${openSubmenu === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4 pr-2 space-y-1 border-l-2 border-blue-100 ml-3 mt-1 mb-2">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2.5 rounded-md text-base font-medium transition-colors
                          ${location.pathname === subItem.href ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
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