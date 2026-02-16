"use client";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { X, FileText, Download, Edit3, RefreshCw } from "lucide-react";

const ADS_PACKAGES = {
  "Niciunul": 0,
  "SILVER (300-500 EUR)": 400,
  "GOLD (600-1000 EUR)": 800,
  "PLATINUM (1200-2000 EUR)": 1500,
};

const WEB_PACKAGES = {
  "Niciunul": 0,
  "START (Landing Page)": 990,
  "BUSINESS (Prezentare)": 1990,
  "E-COMMERCE (Magazin)": 3990,
};

const removeDiacritics = (str) => {
  if (!str) return "";
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// --- HELPER IMAGINE (SUPORT PNG) ---
const getLogoBase64 = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        // Forțăm reîncărcarea pentru a evita cache-ul browserului
        img.src = url + "?t=" + new Date().getTime(); 
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            // Folosim image/png pentru a păstra transparența
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = () => {
            console.error("Nu s-a putut incarca logo-ul PNG de la:", url);
            resolve(null);
        };
    });
};

export default function OfferModal({ isOpen, onClose, lead }) {
  // CONFIGURARE CALE LOGO PNG
  const LOGO_PATH = "/assets/logo-v2white.png"; 

  const [selectedAds, setSelectedAds] = useState("Niciunul");
  const [selectedWeb, setSelectedWeb] = useState("Niciunul");
  const [isCustomPrice, setIsCustomPrice] = useState(false);
  const [customAdsPrice, setCustomAdsPrice] = useState(0);
  const [customWebPrice, setCustomWebPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (lead) {
      const adsMatch = Object.keys(ADS_PACKAGES).find(k => lead.pachetAds && k.includes(lead.pachetAds)) || "Niciunul";
      const webMatch = Object.keys(WEB_PACKAGES).find(k => lead.pachetWeb && k.includes(lead.pachetWeb)) || "Niciunul";
      setSelectedAds(adsMatch);
      setSelectedWeb(webMatch);
      setCustomAdsPrice(ADS_PACKAGES[adsMatch]);
      setCustomWebPrice(WEB_PACKAGES[webMatch]);
    }
  }, [lead, isOpen]);

  useEffect(() => {
    if (!isCustomPrice) setCustomAdsPrice(ADS_PACKAGES[selectedAds]);
  }, [selectedAds, isCustomPrice]);

  useEffect(() => {
    if (!isCustomPrice) setCustomWebPrice(WEB_PACKAGES[selectedWeb]);
  }, [selectedWeb, isCustomPrice]);

  if (!isOpen) return null;

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const primaryColor = [5, 150, 105];

    // HEADER
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // LOGO PNG INTEGRATION
    const logoBase64 = await getLogoBase64(LOGO_PATH);
    if (logoBase64) {
        // Parametrul 'PNG' este esențial aici
        doc.addImage(logoBase64, 'PNG', 15, 8, 55, 24, undefined, 'FAST'); 
    } else {
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text("PANDAADS", 15, 25);
    }

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("OFERTA COMERCIALA", pageWidth - 15, 25, { align: "right" });

    // SECTIUNI INFO
    const startY = 55;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont("helvetica", "bold");
    doc.text("BENEFICIAR:", 15, startY);
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(removeDiacritics(`${lead.nume} ${lead.prenume || ''}`), 15, startY + 6);
    if(lead.firma) doc.text(removeDiacritics(lead.firma), 15, startY + 11);
    doc.setFont("helvetica", "normal");
    doc.text(lead.email, 15, startY + 16);
    if(lead.telefon) doc.text(lead.telefon, 15, startY + 21);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont("helvetica", "bold");
    doc.text("FURNIZOR:", pageWidth - 15, startY, { align: "right" });
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("PandaAds Agency", pageWidth - 15, startY + 6, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text("contact@pandaads.ro", pageWidth - 15, startY + 11, { align: "right" });
    doc.text("+40 756 387 392", pageWidth - 15, startY + 16, { align: "right" });
    doc.text(`Data: ${new Date().toLocaleDateString('ro-RO')}`, pageWidth - 15, startY + 26, { align: "right" });

    // TABEL
    const finalAdsPrice = isCustomPrice ? customAdsPrice : ADS_PACKAGES[selectedAds];
    const finalWebPrice = isCustomPrice ? customWebPrice : WEB_PACKAGES[selectedWeb];
    const tableData = [];
    if (selectedAds !== "Niciunul") {
      tableData.push(["Publicitate PPC", removeDiacritics(selectedAds.split('(')[0]), "Administrare campanii, Strategie, Raportare lunara.", `${finalAdsPrice} EUR`]);
    }
    if (selectedWeb !== "Niciunul") {
      tableData.push(["Web Development", removeDiacritics(selectedWeb.split('(')[0]), "Design Custom, Optimizare viteza, SEO On-page.", `${finalWebPrice} EUR`]);
    }

    autoTable(doc, {
      startY: startY + 40,
      head: [['Categorie', 'Pachet', 'Descriere', 'Pret']],
      body: tableData,
      theme: 'plain',
      headStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 }, 1: { fontStyle: 'bold', cellWidth: 45 }, 3: { halign: 'right', fontStyle: 'bold', cellWidth: 30 } },
      styles: { fontSize: 10, cellPadding: 4, valign: 'middle', lineColor: [230, 230, 230], lineWidth: { bottom: 0.1 } },
    });

    // TOTALURI
    let finalY = doc.lastAutoTable.finalY + 10;
    const subtotal = Number(finalAdsPrice) + Number(finalWebPrice);
    const total = subtotal - Number(discount);
    doc.setDrawColor(200);
    doc.line(pageWidth - 70, finalY, pageWidth - 15, finalY);
    finalY += 6;
    doc.setFontSize(10);
    doc.text(`Subtotal:`, pageWidth - 40, finalY, { align: "right" });
    doc.text(`${subtotal} EUR`, pageWidth - 15, finalY, { align: "right" });
    if (discount > 0) {
        finalY += 5;
        doc.setTextColor(200, 0, 0);
        doc.text(`Discount:`, pageWidth - 40, finalY, { align: "right" });
        doc.text(`-${discount} EUR`, pageWidth - 15, finalY, { align: "right" });
    }
    finalY += 8;
    doc.setFillColor(245, 255, 250); 
    doc.roundedRect(pageWidth - 75, finalY - 6, 60, 12, 1, 1, 'F');
    doc.setFontSize(12);
    doc.setTextColor(5, 150, 105);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL:`, pageWidth - 40, finalY + 2, { align: "right" });
    doc.text(`${total} EUR`, pageWidth - 15, finalY + 2, { align: "right" });

    // FOOTER
    const footerY = pageHeight - 20;
    doc.setDrawColor(200);
    doc.line(15, footerY, pageWidth - 15, footerY);
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text("Aceasta oferta este valabila timp de 14 zile de la data emiterii.", 15, footerY + 5);
    doc.text("PandaAds Agency - www.pandaads.ro", pageWidth - 15, footerY + 5, { align: "right" });

    doc.save(`Oferta_PandaAds_${removeDiacritics(lead.nume).replace(/\s+/g, '_')}.pdf`);
    setIsGenerating(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <FileText className="text-emerald-600" /> Configurare Oferta
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Client: <span className="font-semibold text-gray-700 dark:text-gray-300">{lead?.nume}</span></p>
          </div>
          <button onClick={onClose} className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-2"><Edit3 size={18} className="text-blue-600 dark:text-blue-400"/><div><p className="text-sm font-bold text-blue-900 dark:text-blue-100">Personalizeaza Pretul</p></div></div>
            <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked={isCustomPrice} onChange={() => setIsCustomPrice(!isCustomPrice)}/><div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3"><label className="block text-xs font-bold text-gray-500 dark:text-gray-400">Pachet Ads</label><select value={selectedAds} onChange={(e) => setSelectedAds(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">{Object.keys(ADS_PACKAGES).map(pkg => (<option key={pkg} value={pkg} className="dark:bg-gray-900">{pkg}</option>))}</select><div className={isCustomPrice ? 'opacity-100' : 'opacity-50 pointer-events-none'}><input type="number" value={customAdsPrice} onChange={(e) => setCustomAdsPrice(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 font-mono"/></div></div>
            <div className="space-y-3"><label className="block text-xs font-bold text-gray-500 dark:text-gray-400">Pachet Web</label><select value={selectedWeb} onChange={(e) => setSelectedWeb(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">{Object.keys(WEB_PACKAGES).map(pkg => (<option key={pkg} value={pkg} className="dark:bg-gray-900">{pkg}</option>))}</select><div className={isCustomPrice ? 'opacity-100' : 'opacity-50 pointer-events-none'}><input type="number" value={customWebPrice} onChange={(e) => setCustomWebPrice(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 font-mono"/></div></div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800 flex items-center gap-4"><div className="flex-1"><label className="block text-sm font-bold text-red-900 dark:text-red-200">Discount (EUR)</label><input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full p-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 font-bold"/></div><div className="text-right"><span className="block text-xs text-gray-500 dark:text-gray-400">Total Final</span><span className="text-2xl font-black text-gray-900 dark:text-white">{(isCustomPrice ? (customAdsPrice + customWebPrice) : (ADS_PACKAGES[selectedAds] + WEB_PACKAGES[selectedWeb])) - discount} €</span></div></div>
        </div>
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Anuleaza</button>
          <button onClick={handleGeneratePDF} disabled={isGenerating} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-2">{isGenerating ? <RefreshCw className="animate-spin" size={18}/> : <Download size={18} />}{isGenerating ? "Se genereaza..." : "Descarca PDF"}</button>
        </div>
      </div>
    </div>
  );
}