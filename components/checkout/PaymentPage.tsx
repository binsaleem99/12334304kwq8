import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, CreditCard, Apple, Smartphone, ShieldCheck, Check } from 'lucide-react';
import { ViewState } from '../../types';
import Button from '../ui/Button';

interface PaymentPageProps {
  onNavigate: (view: ViewState) => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [holderName, setHolderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
        setIsProcessing(false);
        // Navigate to dedicated success page
        onNavigate('checkout-success');
    }, 2000);
  };

  // Mock Package Data (In real app, this comes from context or params)
  const selectedPackage = {
      name: 'Popular Pack',
      credits: 600,
      bonus: 100,
      totalCredits: 700,
      price: '20.000'
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="ltr">
      {/* Header */}
      <header className="bg-white border-b-[3px] border-black h-16 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
              <button 
                onClick={() => onNavigate('dashboard-billing')}
                className="flex items-center gap-2 font-bold text-slate-600 hover:text-black transition-colors"
              >
                  <ArrowRight size={20} className="rotate-180" /> Back
              </button>
              <div className="font-black text-2xl tracking-tighter">KWQ8</div>
              <div className="w-16"></div> {/* Spacer for centering */}
          </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Payment Form */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                  <div>
                      <h1 className="text-3xl font-black text-black mb-2">Payment Details</h1>
                      <p className="text-slate-600 font-bold">Complete your purchase securely.</p>
                  </div>

                  {/* Card Form (Tap Style) */}
                  <div className="bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl p-6 focus-within:border-[#7C3AED] focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Card Number</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        placeholder="4242 4242 4242 4242"
                                        className="w-full bg-white border-2 border-[#E5E7EB] rounded-lg p-3 pl-4 pr-12 font-mono text-lg focus:outline-none focus:border-[#7C3AED] transition-colors"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <CreditCard size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Expiry Date</label>
                                    <input 
                                        type="text" 
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        placeholder="MM / YY"
                                        className="w-full bg-white border-2 border-[#E5E7EB] rounded-lg p-3 font-mono text-lg focus:outline-none focus:border-[#7C3AED] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CVV</label>
                                    <input 
                                        type="text" 
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        placeholder="123"
                                        className="w-full bg-white border-2 border-[#E5E7EB] rounded-lg p-3 font-mono text-lg focus:outline-none focus:border-[#7C3AED] transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cardholder Name</label>
                                <input 
                                    type="text" 
                                    value={holderName}
                                    onChange={(e) => setHolderName(e.target.value)}
                                    placeholder="AHMED MOHAMMED"
                                    className="w-full bg-white border-2 border-[#E5E7EB] rounded-lg p-3 font-bold text-lg focus:outline-none focus:border-[#7C3AED] transition-colors uppercase"
                                />
                            </div>
                        </div>
                  </div>

                  {/* Alternative Methods */}
                  <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-slate-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or pay with</span>
                        </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors border-2 border-black">
                          <Apple size={20} fill="currentColor" /> Apple Pay
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-[#1428A0] text-white py-3 rounded-lg font-bold hover:bg-[#0f1e7a] transition-colors border-2 border-[#1428A0]">
                          <Smartphone size={20} /> Samsung Pay
                      </button>
                  </div>

              </motion.div>

              {/* Right Column: Order Summary */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:pl-8"
              >
                  <div className="bg-white border-[3px] border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_#000] sticky top-24">
                        <h2 className="text-xl font-black text-black mb-6 border-b-2 border-slate-100 pb-4">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-600">{selectedPackage.name}</span>
                                <span className="font-black text-black text-lg">{selectedPackage.credits} credits</span>
                            </div>
                            <div className="flex justify-between items-center text-green-600">
                                <span className="font-bold flex items-center gap-1"><Check size={16} /> Package Bonus</span>
                                <span className="font-black">+{selectedPackage.bonus} credits</span>
                            </div>
                            <div className="flex justify-between items-center text-[#7C3AED] bg-violet-50 p-2 rounded-lg border border-violet-100">
                                <span className="font-bold flex items-center gap-1">🎁 First Purchase Bonus</span>
                                <span className="font-black">+20%</span>
                            </div>
                        </div>

                        <div className="border-t-[3px] border-black border-dashed my-6"></div>

                        <div className="flex justify-between items-end mb-8">
                            <div className="text-slate-500 font-bold text-sm">TOTAL AMOUNT</div>
                            <div className="text-3xl font-black text-black">{selectedPackage.price} KWD</div>
                        </div>

                        <button 
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-[#22C55E] border-[3px] border-black text-black py-4 rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </span>
                            ) : (
                                `PAY ${selectedPackage.price} KWD`
                            )}
                        </button>

                        <div className="mt-6 flex flex-col gap-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-xs">
                                <Lock size={12} /> Secured by Tap Payments. 256-bit SSL Encrypted.
                            </div>
                            <div className="flex justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                                {/* Simple Card Icons using Divs for demo */}
                                <div className="h-6 w-10 bg-slate-200 rounded"></div>
                                <div className="h-6 w-10 bg-slate-200 rounded"></div>
                                <div className="h-6 w-10 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                  </div>
              </motion.div>

          </div>
      </div>
    </div>
  );
};

export default PaymentPage;