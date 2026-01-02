import React from 'react';
import { ChefHat, Fish, Truck, Star } from 'lucide-react';

const MockWebsite: React.FC = () => {
  return (
    <div className="bg-white min-h-full font-sans text-right" dir="rtl">
        {/* Hero Section */}
        <header className="bg-slate-900 text-white p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
                <div className="relative z-10 py-10">
                <div className="inline-block border-2 border-white/20 px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                    أفضل مأكولات بحرية في الكويت
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">مطعم البحر الأزرق</h1>
                <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    نقدم لكم أشهى المأكولات البحرية الطازجة يومياً من سوق شرق مباشرة إلى مائدتكم. طعم الأصالة الكويتية.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-[#7C3AED] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6D28D9] transition-colors shadow-lg">
                        احجز طاولة الآن
                    </button>
                    <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                        تصفح القائمة
                    </button>
                </div>
                </div>
        </header>
        
        {/* Features Section */}
        <section className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">لماذا تختارنا؟</h2>
                    <div className="w-20 h-1 bg-[#7C3AED] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 border-2 border-slate-100 rounded-2xl hover:border-[#7C3AED] hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-blue-600">
                            <Fish size={40} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">طازج يومياً</h3>
                        <p className="text-slate-500 leading-relaxed">نحضر الأسماك يومياً من سوق شرق لضمان أعلى جودة ومذاق لا يقاوم.</p>
                    </div>
                    <div className="p-8 border-2 border-slate-100 rounded-2xl hover:border-[#7C3AED] hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-orange-600">
                            <ChefHat size={40} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">طهاة محترفون</h3>
                        <p className="text-slate-500 leading-relaxed">فريقنا يملك خبرة أكثر من 20 عاماً في تحضير الأطباق البحرية الخليجية.</p>
                    </div>
                    <div className="p-8 border-2 border-slate-100 rounded-2xl hover:border-[#7C3AED] hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-green-600">
                            <Truck size={40} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">توصيل سريع</h3>
                        <p className="text-slate-500 leading-relaxed">يصلك الطلب ساخناً أينما كنت في الكويت، مغلف بإحكام للحفاظ على الحرارة.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Menu Preview */}
        <section className="py-20 px-8 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">الأطباق الأكثر طلباً</h2>
                    <p className="text-slate-600">اختيارات زبائننا المفضلة هذا الأسبوع</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="h-48 bg-slate-200 relative">
                                <img src={`https://source.unsplash.com/random/400x300?seafood&sig=${item}`} alt="food" className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold text-black shadow-sm flex items-center gap-1">
                                    <Star size={12} fill="currentColor" className="text-yellow-400" />
                                    {item === 1 ? 'الأكثر مبيعاً' : 'جديد'}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg">مطبق زبيدي</h4>
                                    <span className="text-[#7C3AED] font-black">8 د.ك</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4">سمك زبيدي طازج مع رز بسمتي وحشو كويتي فاخر.</p>
                                <button className="w-full py-2 border border-black rounded-lg font-bold hover:bg-black hover:text-white transition-colors text-sm">
                                    أضف للسلة
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">مطعم البحر الأزرق</h2>
            <p className="text-slate-400 mb-8">شارع الخليج العربي، السالمية، الكويت</p>
            <div className="flex justify-center gap-4 text-sm font-bold">
                <a href="#" className="hover:text-[#7C3AED]">انستقرام</a>
                <a href="#" className="hover:text-[#7C3AED]">تويتر</a>
                <a href="#" className="hover:text-[#7C3AED]">واتساب</a>
            </div>
        </footer>
    </div>
  );
};

export default MockWebsite;