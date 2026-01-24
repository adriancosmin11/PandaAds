import React from 'react';
import { PrismaClient } from '@prisma/client'; // Importăm Prisma
import { Users, DollarSign, TrendingUp, Mail } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Aceasta devine o componentă ASYNC (Server Component)
export default async function DashboardPage() {
  const prisma = new PrismaClient();

  // 1. Citim datele reale din baza de date
  // orderBy: { createdAt: 'desc' } înseamnă cele mai noi primele
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
  });

  return (
    <div className="max-w-6xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panou de Control</h1>
        <p className="text-gray-500">Date reale din baza de date.</p>
      </div>

      {/* --- STATS CARDS (Putem calcula dinamic valorile) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Leads Totale" value={leads.length} icon={<Users size={24} className="text-blue-500"/>} trend="Toate timpurile" />
        {/* ...restul cardurilor pot rămâne statice momentan sau le calculăm... */}
      </div>

      {/* --- TABEL DATE CLIENȚI --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Cererile Recente</h2>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                    <tr>
                        <th className="px-6 py-4">Nume</th>
                        <th className="px-6 py-4">Pachete Alese</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {/* Mapăm prin datele reale (leads) */}
                    {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {lead.nume} {lead.prenume}<br/>
                                <span className="text-xs text-gray-400">{lead.firma || '-'}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    {lead.pachetAds !== 'Niciunul' && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs w-fit">{lead.pachetAds}</span>}
                                    {lead.pachetWeb !== 'Niciunul' && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs w-fit">{lead.pachetWeb}</span>}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span>{lead.email}</span>
                                    <span className="text-xs text-gray-400">{lead.telefon}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {new Date(lead.createdAt).toLocaleDateString('ro-RO')}
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
                                    {lead.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {leads.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                Nu există nicio cerere momentan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

// Componenta StatCard (o lași la fel jos)
const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
        </div>
        <p className="text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">
            {trend}
        </p>
    </div>
);