"use client";

import React, { useState } from "react";
import { Trash2, MessageSquare, Save, X, FileText } from "lucide-react";
// Asigură-te că calea către actions este corectă (verifică folderul app/actions)
import { deleteLead, updateLeadStatus, updateLeadNotes } from "../app/adminActions";
import OfferModal from "./OfferModal"; // <--- Importăm Modalul creat anterior

const STATUS_OPTIONS = {
  NEW: { label: "Nou", color: "bg-emerald-100 text-emerald-700" },
  SEEN: { label: "Văzut", color: "bg-blue-100 text-blue-700" },
  FOLLOW_UP: { label: "Follow-up", color: "bg-orange-100 text-orange-700" },
  CLOSED: { label: "Închis", color: "bg-gray-100 text-gray-700" },
};

export default function LeadsTable({ initialLeads }) {
  const [leads, setLeads] = useState(initialLeads);
  
  // State pentru Modal Ofertă
  const [selectedLeadForOffer, setSelectedLeadForOffer] = useState(null);

  // State pentru Notițe
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState("");

  // --- DELETE LEAD ---
  const handleDelete = async (id) => {
    if (!confirm("Sigur vrei să ștergi acest lead? Această acțiune este ireversibilă.")) return;

    const previousLeads = [...leads];
    setLeads((prev) => prev.filter((l) => l.id !== id));

    try {
      const result = await deleteLead(id);
      if (!result.success) throw new Error(result.message);
    } catch (error) {
      alert("Eroare la ștergere: " + error.message);
      setLeads(previousLeads);
    }
  };

  // --- UPDATE STATUS ---
  const handleStatusChange = async (id, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );

    try {
      await updateLeadStatus(id, newStatus);
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  // --- NOTES SYSTEM ---
  const openNoteEditor = (lead) => {
    setEditingNoteId(lead.id);
    setNoteText(lead.notes || "");
  };

  const saveNote = async (id) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes: noteText } : l))
    );
    setEditingNoteId(null);

    try {
      await updateLeadNotes(id, noteText);
    } catch (error) {
      console.error("Failed to save note");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* --- HEADER TABEL --- */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-900">Cererile Recente</h2>
        <span className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
          {leads.length} rezultate
        </span>
      </div>

      {/* --- BODY TABEL --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
            <tr>
              <th className="px-6 py-4">Nume / Firmă</th>
              <th className="px-6 py-4">Pachete</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4 w-48">Status</th>
              <th className="px-6 py-4 w-64">Notițe Interne</th>
              <th className="px-6 py-4 text-right">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                
                {/* 1. NUME */}
                <td className="px-6 py-4 align-top">
                  <div className="font-bold text-gray-900">{lead.nume} {lead.prenume}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{lead.firma || '-'}</div>
                  <div className="text-xs text-gray-300 mt-2">{new Date(lead.createdAt).toLocaleDateString('ro-RO')}</div>
                </td>

                {/* 2. PACHETE */}
                <td className="px-6 py-4 align-top">
                  <div className="flex flex-col gap-1.5">
                    {lead.pachetAds && lead.pachetAds !== 'Niciunul' && (
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded text-xs font-semibold w-fit">
                        Ads: {lead.pachetAds}
                      </span>
                    )}
                    {lead.pachetWeb && lead.pachetWeb !== 'Niciunul' && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded text-xs font-semibold w-fit">
                        Web: {lead.pachetWeb}
                      </span>
                    )}
                    {(!lead.pachetAds || lead.pachetAds === 'Niciunul') && (!lead.pachetWeb || lead.pachetWeb === 'Niciunul') && (
                       <span className="text-gray-400 text-xs italic">Niciun pachet</span>
                    )}
                  </div>
                </td>

                {/* 3. CONTACT */}
                <td className="px-6 py-4 align-top">
                  <div className="flex flex-col gap-1">
                    <a href={`mailto:${lead.email}`} className="text-gray-600 hover:text-blue-600 hover:underline transition-colors truncate max-w-[180px]" title="Trimite Email">
                      {lead.email}
                    </a>
                    {lead.telefon && (
                      <a href={`https://wa.me/${lead.telefon.replace(/[^0-9]/g, '')}`} target="_blank" className="text-xs text-gray-400 hover:text-green-600 hover:font-bold transition-colors flex items-center gap-1">
                        {lead.telefon}
                      </a>
                    )}
                  </div>
                </td>

                {/* 4. STATUS */}
                <td className="px-6 py-4 align-top">
                  <select
                    value={lead.status || "NEW"}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className={`
                      cursor-pointer text-xs font-bold py-1.5 px-3 rounded-lg border-0 ring-1 ring-inset ring-gray-200 outline-none focus:ring-2 focus:ring-emerald-500 w-full appearance-none
                      ${STATUS_OPTIONS[lead.status || "NEW"]?.color || "bg-gray-100 text-gray-700"}
                    `}
                  >
                    <option value="NEW">✨ Nou</option>
                    <option value="SEEN">👀 Văzut</option>
                    <option value="FOLLOW_UP">📞 Follow-up</option>
                    <option value="CLOSED">✅ Închis</option>
                  </select>
                </td>

                {/* 5. NOTIȚE */}
                <td className="px-6 py-4 align-top">
                  {editingNoteId === lead.id ? (
                    <div className="space-y-2 animate-in fade-in zoom-in duration-200">
                      <textarea 
                        className="w-full text-xs p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                        rows={3}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Ex: Discutat azi, revine luni..."
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                         <button onClick={() => setEditingNoteId(null)} className="p-1 text-gray-400 hover:text-gray-600"><X size={14}/></button>
                         <button onClick={() => saveNote(lead.id)} className="p-1 text-emerald-600 hover:text-emerald-700 bg-emerald-50 rounded"><Save size={14}/></button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => openNoteEditor(lead)}
                      className="group/note cursor-pointer min-h-[40px] p-2 rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all relative"
                    >
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {lead.notes ? lead.notes : <span className="text-gray-300 italic">Adaugă notiță...</span>}
                      </p>
                      <MessageSquare size={12} className="absolute top-2 right-2 text-gray-300 opacity-0 group-hover/note:opacity-100" />
                    </div>
                  )}
                </td>

                {/* 6. ACȚIUNI (OFERTĂ + DELETE) */}
                <td className="px-6 py-4 text-right align-top">
                   <div className="flex justify-end gap-2">
                      
                      {/* BUTON GENERARE PDF */}
                      <button 
                        onClick={() => setSelectedLeadForOffer(lead)}
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Generează Ofertă PDF"
                      >
                        <FileText size={18} />
                      </button>

                      {/* BUTON ȘTERGERE */}
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Șterge definitiv"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                </td>

              </tr>
            ))}
            {leads.length === 0 && (
               <tr><td colSpan="6" className="text-center py-8 text-gray-400">Nu există date.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- INTEGRAT MODAL OFERTĂ --- */}
      <OfferModal 
        isOpen={!!selectedLeadForOffer} 
        onClose={() => setSelectedLeadForOffer(null)} 
        lead={selectedLeadForOffer}
        logoUrl="/assets/logo-v2.jpg" 
      />
      
    </div>
  );
}