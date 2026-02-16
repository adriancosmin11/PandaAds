'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Briefcase, RefreshCw, AlertTriangle, Inbox } from 'lucide-react';
import { fetchContactEmails, fetchCareerEmails } from '../app/emailActions';
import EmailModal from './EmailModal';

export default function EmailInbox() {
    const [activeTab, setActiveTab] = useState('contact'); // 'contact' | 'career'
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);

    const loadEmails = async () => {
        setLoading(true);
        setError(null);
        try {
            let result;
            if (activeTab === 'contact') {
                result = await fetchContactEmails();
            } else {
                result = await fetchCareerEmails();
            }

            if (result.success) {
                setEmails(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Eroare la încărcare.");
        } finally {
            setLoading(false);
        }
    };

    // Load on mount and when tab changes
    useEffect(() => {
        loadEmails();
    }, [activeTab]);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[600px]">
            
            {/* --- HEADER & TABS --- */}
            <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="p-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Inbox size={20} className="text-emerald-600"/> Inbox Extern
                    </h2>
                    <button 
                        onClick={loadEmails} 
                        disabled={loading}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-all disabled:animate-spin"
                        title="Reîmprospătează"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex px-4 gap-1">
                    <button 
                        onClick={() => setActiveTab('contact')}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-lg transition-all ${activeTab === 'contact' ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 border-x border-t border-gray-200 dark:border-gray-800 mb-[-1px] z-10' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                        <Mail size={16} /> Contact
                    </button>
                    <button 
                        onClick={() => setActiveTab('career')}
                         className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-lg transition-all ${activeTab === 'career' ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-x border-t border-gray-200 dark:border-gray-800 mb-[-1px] z-10' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                        <Briefcase size={16} /> Cariere
                    </button>
                </div>
            </div>

            {/* --- LISTA DATA --- */}
            <div className="flex-1 overflow-y-auto relative bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                
                {loading && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 z-20 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <RefreshCw className="animate-spin text-emerald-500" size={32} />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Se încarcă mesajele...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full mb-3">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-1">Eroare de conexiune</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{error}</p>
                        <p className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">Verifică credențialele în .env</p>
                    </div>
                )}

                {!loading && !error && emails.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-600">
                        <Inbox size={48} strokeWidth={1} className="mb-2 opacity-50"/>
                        <p>Nu există mesaje noi.</p>
                    </div>
                )}

                {!loading && !error && emails.length > 0 && (
                   <ul className="divide-y divide-gray-50 dark:divide-gray-800">
                       {emails.map((email) => (
                           <li 
                               key={email.uid || email.id} 
                               onClick={() => setSelectedEmail(email)}
                               className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors flex gap-4 group"
                           >
                               <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white shadow-sm ${activeTab === 'contact' ? 'bg-emerald-500' : 'bg-blue-500'} `}>
                                   {email.from.charAt(0).toUpperCase()}
                               </div>
                               <div className="flex-1 min-w-0">
                                   <div className="flex justify-between items-start">
                                       <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate pr-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                           {email.from}
                                       </h4>
                                       <span className="text-xs text-gray-400 whitespace-nowrap">
                                           {new Date(email.date).toLocaleDateString()}
                                       </span>
                                   </div>
                                   <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate mt-0.5">
                                       {email.subject}
                                   </p>
                                   <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-1">
                                       {email.text ? email.text.substring(0, 100) : '...'}
                                   </p>
                               </div>
                           </li>
                       ))}
                   </ul>
                )}
            </div>

            {/* --- FOOTER STATUS --- */}
            <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center">
                 <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                    Sincronizat cu Zoho Mail via IMAP {loading ? '(Actualizare...)' : ''}
                 </p>
            </div>

            {/* --- MODAL --- */}
            <EmailModal 
                isOpen={!!selectedEmail}
                email={selectedEmail}
                onClose={() => setSelectedEmail(null)}
            />
        </div>
    );
}
