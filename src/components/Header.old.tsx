import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Bell, Store, Truck, Box, Shield, ShoppingBag } from 'lucide-react';
import ChatButton from './ChatButton';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
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
    const onUpdate = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail || {};
        const count = typeof detail.unreadCount === 'number' ? detail.unreadCount : 0;
        setHeaderNotifCount(count);
      } catch (err) { /* ignore */ }
    };
    window.addEventListener('notifications-updated', onUpdate as EventListener);
    return () => window.removeEventListener('notifications-updated', onUpdate as EventListener);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-gradient-to-b from-white via-white to-white/95'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/landing" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <ShoppingBag className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </motion.div>
            
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900">تجارتنا الذكية</span>
              <span className="text-xs text-gray-500 font-medium">منصة التجارة الإلكترونية</span>
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
                
                {user?.role === 'admin' && (
                  <NavLink to="/admin" active={location.pathname === '/admin'}>
                    <Shield className="w-4 h-4" />
                    لوحة التحكم
                  </NavLink>
                )}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.dispatchEvent(new Event('open-notifications'))}
                  className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  {headerNotifCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {headerNotifCount > 99 ? '99+' : headerNotifCount}
                    </span>
                  )}
                </motion.button>

                {/* Chat */}
                <ChatButton
                  variant="inline"
                  ariaLabel="فتح المحادثات"
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => window.dispatchEvent(new Event('open-chat'))}
                  hasNotifications={false}
                  notificationCount={0}
                />

                {/* Profile */}
                <div className="relative hidden lg:block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleProfile}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{user?.name}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
                          <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{user?.email}</p>
                          {user?.role && (
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-600 rounded-lg text-xs text-white font-bold">
                              {getRoleDisplayName()}
                            </span>
                          )}
                        </div>

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span className="font-semibold">الملف الشخصي</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-semibold">تسجيل الخروج</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-bold text-sm transition-colors duration-200"
                >
                  تسجيل الدخول
                </Link>
                
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  إنشاء حساب
                </Link>
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
                  <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>اتصل بنا</MobileNavLink>
                  
                  <div className="pt-4 space-y-2 border-t border-gray-200">
                    <Link
                      to="/contact"
                      className="block px-4 py-3 text-center text-gray-700 hover:text-blue-600 font-bold rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      تسجيل الدخول
                    </Link>
                    
                    <Link
                      to="/contact"
                      className="block px-4 py-3 text-center text-white font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      إنشاء حساب
                    </Link>
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

                  {user?.role === 'admin' && (
                    <MobileNavLink to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Shield className="w-5 h-5" />
                      لوحة التحكم
                    </MobileNavLink>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-semibold">الملف الشخصي</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-semibold">تسجيل الخروج</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// NavLink Component
const NavLink = ({ to, active, children }: { to: string; active?: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
    }`}
  >
    {children}
  </Link>
);

// MobileNavLink Component
const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-xl font-semibold transition-colors"
  >
    {children}
  </Link>
);

export default Header;

