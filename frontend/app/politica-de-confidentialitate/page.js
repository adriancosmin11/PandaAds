import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Politica de Confidențialitate - PandaAds",
  description: "Politica de confidențialitate și prelucrarea datelor cu caracter personal pentru PandaAds.",
};

export default function PoliticaDeConfidentialitatePage() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold mb-8 text-emerald-900">Politica de Confidențialitate</h1>
        
        <div className="prose prose-emerald max-w-none space-y-6">
          <p className="text-sm text-gray-500">Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introducere</h2>
            <p>
              La <strong>PandaAds Agency</strong>, ne angajăm să vă protejăm confidențialitatea și să tratăm datele dumneavoastră personale cu cel mai înalt nivel de siguranță. Această Politică de Confidențialitate este menită să vă informeze despre modul în care colectăm, utilizăm, protejăm și, dacă este cazul, partajăm informațiile cu caracter personal ale utilizatorilor site-ului <strong>pandaads.ro</strong>, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Datele Pe Care le Colectăm</h2>
            <p>
              Site-ul nostru colectează anumite date cu caracter personal, în scopurile descrise mai jos. Aceste date pot fi:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Date furnizate direct de dumneavoastră:</strong> Nume, prenume, adresă de e-mail, număr de telefon, denumirea companiei și orice alte informații introduse în formularele noastre de contact, cerere ofertă sau audit.</li>
              <li><strong>Date colectate automat:</strong> Adresa IP, tipul de browser, sistemul de operare, ora și data accesării site-ului, paginile vizitate, prin intermediul cookie-urilor și tehnologiilor similare (ex. Facebook Pixel, TikTok Pixel, Google Analytics).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Scopul Prelucrării Datelor</h2>
            <p>
              Colectăm și prelucrăm datele cu caracter personal cu următoarele scopuri:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Comunicare și asistență:</strong> Răspunsul la solicitările dvs., trimiterea de oferte personalizate, clarificarea cerințelor din formularele completate.</li>
              <li><strong>Marketing și analiză:</strong> Evaluarea performanței campaniilor de publicitate și înțelegerea modului în care vizitatorii interacționează cu site-ul nostru (prin Google Analytics, Facebook Pixel, TikTok Pixel). Trimiterea de oferte speciale sau newsletter-uri (doar în cazul în care v-ați abonat/optat pentru acest lucru).</li>
              <li><strong>Îmbunătățirea site-ului:</strong> Optimizarea experienței utilizatorului și rezolvarea eventualelor probleme tehnice.</li>
              <li><strong>Încheierea și executarea contractelor:</strong> Procesarea datelor necesare pentru prestarea serviciilor solicitate și emiterea facturilor.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Partajarea și Transferul Datelor</h2>
            <p>
              PandaAds Agency nu vinde, nu închiriază și nu tranzacționează datele dumneavoastră cu caracter personal. Putem partaja datele dvs. doar cu:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Furnizori terți de servicii necesare pentru desfășurarea activității noastre (ex. platforme de e-mail, găzduire web, instrumente de analiză a traficului - Google, Meta, TikTok), toți sub rezerva conformității cu GDPR.</li>
              <li>Autorități legale competente, în cazul în care există o obligație statutară și ni se solicită acest lucru conform legii.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Reținerea Datelor</h2>
            <p>
              Vom reține datele cu caracter personal pe o perioadă necesară realizării scopurilor pentru care au fost colectate sau, dacă este necesar, pe durata impusă de legislația aplicabilă (ex. documente financiar-contabile). La expirarea termenului de retenție, datele vor fi șterse sau anonimizate în siguranță.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Drepturile Dumneavoastră</h2>
            <p>
              Conform legislației GDPR, beneficiați de următoarele drepturi persoanelor vizate:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Dreptul de acces:</strong> Puteți solicita confirmarea faptului că vă prelucrăm datele și o copie a acestora.</li>
              <li><strong>Dreptul la rectificare:</strong> Puteți cere corectarea datelor personale inexacte sau incomplete.</li>
              <li><strong>Dreptul la ștergere („dreptul de a fi uitat”):</strong> Puteți solicita ștergerea datelor dvs. (există excepții prevăzute de lege).</li>
              <li><strong>Dreptul la restricționarea prelucrării:</strong> Puteți restricționa modul în care folosim datele dvs. în anumite condiții.</li>
              <li><strong>Dreptul la portabilitatea datelor:</strong> Puteți solicita datele dvs. personale într-un format structurat, ce poate fi citit de un computer.</li>
              <li><strong>Dreptul la opoziție:</strong> Vă puteți opune prelucrării datelor dvs. în scopuri de marketing direct sau în baza unor interese legitime.</li>
              <li><strong>Dreptul de a retrage consimțământul:</strong> Dacă ați consimțit anterior la prelucrare, vă puteți retrage consimțământul în orice moment, fără a fi afectat legal.</li>
            </ul>
            <p className="mt-2">
              Pentru a vă exercita oricare dintre aceste drepturi, ne puteți contacta trimițând un e-mail la <a href="mailto:contact@pandaads.ro" className="text-emerald-600 hover:text-emerald-700">contact@pandaads.ro</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modificări ale Politicii de Confidențialitate</h2>
            <p>
              Această Politică de Confidențialitate poate fi actualizată sau modificată periodic. Versiunea cea mai recentă va fi întotdeauna disponibilă pe această pagină. Vă încurajăm să verificați periodic acest document pentru a vă menține informat despre cum vă prelucrăm și protejăm datele.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact</h2>
            <p>
              Dacă aveți întrebări, preocupări sau solicitări legate de această Politică de Confidențialitate sau despre modul în care gestionăm datele dumneavoastră personale, vă rugăm să ne contactați:
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
