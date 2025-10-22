import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Shield, BarChart3, Globe, Zap, Truck, ShoppingCart, Package, Award, Clock, Headphones, LogIn, Phone } from 'lucide-react';
import { useState } from 'react';

const LandingPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDemoLogin = async (email: string, password: string, role: string) => {
    setIsLoading(role);
    try {
      await login(email, password);
      // التوجيه حسب الدور الصحيح
      const routeMap: Record<string, string> = {
        'merchant': '/merchant',
        'supplier': '/supplier', 
        'shipping': '/shipping'
      };
      navigate(routeMap[role] || '/merchant');
    } catch (error) {
      console.error('Demo login failed:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const features = [
    {
      title: 'للموردين',
      description: 'إدارة المنتجات والطلبات والتواصل مع العملاء بسهولة',
      icon: Package,
      color: 'from-emerald-500 to-teal-600',
      features: ['عرض المنتجات', 'إدارة المخزون', 'تتبع الطلبات', 'تحليل المبيعات', 'استقبال طلبات التجار']
    },
    {
      title: 'للتجار',
      description: 'تصفح المنتجات وإدارة الطلبات والمدفوعات في مكان واحد',
      icon: ShoppingCart,
      color: 'from-blue-500 to-purple-600',
      features: ['تصفح المنتجات', 'اختيار المورد الأفضل', 'إدارة الطلبات', 'متابعة الشحنات', 'نشر طلبات الشراء']
    },
    {
      title: 'لشركات الشحن',
      description: 'خدمات لوجستية متطورة وحلول شحن مبتكرة',
      icon: Truck,
      color: 'from-orange-500 to-red-600',
      features: ['إدارة الشحنات', 'تتبع مباشر', 'تحسين المسارات', 'تقارير الأداء', 'إضافة عروض شحن للسوق واستقبال طلبات الشحن']
    }
  ];

  const benefits = [
    {
      title: 'أمان وموثوقية',
      description: 'حماية متقدمة للبيانات مع ضمان سرية المعاملات',
      icon: Shield,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      title: 'نمو الأعمال',
      description: 'زيادة فرص البيع والوصول لأسواق جديدة',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      title: 'توفير الوقت',
      description: 'أتمتة العمليات وتسريع إنجاز المهام',
      icon: Clock,
      color: 'bg-gradient-to-br from-purple-500 to-pink-600'
    },
    {
      title: 'دعم متواصل',
      description: 'فريق دعم فني متخصص على مدار الساعة',
      icon: Headphones,
      color: 'bg-gradient-to-br from-orange-500 to-red-600'
    }
  ];

  const pricingPlans = [
    {
      name: 'العضوية الحصرية',
      price: 'عضوية مدعوة',
      description: 'منصة حصرية للشركاء المعتمدين فقط',
      features: [
        'تحقق من الهوية والترخيص',
        'شبكة تجارية موثوقة',
        'أولوية في الدعم الفني',
        'أدوات تحليل متقدمة',
        'عمولة تنافسية على المبيعات'
      ],
      cta: 'طلب الانضمام كشريك',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Enhanced Background with richer gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500"></div>
        
        {/* Enhanced Animated glowing blobs */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/5 left-1/6 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-[128px] animate-pulse"></div>
          <div className="absolute top-1/3 right-1/6 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 py-32 md:py-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              {/* Enhanced Platform badge */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-5 py-2.5 bg-white/15 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                <Award className="w-5 h-5 ml-2" />
                منصة تجارية مخصصة للموردين، التجار، وشركات الشحن
              </motion.div>
              
              {/* Enhanced Main heading with glow effect */}
              <motion.h1 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl"
              >
                منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 animate-gradient">تجارتنا</span>
              </motion.h1>
              
              {/* Enhanced Slogan cards with glass morphism */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }} 
                className="mb-8"
              >
                <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
                  {/* Left card: slogan with enhanced styling */}
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white/15 backdrop-blur-lg border border-white/30 text-white/95 rounded-3xl p-8 max-w-xl w-full shadow-2xl hover:shadow-cyan-500/20 transition-all"
                  >
                    <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-tight drop-shadow-lg">
                      نحن ننظم السوق وقراراتكم الإدارية والمالية تخصكم.
                    </p>
                    <p className="mt-4 text-base text-white/90 font-medium">منصة تدعم الشفافية وتمكين القرار دون التدخل.</p>
                  </motion.div>

                  {/* Right card: subtitle with enhanced styling */}
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-2xl hover:shadow-blue-500/20 transition-all"
                  >
                    <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/95 leading-tight">
                      ربط الموردين والتجار وشركات الشحن في نظام موثوق وآمن
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Enhanced CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-5 justify-center mb-10"
              >
                {user ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={`/${user.role}`}
                      className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700 transition-all font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center transform hover:-translate-y-1 duration-300"
                    >
                      الذهاب إلى لوحة التحكم
                      <ArrowRight className="mr-3 w-6 h-6 group-hover:mr-4 transition-all" />
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/contact"
                        className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700 transition-all font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center transform hover:-translate-y-1 duration-300"
                      >
                        إنشاء حساب مجاني
                        <ArrowRight className="mr-3 w-6 h-6 group-hover:mr-4 transition-all" />
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/contact"
                        className="group bg-white/15 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl hover:bg-white/25 hover:border-white/50 transition-all font-bold text-lg flex items-center justify-center transform hover:-translate-y-1 duration-300 shadow-lg"
                      >
                        تسجيل الدخول
                        <LogIn className="mr-3 w-6 h-6 group-hover:mr-4 transition-all" />
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="fill-white">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-28 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent mb-6"
            >
              حلول متكاملة لجميع أطراف التجارة
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              منصة شاملة تلبي احتياجات الموردين والتجار وشركات الشحن في مكان واحد
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-10">
                    <motion.div 
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg`}
                    >
                      <feature.icon className="w-10 h-10" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-5 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-700 text-lg mb-8 leading-relaxed">{feature.description}</p>
                    
                    <ul className="space-y-4 mb-8">
                      {feature.features.map((benefit, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-800 text-base"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500 ml-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Benefits Section */}
      <div className="py-28 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
              لماذا تختار منصة تجارتنا؟
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              مميزات فريدة تضعك في المقدمة وتضمن نجاح أعمالك التجارية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                {/* Glass morphism card */}
                <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50 text-center">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Demo Section */}
      <div className="py-32 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">ابدأ الآن</h2>
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
                ادخل الآن لتجربة لوحات التحكم
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Enhanced Merchant Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 h-full shadow-2xl">
                  <div className="text-center">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl shadow-lg"
                    >
                      🛒
                    </motion.div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">لوحة التاجر</h4>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      البحث عن المنتجات والموردين المناسبين مع إدارة الطلبات والمشتريات بكفاءة عالية
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 flex-wrap">
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">🔍 بحث</span>
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">🛒 مشتريات</span>
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">🤝 موردين</span>
                      </div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDemoLogin('merchant@demo.com', 'password123', 'merchant')}
                      disabled={isLoading === 'merchant'}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-purple-400 disabled:to-pink-400 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/50"
                    >
                      {isLoading === 'merchant' ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                          جاري تسجيل الدخول...
                        </div>
                      ) : (
                        'ادخل كتاجر 🚀'
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Supplier Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 h-full shadow-2xl">
                  <div className="text-center">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-4xl shadow-lg"
                    >
                      📦
                    </motion.div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">لوحة المورد</h4>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      عرض وتقديم المنتجات بطريقة احترافية مع إدارة المخزون وتلقي طلبات التجار
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 flex-wrap">
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">🏷️ عرض</span>
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">📦 مخزون</span>
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">📋 طلبات</span>
                      </div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDemoLogin('supplier@demo.com', 'password123', 'supplier')}
                      disabled={isLoading === 'supplier'}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-green-400 disabled:to-emerald-400 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-green-500/50"
                    >
                      {isLoading === 'supplier' ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                          جاري تسجيل الدخول...
                        </div>
                      ) : (
                        'ادخل كمورد 🚀'
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Shipping Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 h-full shadow-2xl">
                  <div className="text-center">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-4xl shadow-lg"
                    >
                      🚚
                    </motion.div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">لوحة الشحن</h4>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      عرض خدمات وعروض الشحن المتنوعة مع إدارة الشحنات وتقديم حلول لوجستية متقدمة
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 flex-wrap">
                        <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium">🚛 خدمات</span>
                        <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium">🏷️ عروض</span>
                        <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium">🚚 شحنات</span>
                      </div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDemoLogin('shipping@demo.com', 'password123', 'shipping')}
                      disabled={isLoading === 'shipping'}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-orange-400 disabled:to-red-400 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/50"
                    >
                      {isLoading === 'shipping' ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                          جاري تسجيل الدخول...
                        </div>
                      ) : (
                        'ادخل كشركة شحن 🚀'
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Marketplace & Exhibitions promo */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Marketplace promo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center border border-white/50"
              >
                <div className="w-full h-48 mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <ShoppingCart className="w-20 h-20 text-blue-600" />
                </div>
                <h5 className="text-2xl font-bold mb-3 text-gray-900">السوق المشترك</h5>
                <p className="text-gray-700 mb-6 leading-relaxed">استعرض المنتجات، قارن العروض، وتواصل مع الموردين لطلب عرض الأسعار بطريقة منظمة وآمنة.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/enhanced-marketplace" 
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    دخول السوق المشترك
                  </Link>
                </motion.div>
              </motion.div>

              {/* Exhibitions promo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center border border-white/50"
              >
                <div className="w-full h-48 mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <Globe className="w-20 h-20 text-purple-600" />
                </div>
                <h5 className="text-2xl font-bold mb-3 text-gray-900">المعارض</h5>
                <p className="text-gray-700 mb-6 leading-relaxed">شاهد المعارض الافتراضية والتواصل المباشر مع العارضين لاكتشاف فرص تجارية جديدة.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/exhibitions" 
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    دخول المعارض
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Final CTA Section */}
      <div className="py-32 bg-gradient-to-br from-slate-900 via-violet-900 to-cyan-800 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">هل أنت مستعد لتطوير أعمالك؟</h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-16 max-w-3xl mx-auto leading-relaxed">
              انضم إلى شبكة من الشركات الموثوقة وابدأ بتحسين عملياتك التجارية اليوم — بدون أي معلومات عن الأسعار هنا.
            </p>
            
            {user ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to={`/${user.role}`}
                  className="px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-2xl hover:shadow-blue-500/50 inline-flex items-center justify-center"
                >
                  الذهاب إلى لوحة التحكم
                  <ArrowRight className="mr-3 w-6 h-6" />
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/enhanced-marketplace"
                  className="px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-2xl hover:shadow-blue-500/50 inline-flex items-center justify-center"
                >
                  استعرض السوق المشترك
                  <ArrowRight className="mr-3 w-6 h-6" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced WhatsApp floating button */}
      {
        (() => {
          const whatsappNumber = '966505717003';
          const presetText = encodeURIComponent('اتواصل بخصوص منصة تجارتنا');
          const href = `https://wa.me/${whatsappNumber}?text=${presetText}`;
          return (
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اتصل بنا عبر واتساب"
              title="التواصل عبر واتساب"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all"
            >
              <Phone className="w-6 h-6" />
              <span className="hidden sm:inline font-bold text-lg">واتساب</span>
            </motion.a>
          );
        })()
      }
    </div>
  );
};

export default LandingPage;

