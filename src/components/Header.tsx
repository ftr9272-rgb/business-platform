import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Bell, Store, Truck, Box, Shield, ShoppingBag } from 'lucide-react';
import ChatButton from './ChatButton';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to get role display name
  const getRoleDisplayName = () => {
    if (!user) return '';
    switch (user.role) {
      case 'merchant':
        return 'تاجر';
      case 'supplier':
        return 'مورد';
      case 'shipping_company':
        return 'شركة شحن';
      case 'admin':
        return 'مدير النظام';
      default:
        return '';
    }
  };

  // notification badge count
  const [headerNotifCount, setHeaderNotifCount] = useState<number>(0);

  useEffect(() => {
    const onNotifUpdate = (event: CustomEvent) => {
      setHeaderNotifCount(event.detail?.unreadCount ?? 0);
    };
    window.addEventListener('notification-update', onNotifUpdate as EventListener);
    return () => {
      window.removeEventListener('notification-update', onNotifUpdate as EventListener);
    };
  }, []);

  // NavLink component
  const NavLink = ({ to, active, children, className = '' }: any) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
        active
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
          : 'text-gray-700 hover:bg-gray-100'
      } ${className}`}
    >
      {children}
    </Link>
  );

  // MobileNavLink component
  const MobileNavLink = ({ to, onClick, children }: any) => (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 font-bold transition-colors flex items-center gap-3"
    >
      {children}
    </Link>
  );

  return (
    <>
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={isAuthenticated ? `/${user?.role}` : '/landing'} className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200"
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  تجارتنا الذكية
                </h1>
                <p className="text-xs text-gray-500 font-medium">منصة التجارة الإلكترونية</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {!isAuthenticated ? (
                <>
                  <NavLink to="/landing" active={location.pathname === '/landing'}>الرئيسية</NavLink>
                  <NavLink to="/enhanced-marketplace" active={location.pathname === '/enhanced-marketplace'}>السوق المشترك</NavLink>
                  <NavLink to="/exhibitions" active={location.pathname === '/exhibitions'}>المعارض</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/enhanced-marketplace" active={location.pathname === '/enhanced-marketplace'}>
                    <Store className="w-4 h-4" />
                    السوق المشترك
                  </NavLink>

                  {user?.role === 'merchant' && (
                    <NavLink to="/merchant" active={location.pathname === '/merchant'}>
                      <Store className="w-4 h-4" />
                      لوحة التحكم
                    </NavLink>
                  )}
                  
                  {user?.role === 'supplier' && (
                    <NavLink to="/supplier" active={location.pathname === '/supplier'}>
                      <Box className="w-4 h-4" />
                      لوحة التحكم
                    </NavLink>
                  )}
                  
                  {user?.role === 'shipping_company' && (
                    <NavLink to="/shipping" active={location.pathname === '/shipping'}>
                      <Truck className="w-4 h-4" />
                      لوحة التحكم
                    </NavLink>
                  )}
                </>
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <ChatButton />
              
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleProfile}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                        <p className="text-xs text-gray-500">{getRoleDisplayName()}</p>
                      </div>
                    </div>
                  </motion.button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                          <p className="text-white font-bold">{user?.name}</p>
                          <p className="text-white/80 text-sm">{user?.email}</p>
                          <p className="text-white/70 text-xs mt-1">{getRoleDisplayName()}</p>
                        </div>
                        
                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <User className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700 font-medium">الملف الشخصي</span>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                          >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">تسجيل الخروج</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <button
                    onClick={openLoginModal}
                    className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-bold text-sm transition-colors duration-200"
                  >
                    تسجيل الدخول
                  </button>
                  
                  <button
                    onClick={openRegisterModal}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    إنشاء حساب
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {!isAuthenticated ? (
                <>
                  <MobileNavLink to="/landing" onClick={() => setIsMenuOpen(false)}>الرئيسية</MobileNavLink>
                  <MobileNavLink to="/enhanced-marketplace" onClick={() => setIsMenuOpen(false)}>السوق المشترك</MobileNavLink>
                  <MobileNavLink to="/exhibitions" onClick={() => setIsMenuOpen(false)}>المعارض</MobileNavLink>
                  
                  <div className="pt-4 space-y-2 border-t border-gray-200">
                    <button
                      onClick={openLoginModal}
                      className="w-full block px-4 py-3 text-center text-gray-700 hover:text-blue-600 font-bold rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-colors"
                    >
                      تسجيل الدخول
                    </button>
                    
                    <button
                      onClick={openRegisterModal}
                      className="w-full block px-4 py-3 text-center text-white font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
                    >
                      إنشاء حساب
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <MobileNavLink to="/enhanced-marketplace" onClick={() => setIsMenuOpen(false)}>
                    <Store className="w-5 h-5" />
                    السوق المشترك
                  </MobileNavLink>

                  {user?.role === 'merchant' && (
                    <MobileNavLink to="/merchant" onClick={() => setIsMenuOpen(false)}>
                      <Store className="w-5 h-5" />
                      لوحة التحكم
                    </MobileNavLink>
                  )}
                  
                  {user?.role === 'supplier' && (
                    <MobileNavLink to="/supplier" onClick={() => setIsMenuOpen(false)}>
                      <Box className="w-5 h-5" />
                      لوحة التحكم
                    </MobileNavLink>
                  )}
                  
                  {user?.role === 'shipping_company' && (
                    <MobileNavLink to="/shipping" onClick={() => setIsMenuOpen(false)}>
                      <Truck className="w-5 h-5" />
                      لوحة التحكم
                    </MobileNavLink>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl hover:bg-gray-100 font-bold transition-colors flex items-center gap-3"
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">الملف الشخصي</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">تسجيل الخروج</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}

export default Header;

