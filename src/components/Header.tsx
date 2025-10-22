import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Bell, Store, Truck, Box, Shield, Home, ShoppingBag, Sparkles } from 'lucide-react';
import ChatButton from './ChatButton';

import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

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
        // @ts-ignore
        const detail = (e as CustomEvent).detail || {};
        const count = typeof detail.unreadCount === 'number' ? detail.unreadCount : 0;
        setHeaderNotifCount(count);
      } catch (err) { /* ignore */ }
    };
    window.addEventListener('notifications-updated', onUpdate as EventListener);
    return () => window.removeEventListener('notifications-updated', onUpdate as EventListener);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500"></div>
      
      <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Left Side */}
            <Link to="/landing" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                
                {/* Icon */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <ShoppingBag className="w-7 h-7 text-white" strokeWidth={2.5} />
                  <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              
              {/* Logo text */}
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  تجارتنا
                </span>
                <span className="text-xs font-semibold text-gray-500 -mt-1">
                  منصة التجارة الذكية
                </span>
              </div>
            </Link>

            {/* Navigation - Center */}
            <nav className="hidden md:flex items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/landing"
                    className="relative px-5 py-2.5 text-gray-700 hover:text-blue-600 font-semibold text-base transition-all duration-300 group"
                  >
                    <span className="relative z-10">الرئيسية</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                  </Link>
                  
                  <Link
                    to="/enhanced-marketplace"
                    className="relative px-5 py-2.5 text-gray-700 hover:text-blue-600 font-semibold text-base transition-all duration-300 group"
                  >
                    <span className="relative z-10">السوق المشترك</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                  </Link>
                  
                  <Link
                    to="/exhibitions"
                    className="relative px-5 py-2.5 text-gray-700 hover:text-purple-600 font-semibold text-base transition-all duration-300 group"
                  >
                    <span className="relative z-10">المعارض</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="relative px-5 py-2.5 text-gray-700 hover:text-cyan-600 font-semibold text-base transition-all duration-300 group"
                  >
                    <span className="relative z-10">اتصل بنا</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/enhanced-marketplace"
                    className="relative px-5 py-2.5 text-gray-700 hover:text-blue-600 font-semibold text-base transition-all duration-300 group flex items-center gap-2"
                  >
                    <Store className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">السوق المشترك</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                  </Link>

                  {/* Dashboard links */}
                  {user?.role === 'shipping_company' && (
                    <Link
                      to="/shipping"
                      className="relative px-5 py-2.5 text-gray-700 hover:text-orange-600 font-semibold text-base transition-all duration-300 group flex items-center gap-2"
                    >
                      <Truck className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">لوحة التحكم</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                    </Link>
                  )}
                  
                  {user?.role === 'merchant' && (
                    <Link
                      to="/merchant"
                      className="relative px-5 py-2.5 text-gray-700 hover:text-purple-600 font-semibold text-base transition-all duration-300 group flex items-center gap-2"
                    >
                      <Store className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">لوحة التحكم</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                    </Link>
                  )}
                  
                  {user?.role === 'supplier' && (
                    <Link
                      to="/supplier"
                      className="relative px-5 py-2.5 text-gray-700 hover:text-green-600 font-semibold text-base transition-all duration-300 group flex items-center gap-2"
                    >
                      <Box className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">لوحة التحكم</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                    </Link>
                  )}
                  
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="relative px-5 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 group flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">لوحة التحكم</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"></div>
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* Actions - Right Side */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.dispatchEvent(new Event('open-notifications'))}
                    className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                  >
                    <Bell className="w-5 h-5 text-gray-700" />
                    {headerNotifCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                        {headerNotifCount > 99 ? '99+' : headerNotifCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Chat */}
                  <ChatButton
                    variant="inline"
                    ariaLabel="فتح المحادثات"
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                    onClick={() => window.dispatchEvent(new Event('open-chat'))}
                    hasNotifications={false}
                    notificationCount={0}
                  />

                  {/* Profile */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleProfile}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 border border-gray-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="hidden sm:block text-sm font-bold text-gray-800">{user?.name}</span>
                    </motion.button>

                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 overflow-hidden"
                      >
                        <div className="px-4 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-gray-200">
                          <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{user?.email}</p>
                          {user?.role && (
                            <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs text-white font-bold shadow-lg">
                              {getRoleDisplayName()}
                            </span>
                          )}
                        </div>

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-300 group"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          <span className="font-semibold group-hover:text-blue-600 transition-colors">الملف الشخصي</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-300 w-full group"
                        >
                          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold">تسجيل الخروج</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
                    <Link
                      to="/contact"
                      className="px-6 py-2.5 text-gray-700 hover:text-blue-600 font-bold text-base transition-all duration-300 rounded-xl border-2 border-gray-300 hover:border-blue-400"
                    >
                      تسجيل الدخول
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
                    <Link
                      to="/contact"
                      className="relative px-6 py-2.5 text-white font-bold text-base rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 group-hover:from-cyan-600 group-hover:via-blue-600 group-hover:to-purple-700 transition-all duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        إنشاء حساب
                        <Sparkles className="w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                </>
              )}

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className="md:hidden p-2.5 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-6 space-y-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/landing"
                    className="block px-5 py-3 text-gray-700 hover:text-blue-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    الرئيسية
                  </Link>
                  
                  <Link
                    to="/enhanced-marketplace"
                    className="block px-5 py-3 text-gray-700 hover:text-blue-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    السوق المشترك
                  </Link>
                  
                  <Link
                    to="/exhibitions"
                    className="block px-5 py-3 text-gray-700 hover:text-purple-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    المعارض
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="block px-5 py-3 text-gray-700 hover:text-cyan-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    اتصل بنا
                  </Link>
                  
                  <div className="pt-4 space-y-3 border-t border-gray-200">
                    <Link
                      to="/contact"
                      className="block px-5 py-3 text-center text-gray-700 hover:text-blue-600 font-bold text-base rounded-xl border-2 border-gray-300 hover:border-blue-400 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      تسجيل الدخول
                    </Link>
                    
                    <Link
                      to="/contact"
                      className="block px-5 py-3 text-center text-white font-bold text-base rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 shadow-lg transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      إنشاء حساب ✨
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/enhanced-marketplace"
                    className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-blue-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Store className="w-5 h-5" />
                    السوق المشترك
                  </Link>

                  {user?.role === 'merchant' && (
                    <Link
                      to="/merchant"
                      className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-purple-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Store className="w-5 h-5" />
                      لوحة التحكم
                    </Link>
                  )}

                  {user?.role === 'supplier' && (
                    <Link
                      to="/supplier"
                      className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-green-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Box className="w-5 h-5" />
                      لوحة التحكم
                    </Link>
                  )}

                  {user?.role === 'shipping_company' && (
                    <Link
                      to="/shipping"
                      className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-orange-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Truck className="w-5 h-5" />
                      لوحة التحكم
                    </Link>
                  )}

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-red-600 font-semibold text-base rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="w-5 h-5" />
                      لوحة التحكم
                    </Link>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

export default Header;

