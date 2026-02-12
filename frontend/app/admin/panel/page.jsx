import React from 'react';
import { PrismaClient } from '@prisma/client';
import { Users, DollarSign, TrendingUp, Mail } from 'lucide-react';
import LeadsTable from '../../../components/LeadsTable';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const prisma = new PrismaClient();

  // Fetch data
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Calculate stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => !l.status || l.status === 'NEW').length;
  
  // Simple logic to count potential value based on packages (Estimative)
  // Just an example logic
  let potentialValue = 0;
  leads.forEach(l => {
     if(l.pachetAds?.includes('GOLD')) potentialValue += 800;
     if(l.pachetWeb?.includes('BUSINESS')) potentialValue += 1990;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      <div className="mb-8 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Panou de Control</h1>
           <p className="text-gray-500 mt-1">Statusul proiectelor în timp real.</p>
        </div>
        <div className="text-right">
             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Live Data
             </span>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard 
            title="Leads Totale" 
            value={totalLeads} 
            icon={<Users size={24} className="text-blue-500"/>} 
            trend="Toate timpurile" 
        />
        <StatCard 
            title="Leads Noi" 
            value={newLeads} 
            icon={<Mail size={24} className="text-emerald-500"/>} 
            trend="Necesită acțiune" 
            highlight={newLeads > 0}
        />
        <StatCard 
            title="Valoare Estimată" 
            value={`€${potentialValue}`} 
            icon={<DollarSign size={24} className="text-amber-500"/>} 
            trend="Pipeline" 
        />
        {/* Poți adăuga mai multe statistici aici */}
      </div>

      {/* --- INTERACTIVE TABLE --- */}
      {/* Pasăm datele inițiale către componenta client */}
      <LeadsTable initialLeads={leads} />
      
    </div>
  );
}

const StatCard = ({ title, value, icon, trend, highlight }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border transition-all ${highlight ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-gray-200'}`}>
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
        </div>
        <p className={`text-xs font-medium inline-block px-2 py-1 rounded-md ${highlight ? 'text-emerald-700 bg-emerald-100' : 'text-gray-500 bg-gray-100'}`}>
            {trend}
        </p>
    </div>
);