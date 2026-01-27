import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
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
        { name: 'Architecture Principles',                href: '/vision/principles' },
        { name: 'Architecture Goals',                     href: '/vision/goals' },
        { name: 'Business Canvas Model',                  href: '/vision/business-model-canvas' },
        { name: 'Organization Decomposition Diagram',     href: '/vision/organization' },
        { name: 'Stakeholder Catalog',                    href: '/vision/stakeholder' },
        { name: 'Solution Concept Diagram',               href: '/vision/solution' },
        { name: 'Value Chain',                            href: '/vision/value-chain' },
        { name: 'Vision, Mission and Corporate Strategy', href: '/vision/strategy' },
      ]
    },
    { 
      name: 'Business Arch', 
      href: null, 
      children: [
        { name: 'Business Interaction',                   href: '/business/interaction' },
        { name: 'Business Principles',                    href: '/business/principles' },
        { name: 'Business Process',                       href: '/business/process' },
        { name: 'Business Process - Application Matrix',  href: '/business/application-matrix' },
        { name: 'Business Process - Data Matrix',         href: '/business/data-matrix' },
        { name: 'Business Process - Risk Matrix',         href: '/business/risk-matrix' },
        { name: 'Corporate Governance',                   href: '/business/corporate-governance' },
        { name: 'Functional Decomposition Diagram',       href: '/business/functional-decomposition-diagram' },
        { name: 'KPI',                                    href: '/business/kpi' },
        { name: 'Organizational Actor Catalog',           href: '/business/organizational' },
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
        { name: 'Application Use Case Diagram',             href: '/app/usecase-diagram' },
        { name: 'Application Portfolio Catalog',            href: '/app/portfolio-catalog' },
        { name: 'Application Principles',                   href: '/app/principles' },
        { name: 'Application - Business Process Matrix',    href: '/app/process-matrix' },
        { name: 'Application - Classification Matrix',      href: '/app/classification-matrix' },
        { name: 'Application - Communication Diagram',      href: '/app/communication-diagram' },
        { name: 'Application - Organization Matrix',        href: '/app/organization-matrix' },
        { name: 'Application - Portofolio Assessment',      href: '/app/portofolio-assesment' },
        { name: 'Application - User and Location Diagram',  href: '/app' },
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
        { name: 'Architecture Implementation Planning', href: '/implementation/planning' },
        { name: 'Architecture Governance',              href: '/implementation/governance' },
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
            <button className="navbar-search-button">
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