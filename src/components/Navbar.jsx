import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

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
        { name: 'Architecture Principles', href: '/vision/principles', keywords:'Arsitektur, Standardization, Collaboration, data Quality' },
        { name: 'Architecture Goals', href: '/vision/goals', keywords: 'Arsitektur' },
        { name: 'Organization Decomposition Diagram', href: '/vision/organization', keywords:'Diagram, Kepala stasiun, Koordinator, Anggota' },
        { name: 'Stakeholder Catalog', href: '/vision/stakeholder', keywords:'Stekholder, Katalog, Peran, Kepentingan' },
        { name: 'Solution Concept Diagram', href: '/vision/solution', keywords:'Diagram, Solusi, User Layer' },
        { name: 'Value Chain', href: '/vision/value-chain', keywords:'Aktivitas Pendukung, Aktifitas Utama' },
        { name: 'Vision, Mission and Corporate Strategy', href: '/vision/strategy', keywords:'Visi, Misi, Map, Strategi' },
        { name: 'Business Canvas Model', href: '/vision/business-model-canvas' },
      ]
    },
    { 
      name: 'Business Arch', 
      href: null, 
      children: [
        { name: 'Business Process - Application Matrix', href: '/business/appMatrix' },
        { name: 'Business Process - Data Matrix', href: '/business/dataMatrix' },
        { name: 'Risk', href: '/business/risk' },
        { name: 'Organizational Actor Catalog', href: '/business/organizational', keywords:'Jabatan, Katalog, Aktor, Pimpinan' },
        { name: 'Business Process - Risk Matrix', href: '/business/RiskMatrix', keywords: 'Corporate, Korporat' },
        { name: 'Functional Decomposition Diagram', href: '/business/functional', keywords: 'Fungsi bisnis, Tugas, Level' },
        { name: 'Business Process', href: '/business/probis', keywords:'Bisnis proses, Proses Bisnis Leveel 0-1' },
        { name: 'Business Interaction', href: '/business/Interaction', keywords:'Bisnis Interkasi, Business Interaction, Support, Internal, eksternal' },
        { name: 'Corporate Governance', href: '/business/corporate_governance', keywords:'Legal Foundation, Dsar hukum, undang-undang, UU, Perpres, PP, international standards, Operational Procedures, Peta konsep, Business process map, renstra, SOP, ISO, UU' },
        { name: 'Business Principles', href: '/business/businessprinciples' },
        { name: 'KPI', href: '/business/kpi', keywords:'Teknisi, Datin, TU, Observasi, WMM' },
        { name: 'Business Process - KPI Matrix', href: '/business/businessprocess-kpimatrix' },
        { name: 'Business Model Canvas', href:'/vision/business-model-canvas'},
      ]
    },
    {
      name: 'Data Arch', 
      href: '/data',
      children: [
        { name: 'Application - Data Matrix',                href: '/data/application-matrix' },
        { name: 'Conceptual Data Diagram',                  href: '/data/concept' },
        { name: 'Data Entity - Business Functional Matrix', href: '/data/function-matrix' },
        { name: 'Data Entity - Data Component Catalog',     href: '/data/component-catalog' },
        { name: 'Data Principles',                          href: '/data/principles' },
        { name: 'Logical Data Diagram',                     href: '/data/logical-data-diagram' },
      ]
    },
    { 
      name: 'Application', 
      href: null, 
      children: [
        { name: 'Application Use Case Diagram',             href: '/app/usecase' },
        { name: 'Application Portfolio Catalog',            href: '/app/portfolio-catalog' },
        { name: 'Application Principles',                   href: '/app/principles' },
        { name: 'Application - Business Process Matrix',    href: '/app/process-matrix' },
        { name: 'Application - Classification Matrix',      href: '/app/classification-matrix' },
        { name: 'Application - Communication Diagram',      href: '/app/communication-diagram' },
        { name: 'Application - Organization Matrix',        href: '/app/organization-matrix' },
        { name: 'Application - Portofolio Assessment',      href: '/app/portofolio-assesment' },
        { name: 'Application - User and Location Diagram',  href: '/app/AppUserLocation' },
      ]
    },
    { 
      name: 'Technology', 
      href: null, 
      children: [
        { name: 'Environment and Location Diagram', href: '/tech/environment-diagram' },
        { name: 'Network Communication Diagram',    href: '/tech/network-communication-diagram' },
        { name: 'Technology - Application Matrix',  href: '/tech/application-matrix' },
        { name: 'Technology Principles',            href: '/tech/technology-principles' },
        { name: 'Technology Standard Catalog',      href: '/tech/standards-catalog' },
      ]
    },
    { 
      name: 'Architecture Implementation', 
      href: null, 
      children: [
        { name: 'Architecture Implementation Planning', href: '/imp/planning' },
        { name: 'Architecture Governance',              href: '/imp/governance' },
      ]
    },
  ];

  const hiddenSearchItems = [
    { name: 'SOP Operasional Teknisi', href: '/', category: 'Dok', keywords: ''},
  ];

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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-inner">
          
          {/* LOGO */}
          <div className="navbar-logo">
            <Link to="/" className="navbar-logo-link">
              <div className="navbar-logo-icon">
                <span>EA</span>
              </div>
              <div className="navbar-logo-text">
                <span className="navbar-logo-title">EA BMKG</span>
                <span className="navbar-logo-subtitle">Balikpapan</span>
              </div>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="navbar-menu-desktop">
            {navigation.map((item, index) => (
              <div key={index} className="navbar-menu-item">
                
                {item.children ? (
                  <div className="navbar-menu-dropdown-trigger">
                    <span>{item.name}</span>
                    <svg className="navbar-menu-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`navbar-menu-link ${isActive(item) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* DROPDOWN */}
                {item.children && (
                  <div className="navbar-dropdown">
                    <div className="navbar-dropdown-spacer"></div>
                    <div className="navbar-dropdown-content">
                      <div className="navbar-dropdown-inner">
                        {item.children.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className={`navbar-dropdown-link ${location.pathname === subItem.href ? 'active' : ''}`}
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
          <div className="navbar-search">
            <button className="navbar-search-button" onClick={toggleSearch}>
              <svg className="navbar-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* HAMBURGER BUTTON */}
          <div className="navbar-mobile-toggle">
            <button onClick={() => setIsOpen(!isOpen)} className="navbar-hamburger">
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="navbar-hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="navbar-hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="navbar-search-modal">
          <div className="navbar-search-modal-content">
            <div className="navbar-search-modal-header">
              <input
                type="text"
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={handleSearch}
                className="navbar-search-input"
                autoFocus
              />
              <button onClick={closeSearch} className="navbar-search-close">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="navbar-search-results">
                {searchResults.map((result, index) => (
                  <Link
                    key={index}
                    to={result.href}
                    onClick={closeSearch}
                    className="navbar-search-result-item"
                  >
                    <div className="navbar-search-result-name">{result.name}</div>
                    <div className="navbar-search-result-category">{result.category}</div>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <div className="navbar-search-no-results">
                Tidak ada hasil ditemukan
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`navbar-mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-menu-inner">
          {navigation.map((item, index) => (
            <div key={index} className="navbar-mobile-menu-item">
              <div className="navbar-mobile-menu-header">
                
                {item.children ? (
                  <div className="navbar-mobile-menu-label">{item.name}</div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`navbar-mobile-menu-link ${isActive(item) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
                
                {item.children && (
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="navbar-mobile-submenu-toggle"
                  >
                    <svg 
                      className={`navbar-mobile-submenu-icon ${openSubmenu === index ? 'open' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              
              {item.children && (
                <div className={`navbar-mobile-submenu ${openSubmenu === index ? 'open' : ''}`}>
                  <div className="navbar-mobile-submenu-inner">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`navbar-mobile-submenu-link ${location.pathname === subItem.href ? 'active' : ''}`}
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