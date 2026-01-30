"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ArrowRight,
  Megaphone,
  Globe,
  Loader2,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { submitContactForm, getSiteContent } from "../actions";

// Definim pachetele exact cum le așteaptă URL-ul
const ADS_PACKAGES = [
  { id: "SILVER", name: "SILVER Ads", price: "300 – 500 €" },
  { id: "GOLD", name: "GOLD Ads", price: "600 – 1.000 €" },
  { id: "PLATINIUM", name: "PLATINIUM Ads", price: "1.200 – 2.000 €" },
];

const WEB_PACKAGES = [
  { id: "Site de Prezentare", name: "Site de Prezentare", price: "499 €" },
  { id: "Magazin Online Mic", name: "Magazin Online Mic", price: "999 €" },
  {
    id: "Magazin Online Mediu",
    name: "Magazin Online Mediu",
    price: "1.499 €",
  },
  { id: "Magazin Premium", name: "Magazin Premium", price: "1.999 €" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Stare nouă pentru succes

  const [pageData, setPageData] = useState({
    title: "Contactează-ne",
    subtitle:
      "Completează formularul pentru o ofertă personalizată sau o discuție generală.",
    contact_email: "contact@pandaads.ro",
    contact_phone: "07xx xxx xxx",
  });

  // Încărcare texte editabile
  useEffect(() => {
    async function loadTexts() {
      const data = await getSiteContent("contact_page");
      if (data) setPageData((prev) => ({ ...prev, ...data }));
    }
    loadTexts();
  }, []);

  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    email: "",
    telefon: "",
    firma: "",
    mesaj: "",
  });

  const [selectedAds, setSelectedAds] = useState("");
  const [selectedWeb, setSelectedWeb] = useState("");

  // --- REZOLVARE PROBLEMA 1: AUTO-SELECTARE ---
  useEffect(() => {
    const service = searchParams.get("service"); // ex: 'ads' sau 'web'
    const plan = searchParams.get("plan"); // ex: 'GOLD' sau 'Site de Prezentare'

    if (plan) {
      // Decodăm planul pentru cazurile cu spații (ex: Site%20de%20Prezentare)
      const decodedPlan = decodeURIComponent(plan);

      if (service === "ads") {
        // Verificăm dacă planul există în lista noastră
        const exists = ADS_PACKAGES.find(
          (p) => p.id === decodedPlan || p.id === plan,
        );
        if (exists) setSelectedAds(exists.id);
      } else if (service === "web") {
        const exists = WEB_PACKAGES.find(
          (p) => p.id === decodedPlan || p.id === plan,
        );
        if (exists) setSelectedWeb(exists.id);
      }
    }
  }, [searchParams]);

  // --- REZOLVARE PROBLEMA 2: LOADING & SUCCESS STATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalData = {
      client: formData,
      pachetAds: selectedAds || "Niciunul (Discuție Generală)",
      pachetWeb: selectedWeb || "Niciunul (Discuție Generală)",
    };

    try {
      const result = await submitContactForm(finalData);

      if (result.success) {
        // Nu mai dăm alert, ci schimbăm starea UI-ului
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Ducem utilizatorul sus să vadă mesajul
      } else {
        alert("❌ Eroare: " + result.message);
      }
    } catch (error) {
      alert("A apărut o eroare neașteptată.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
        {/* Header Centrat */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {pageData.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{pageData.subtitle}</p>
        </div>

        {/* --- LOGICA VIZUALĂ: FORMULAR vs SUCCES --- */}
        {isSuccess ? (
          // --- ECRAN DE SUCCES (La fel ca la Ebook) ---
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-emerald-100 text-center max-w-3xl mx-auto animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-emerald-600" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mesajul tău a fost trimis!
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Mulțumim că ai ales PandaAds. Un membru al echipei noastre a
              primit detaliile și te va contacta în cel mai scurt timp (de
              obicei în 24h).
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-all"
              >
                Înapoi la Home
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    nume: "",
                    prenume: "",
                    email: "",
                    telefon: "",
                    firma: "",
                    mesaj: "",
                  });
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-all"
              >
                Trimite alt mesaj
              </button>
            </div>
          </div>
        ) : (
          // --- FORMULARUL STANDARD ---
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Partea Stângă - Formular */}
            <div className="lg:col-span-2 space-y-8">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
                    1
                  </span>
                  Datele Tale
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume
                    </label>
                    <input
                      required
                      name="nume"
                      value={formData.nume}
                      onChange={handleChange}
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50"
                      placeholder="Popescu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prenume
                    </label>
                    <input
                      required
                      name="prenume"
                      value={formData.prenume}
                      onChange={handleChange}
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50"
                      placeholder="Andrei"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50"
                      placeholder={pageData.contact_email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      required
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleChange}
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50"
                      placeholder={pageData.contact_phone}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume Firmă (Opțional)
                    </label>
                    <input
                      name="firma"
                      value={formData.firma}
                      onChange={handleChange}
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50"
                      placeholder="Firma Ta SRL"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesaj / Detalii
                    </label>
                    <textarea
                      name="mesaj"
                      value={formData.mesaj}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50"
                      placeholder="Salut! Sunt interesat de o colaborare..."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Datele sunt procesate confidențial.
                  </p>
                </div>
              </form>
            </div>

            {/* Partea Dreaptă - Selecție Servicii & Buton */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
                    2
                  </span>
                  Interesat de...
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Megaphone size={18} className="text-blue-600" /> Pachet Ads
                  </label>
                  <div className="relative">
                    <select
                      value={selectedAds}
                      onChange={(e) => setSelectedAds(e.target.value)}
                      className="w-full p-4 rounded-xl border appearance-none outline-none cursor-pointer bg-gray-50 border-gray-200 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">-- Neselectat --</option>
                      {ADS_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-8 border-t border-gray-100 pt-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Globe size={18} className="text-emerald-600" /> Pachet Web
                  </label>
                  <div className="relative">
                    <select
                      value={selectedWeb}
                      onChange={(e) => setSelectedWeb(e.target.value)}
                      className="w-full p-4 rounded-xl border appearance-none outline-none cursor-pointer bg-gray-50 border-gray-200 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">-- Neselectat --</option>
                      {WEB_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Se
                      trimite...
                    </>
                  ) : (
                    <>
                      Trimite Mesajul <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {/* Contact Rapid Info */}
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Mail size={16} className="text-emerald-600" />{" "}
                    {pageData.contact_email}
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Phone size={16} className="text-emerald-600" />{" "}
                    {pageData.contact_phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-emerald-600" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
