import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Shield, BarChart3, Globe, Zap, Truck, ShoppingCart, Package, Award, Clock, Headphones, LogIn, Phone, Sparkles } from 'lucide-react';
import { useState } from 'react';

const LandingPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDemoLogin = async (email: string, password: string, role: string) => {
    setIsLoading(role);
    try {
      await login(email, password);
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
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      features: ['عرض المنتجات', 'إدارة المخزون', 'تتبع الطلبات', 'تحليل المبيعات', 'استقبال طلبات التجار']
    },
    {
      title: 'للتجار',
      description: 'تصفح المنتجات وإدارة الطلبات والمدفوعات في مكان واحد',
      icon: ShoppingCart,
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      features: ['تصفح المنتجات', 'اختيار المورد الأفضل', 'إدارة الطلبات', 'متابعة الشحنات', 'نشر طلبات الشراء']
    },
    {
      title: 'لشركات الشحن',
      description: 'خدمات لوجستية متطورة وحلول شحن مبتكرة',
      icon: Truck,
      gradient: 'from-orange-600 via-red-600 to-pink-600',
      features: ['إدارة الشحنات', 'تتبع مباشر', 'تحسين المسارات', 'تقارير الأداء', 'إضافة عروض شحن للسوق واستقبال طلبات الشحن']
    }
  ];

  const benefits = [
    {
      title: 'أمان وموثوقية',
      description: 'حماية متقدمة للبيانات مع ضمان سرية المعاملات',
      icon: Shield,
      color: 'from-green-600 to-emerald-700'
    },
    {
      title: 'نمو الأعمال',
      description: 'زيادة فرص البيع والوصول لأسواق جديدة',
      icon: TrendingUp,
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: 'توفير الوقت',
      description: 'أتمتة العمليات وتسريع إنجاز المهام',
      icon: Clock,
      color: 'from-purple-600 to-pink-700'
    },
    {
      title: 'دعم متواصل',
      description: 'فريق دعم فني متخصص على مدار الساعة',
      icon: Headphones,
      color: 'from-orange-600 to-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Hero Section - Elegant & Luxurious */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        {/* Elegant gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">منصة التجارة الإلكترونية الرائدة</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                تجارتنا الذكية
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              منصة متكاملة تربط الموردين والتجار وشركات الشحن في نظام تجاري موحد وآمن
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-2xl shadow-blue-900/50 transition-all duration-300"
              >
                ابدأ الآن
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300"
              >
                تواصل معنا
              </motion.button>
            </div>
          </motion.div>

          {/* Stats - Elegant cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
          >
            {[
              { icon: Users, label: 'مستخدم نشط', value: '10,000+' },
              { icon: Package, label: 'منتج متاح', value: '50,000+' },
              { icon: TrendingUp, label: 'معدل النمو', value: '300%' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Premium cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              حلول متكاملة لكل الأطراف
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              منصة واحدة تجمع جميع احتياجاتك التجارية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-500"></div>
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full hover:border-white/20 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Elegant grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              لماذا تختار تجارتنا؟
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              مميزات تجعلنا الخيار الأمثل لأعمالك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              جاهز لتطوير أعمالك؟
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              انضم إلى آلاف الشركات التي تثق بمنصتنا لتنمية أعمالها
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-900/50 transition-all duration-300"
              >
                ابدأ مجاناً
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                تحدث معنا
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-2xl shadow-green-900/50 transition-all duration-300"
      >
        <Phone className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
};

export default LandingPage;
