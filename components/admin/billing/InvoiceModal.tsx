import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, RefreshCw, Mail, RotateCcw, CreditCard } from 'lucide-react';

interface InvoiceModalProps {
  invoice: any;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#1A1A1A] border border-[#333] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#333] bg-[#0A0A0A]">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        Invoice #{invoice.id}
                        <span className={`px-2 py-0.5 rounded text-xs font-black uppercase border ${
                            invoice.status === 'paid' ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/50' :
                            invoice.status === 'failed' ? 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/50' :
                            'bg-[#FACC15]/20 text-[#FACC15] border-[#FACC15]/50'
                        }`}>
                            {invoice.status}
                        </span>
                    </h2>
                    <p className="text-[#666] text-sm font-mono mt-1">{invoice.date} • {invoice.time}</p>
                </div>
                <button onClick={onClose} className="text-[#666] hover:text-white">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8 overflow-y-auto">
                {/* User & Payment Info */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-[#666] text-xs font-bold uppercase mb-3">Customer</h3>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-white font-bold text-xs">
                                {invoice.user.charAt(0)}
                            </div>
                            <div>
                                <div className="text-white font-bold">{invoice.user}</div>
                                <div className="text-[#666] text-xs">{invoice.email}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[#666] text-xs font-bold uppercase mb-3">Payment Method</h3>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <CreditCard size={16} />
                            <span>{invoice.method || 'KNET'}</span>
                            <span className="text-[#666] text-xs font-normal">•••• 4242</span>
                        </div>
                        <div className="text-[#666] text-xs mt-1">Transaction ID: tx_123456789</div>
                    </div>
                </div>

                <div className="h-px bg-[#333] w-full" />

                {/* Line Items */}
                <div>
                    <h3 className="text-[#666] text-xs font-bold uppercase mb-3">Details</h3>
                    <div className="bg-[#222] rounded-lg border border-[#333] overflow-hidden">
                        <div className="flex justify-between p-4 border-b border-[#333]">
                            <span className="text-white font-bold">{invoice.plan} Subscription</span>
                            <span className="text-white font-mono">{invoice.amount}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-[#111]">
                            <span className="text-[#A0A0A0] text-sm">Total</span>
                            <span className="text-white font-black font-mono text-lg">{invoice.amount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#333] bg-[#0A0A0A] flex justify-between items-center">
                <button className="text-[#A0A0A0] hover:text-white flex items-center gap-2 text-sm font-bold">
                    <Printer size={16} /> Print
                </button>
                <div className="flex gap-3">
                    {invoice.status === 'failed' && (
                        <button className="px-4 py-2 bg-[#FACC15] text-black font-bold rounded hover:bg-[#EAB308] transition-colors flex items-center gap-2">
                            <RefreshCw size={16} /> Retry Payment
                        </button>
                    )}
                    {invoice.status === 'paid' && (
                        <button className="px-4 py-2 bg-[#333] text-white border border-[#555] font-bold rounded hover:bg-[#444] transition-colors flex items-center gap-2">
                            <RotateCcw size={16} /> Refund
                        </button>
                    )}
                    <button className="px-4 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors flex items-center gap-2">
                        <Mail size={16} /> Send Invoice
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default InvoiceModal;