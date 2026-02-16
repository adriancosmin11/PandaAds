'use client';

import React from 'react';
import { X, Calendar, User, CornerUpLeft } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function EmailModal({ email, isOpen, onClose }) {
  if (!isOpen || !email) return null;

  // Sanitize HTML content to prevent XSS
  const sanitizedContent = DOMPurify.sanitize(email.html || email.text);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* --- HEADER --- */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex-1 mr-4">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                {email.subject || '(No Subject)'}
             </h2>
             
             <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                   <User size={16} className="text-emerald-500" />
                   <span className="font-medium text-gray-700 dark:text-gray-300">{email.from}</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <Calendar size={16} className="text-blue-500" />
                   <span>{new Date(email.date).toLocaleString('ro-RO')}</span>
                </div>
             </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- BODY (SCROLLABLE) --- */}
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-950 custom-scrollbar">
           {/* Render HTML safely */}
           <div 
             className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
             dangerouslySetInnerHTML={{ __html: sanitizedContent }}
           />
        </div>

        {/* --- FOOTER --- */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3">
           <button 
             onClick={onClose}
             className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
           >
             Închide
           </button>
           <a 
             href={`mailto:${extractEmail(email.from)}`}
             className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
           >
             <CornerUpLeft size={16} /> Răspunde
           </a>
        </div>

      </div>
    </div>
  );
}

// Helper to extract email address if format is "Name <email@domain.com>"
function extractEmail(fromField) {
    if (!fromField) return '';
    const match = fromField.match(/<(.+)>/);
    return match ? match[1] : fromField;
}
