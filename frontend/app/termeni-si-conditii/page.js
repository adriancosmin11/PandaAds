import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Termeni și Condiții - PandaAds",
  description: "Termeni și condiții de utilizare pentru site-ul PandaAds.",
};

export default function TermeniSiConditiiPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold mb-8 text-emerald-900">Termeni și Condiții</h1>
        
        <div className="prose prose-emerald max-w-none space-y-6">
          <p className="text-sm text-gray-500">Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introducere</h2>
            <p>
              Prezenții Termeni și Condiții reglementează utilizarea site-ului web <strong>pandaads.ro</strong> (denumit în continuare "Site-ul") și a serviciilor oferite de <strong>PandaAds Agency</strong>.
              Prin accesarea, navigarea și utilizarea acestui Site, confirmați că ați citit, înțeles și sunteți de acord să respectați acești Termeni și Condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați site-ul nostru.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Servicii Oferite</h2>
            <p>
              PandaAds Agency oferă servicii de marketing digital, inclusiv, dar fără a se limita la:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Campanii de publicitate online (TikTok Ads, Facebook Ads, Instagram Ads, Google Ads).</li>
              <li>Servicii de Web Design și dezvoltare web.</li>
              <li>Consultanță în marketing digital.</li>
            </ul>
            <p className="mt-2">
              Detaliile exacte ale serviciilor, prețurile și livrabilele vor fi stabilite prin contracte individuale sau oferte personalizate pentru fiecare client în parte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Drepturi de Proprietate Intelectuală</h2>
            <p>
              Întregul conținut al acestui Site, inclusiv, dar fără a se limita la texte, grafică, logo-uri, imagini, clipuri audio/video, design și cod sursă, este proprietatea <strong>PandaAds Agency</strong> sau a partenerilor săi și este protejat de legile naționale și internaționale privind proprietatea intelectuală.
            </p>
            <p>
              Este strict interzisă reproducerea, distribuirea, modificarea, transmiterea sau utilizarea în scopuri comerciale a oricărui material de pe acest Site fără acordul prealabil scris al PandaAds Agency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Utilizarea Site-ului</h2>
            <p>
              În calitate de utilizator al Site-ului, vă asumați responsabilitatea de a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Furniza informații corecte și complete atunci când completați formularele de contact, audit sau cerere ofertă.</li>
              <li>Nu utiliza Site-ul în scopuri ilegale, frauduloase sau care pot aduce prejudicii PandaAds Agency sau unor terțe părți.</li>
              <li>Nu accesa sau încerca să accesați secțiuni securizate ale Site-ului fără autorizație (hacking, introducere de viruși etc.).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitarea Răspunderii</h2>
            <p>
              PandaAds Agency depune eforturi rezonabile pentru a asigura corectitudinea și actualitatea informațiilor de pe Site. Cu toate acestea, nu garantăm că Site-ul va funcționa fără întreruperi sau erori, nici că informațiile sunt întotdeauna complete sau actualizate.
            </p>
            <p>
              PandaAds Agency nu va fi trasă la răspundere pentru daune directe, indirecte, incidentale sau de consecință rezultate din utilizarea sau incapacitatea de utilizare a Site-ului, ori din deciziile luate pe baza informațiilor prezentate pe acesta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Legături Către Site-uri Terțe</h2>
            <p>
              Acest Site poate conține legături (link-uri) către alte site-uri web care nu sunt deținute sau controlate de PandaAds Agency. Nu ne asumăm nicio responsabilitate pentru conținutul, politicile de confidențialitate sau practicile site-urilor terțe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modificarea Termenilor și Condițiilor</h2>
            <p>
              PandaAds Agency își rezervă dreptul de a modifica acești Termeni și Condiții în orice moment, fără notificare prealabilă. Orice modificare va deveni efectivă din momentul publicării pe Site. Vă recomandăm să verificați periodic această pagină pentru a fi la curent cu eventualele schimbări.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Legea Aplicabilă și Jurisdicție</h2>
            <p>
              Prezenții Termeni și Condiții sunt guvernați și interpretați în conformitate cu legile din România. Orice litigiu apărut în legătură cu utilizarea Site-ului sau cu serviciile oferite de PandaAds Agency va fi soluționat pe cale amiabilă. Dacă acest lucru nu este posibil, litigiul va fi înaintat instanțelor judecătorești competente din România.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact</h2>
            <p>
              Pentru orice întrebări sau clarificări referitoare la acești Termeni și Condiții, ne puteți contacta la:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>E-mail: <a href="mailto:contact@pandaads.ro" className="text-emerald-600 hover:text-emerald-700">contact@pandaads.ro</a></li>
              <li>Telefon: +40 734 200 700</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
