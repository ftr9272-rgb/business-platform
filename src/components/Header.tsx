import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Bell, Store, Truck, Box, Shield, Home } from 'lucide-react';
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
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 relative">
          {/* الشعار */}
          <div className="flex items-center gap-4">
            <Link to="/landing" className="flex items-center space-x-3 space-x-reverse group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path 
                    fill="currentColor" 
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                  />
                </svg>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent font-heading">تجارتنا</span>
                <span className="text-xs text-gray-500 font-arabic -mt-1">منصة التجارة الإلكترونية</span>
              </div>
            </Link>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/landing" 
                title="العودة إلى الصفحة الرئيسية" 
                aria-label="العودة إلى الصفحة الرئيسية" 
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
              >
                <Home className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </Link>
            </motion.div>
          </div>

          {/* قائمة التنقل للشاشات الكبيرة */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-arabic font-medium relative group"
                >
                  <span>الرئيسية</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/enhanced-marketplace" 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-arabic font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-700"
                  >
                    <Store className="w-4 h-4" />
                    <span>السوق المشترك</span>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/exhibitions" 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-arabic font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-700"
                  >
                    <span>المعارض</span>
                  </Link>
                </motion.div>
                
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-arabic font-medium relative group"
                >
                  <span>اتصل بنا</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3 space-x-reverse">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/enhanced-marketplace" 
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/15 to-purple-600/15 hover:from-blue-500/25 hover:to-purple-600/25 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 font-arabic text-gray-700 hover:text-blue-600 shadow-sm hover:shadow-md"
                  >
                    <Store className="w-4 h-4" />
                    <span className="font-medium">السوق المشترك</span>
                  </Link>
                </motion.div>

                {/* أيقونة الإشعارات */}
                <div className="relative flex items-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.dispatchEvent(new Event('open-notifications'))} 
                    aria-label="فتح الإشعارات" 
                    className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 relative group"
                  >
                    <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    {headerNotifCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {headerNotifCount > 99 ? '99+' : headerNotifCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Chat button */}
                  <ChatButton
                    variant="inline"
                    ariaLabel="فتح المحادثات"
                    className="p-0"
                    onClick={() => window.dispatchEvent(new Event('open-chat'))}
                    hasNotifications={false}
                    notificationCount={0}
                  />
                </div>
                
                {/* روابط لوحات التحكم */}
                {user?.role === 'shipping_company' && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/shipping" 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/15 to-blue-500/10 hover:from-blue-500/25 hover:to-blue-500/15 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 font-arabic text-gray-700 hover:text-blue-600 shadow-sm hover:shadow-md"
                    >
                      <Truck className="w-4 h-4" />
                      <span className="font-medium">لوحة التحكم</span>
                    </Link>
                  </motion.div>
                )}
                
                {user?.role === 'merchant' && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/merchant" 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500/15 to-green-500/10 hover:from-green-500/25 hover:to-green-500/15 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 font-arabic text-gray-700 hover:text-green-600 shadow-sm hover:shadow-md"
                    >
                      <Store className="w-4 h-4" />
                      <span className="font-medium">لوحة التحكم</span>
                    </Link>
                  </motion.div>
                )}
                
                {user?.role === 'supplier' && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/supplier" 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/15 to-purple-500/10 hover:from-purple-500/25 hover:to-purple-500/15 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 font-arabic text-gray-700 hover:text-purple-600 shadow-sm hover:shadow-md"
                    >
                      <Box className="w-4 h-4" />
                      <span className="font-medium">لوحة التحكم</span>
                    </Link>
                  </motion.div>
                )}
                
                {user?.role === 'admin' && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/admin" 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500/15 to-red-500/10 hover:from-red-500/25 hover:to-red-500/15 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 font-arabic text-gray-700 hover:text-red-600 shadow-sm hover:shadow-md"
                    >
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">لوحة التحكم</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            )}
          </nav>

          {/* أدوات الهيدر */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {isAuthenticated ? (
              <div className="relative flex items-center gap-2">
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={toggleProfile} 
                    className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-arabic text-gray-700 font-medium">{user?.name}</span>
                  </motion.button>

                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                        <p className="text-sm font-arabic text-gray-800 font-bold">{user?.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{user?.email}</p>
                        {user?.role && (
                          <span className="inline-block mt-2 px-3 py-1 bg-white rounded-full text-xs text-blue-600 font-medium shadow-sm">
                            {getRoleDisplayName()}
                          </span>
                        )}
                      </div>

                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-2 space-x-reverse px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 font-arabic group" 
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        <span className="group-hover:text-blue-600 transition-colors">الملف الشخصي</span>
                      </Link>

                      <button 
                        onClick={handleLogout} 
                        className="flex items-center space-x-2 space-x-reverse px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-300 w-full font-arabic group"
                      >
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-arabic font-medium"
                >
                  تسجيل الدخول
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-arabic font-medium shadow-md hover:shadow-lg"
                  >
                    إنشاء حساب
                  </Link>
                </motion.div>
              </div>
            )}

            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={toggleMenu} 
              className="md:hidden p-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 transition-all duration-300 shadow-sm" 
              aria-label="قائمة التنقل"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </motion.button>
          </div>
        </div>

        {/* قائمة التنقل للموبايل */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 rounded-b-xl"
          >
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  الرئيسية
                </Link>
                <Link 
                  to="/enhanced-marketplace" 
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Store className="w-4 h-4" />
                  <span>السوق المشترك</span>
                </Link>
                <Link 
                  to="/exhibitions" 
                  className="text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  المعارض
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  اتصل بنا
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/enhanced-marketplace" 
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Store className="w-4 h-4" />
                  <span>السوق المشترك</span>
                </Link>
                
                {user?.role === 'shipping_company' && (
                  <Link 
                    to="/shipping" 
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Truck className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'merchant' && (
                  <Link 
                    to="/merchant" 
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Store className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'supplier' && (
                  <Link 
                    to="/supplier" 
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Box className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
              </div>
            )}
          </motion.nav>
        )}
      </div>
    </header>
  );
}

export default Header;

