import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Bell, Store, Truck, Box, Shield, Home, ShoppingBag } from 'lucide-react';
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
    <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-16 relative">
          
          {/* الشعار على اليمين */}
          <div className="flex items-center gap-4 order-3 md:order-1">
            <Link to="/landing" className="flex items-center space-x-2 space-x-reverse group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="w-7 h-7 text-blue-400" />
                <span className="text-2xl font-bold text-white font-heading">تجارتنا الذكية</span>
              </motion.div>
            </Link>
          </div>

          {/* قائمة التنقل في المنتصف */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse order-2">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/enhanced-marketplace" 
                  className="text-white hover:text-blue-300 transition-all duration-300 font-arabic font-medium text-base"
                >
                  السوق المشترك
                </Link>
                
                <Link 
                  to="/exhibitions" 
                  className="text-white hover:text-blue-300 transition-all duration-300 font-arabic font-medium text-base"
                >
                  المعارض
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link 
                  to="/enhanced-marketplace" 
                  className="text-white hover:text-blue-300 transition-all duration-300 font-arabic font-medium text-base flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span>السوق المشترك</span>
                </Link>

                {/* أيقونة الإشعارات */}
                <div className="relative flex items-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.dispatchEvent(new Event('open-notifications'))} 
                    aria-label="فتح الإشعارات" 
                    className="p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300 relative"
                  >
                    <Bell className="w-5 h-5 text-white" />
                    {headerNotifCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
                  <Link 
                    to="/shipping" 
                    className="text-white hover:text-blue-300 transition-all duration-300 font-arabic font-medium text-base flex items-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'merchant' && (
                  <Link 
                    to="/merchant" 
                    className="text-white hover:text-blue-300 transition-all duration-300 font-arabic font-medium text-base flex items-center gap-2"
                  >
                    <Store className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'supplier' && (
                  <Link 
                    to="/supplier" 
                    className="text-white hover:text-blue-300 transition-all duration-300 font-arabic font-medium text-base flex items-center gap-2"
                  >
                    <Box className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-white hover:text-blue-300 transition-all duration-300 font-arabic font-medium text-base flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
              </div>
            )}
          </nav>

          {/* الأزرار على اليسار */}
          <div className="flex items-center space-x-3 space-x-reverse order-1 md:order-3">
            {isAuthenticated ? (
              <div className="relative flex items-center gap-2">
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={toggleProfile} 
                    className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all duration-300 border border-slate-600"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-arabic text-white font-medium">{user?.name}</span>
                  </motion.button>

                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-slate-700/50 border-b border-slate-600">
                        <p className="text-sm font-arabic text-white font-bold">{user?.name}</p>
                        <p className="text-xs text-slate-300 mt-0.5">{user?.email}</p>
                        {user?.role && (
                          <span className="inline-block mt-2 px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-300 font-medium border border-blue-500/30">
                            {getRoleDisplayName()}
                          </span>
                        )}
                      </div>

                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-2 space-x-reverse px-4 py-3 text-sm text-slate-200 hover:bg-slate-700/50 transition-all duration-300 font-arabic group" 
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        <span className="group-hover:text-white transition-colors">الملف الشخصي</span>
                      </Link>

                      <button 
                        onClick={handleLogout} 
                        className="flex items-center space-x-2 space-x-reverse px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full font-arabic group"
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-all duration-300 font-arabic font-medium shadow-lg hover:shadow-xl text-base"
                  >
                    تسجيل الدخول
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg transition-all duration-300 font-arabic font-medium shadow-lg hover:shadow-xl text-base"
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
              className="md:hidden p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all duration-300" 
              aria-label="قائمة التنقل"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </motion.button>
          </div>
        </div>

        {/* قائمة التنقل للموبايل */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-slate-700/50 bg-slate-800/50 rounded-b-xl"
          >
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/enhanced-marketplace" 
                  className="text-white hover:text-blue-300 hover:bg-slate-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  السوق المشترك
                </Link>
                <Link 
                  to="/exhibitions" 
                  className="text-white hover:text-blue-300 hover:bg-slate-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  المعارض
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/enhanced-marketplace" 
                  className="flex items-center gap-2 text-white hover:text-blue-300 hover:bg-slate-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Store className="w-4 h-4" />
                  <span>السوق المشترك</span>
                </Link>
                
                {user?.role === 'shipping_company' && (
                  <Link 
                    to="/shipping" 
                    className="flex items-center gap-2 text-white hover:text-blue-300 hover:bg-slate-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Truck className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'merchant' && (
                  <Link 
                    to="/merchant" 
                    className="flex items-center gap-2 text-white hover:text-blue-300 hover:bg-slate-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Store className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'supplier' && (
                  <Link 
                    to="/supplier" 
                    className="flex items-center gap-2 text-white hover:text-blue-300 hover:bg-slate-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Box className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-2 text-white hover:text-blue-300 hover:bg-slate-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-arabic font-medium"
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

