'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Save, Layout, Loader2, AlignLeft, DollarSign, Mail, BookOpen, Upload, X } from 'lucide-react';
import { getSiteContent, updateSiteContent } from '../../../actions';

// Lista secțiunilor pe care le putem edita
const SECTIONS = [
  { id: 'hero_section', label: 'Home: Hero (Sus)', icon: Layout },
  { id: 'services_section', label: 'Home: Servicii', icon: AlignLeft },
  { id: 'ads_pricing', label: 'Home: Prețuri Ads', icon: DollarSign },
  { id: 'contact_page', label: 'Pagina: Contact', icon: Mail },
  { id: 'ebook_page', label: 'Pagina: Ebook', icon: BookOpen },
  { id: 'blog_posts', label: 'Blog: Posts', icon: BookOpen },
];

export default function EditorPage() {
  const [currentSection, setCurrentSection] = useState('hero_section');
  const [formData, setFormData] = useState({});
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Încărcăm datele de fiecare dată când schimbăm secțiunea din dropdown
  useEffect(() => {
    setLoading(true);
    async function load() {
      const data = await getSiteContent(currentSection);
      if (currentSection === 'blog_posts') {
        setBlogPosts(Array.isArray(data) ? data : []);
        setFormData({});
      } else {
        setFormData(data || {}); // Dacă nu există date, folosim un obiect gol
      }
      setLoading(false);
    }
    load();
  }, [currentSection]);

  const handleSave = async () => {
    setSaving(true);
    let result;
    if (currentSection === 'blog_posts') {
      result = await updateSiteContent(currentSection, blogPosts);
    } else {
      result = await updateSiteContent(currentSection, formData);
    }
    setSaving(false);
    if (result.success) alert('✅ Salvat cu succes!');
    else alert('❌ Eroare: ' + result.message);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Upload imagine pentru blog
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setEditingPost(prev => ({ ...prev, image: data.imagePath }));
        alert('✅ Imagine încărcată cu succes!');
      } else {
        alert('❌ Eroare: ' + data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Eroare la încărcarea imaginii.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Blog posts helpers (client-side state, saved via updateSiteContent)
  const addOrUpdatePost = async (post) => {
    // Basic validation
    if (!post.title || !post.slug) {
      alert('Titlu și slug sunt obligatorii.');
      return;
    }

    const newPosts = (() => {
      // compute new posts array locally first
      const prev = blogPosts || [];
      const duplicate = prev.some((p) => p.slug === post.slug && p.id !== post.id);
      if (duplicate) {
        alert('Slug-ul trebuie să fie unic. Există deja un articol cu acest slug.');
        return prev;
      }

      if (!post.id) {
        post.id = Date.now();
        return [post, ...prev];
      }
      return prev.map(p => (p.id === post.id ? post : p));
    })();

    // update UI immediately
    setBlogPosts(newPosts);
    setEditingPost(null);

    // persist to DB via server action
    try {
      setSaving(true);
      const res = await updateSiteContent('blog_posts', newPosts);
      setSaving(false);
      if (!res.success) {
        alert('Eroare la salvarea articolului: ' + res.message);
      } else {
        alert('Articol salvat.');
      }
    } catch (e) {
      setSaving(false);
      console.error(e);
      alert('Eroare la salvare. Verifică consola.');
    }
  };

  const editPost = (post) => {
    setEditingPost(post);
  };

  const deletePost = async (id) => {
    if (!confirm('Ștergi acest articol?')) return;
    const newPosts = (blogPosts || []).filter(p => p.id !== id);
    setBlogPosts(newPosts);

    try {
      setSaving(true);
      const res = await updateSiteContent('blog_posts', newPosts);
      setSaving(false);
      if (!res.success) alert('Eroare la ștergere: ' + res.message);
    } catch (e) {
      setSaving(false);
      console.error(e);
      alert('Eroare la ștergere. Verifică consola.');
    }
  };

  // Randarea condițională a câmpurilor în funcție de secțiune
  const renderForm = () => {
    switch (currentSection) {
      case 'hero_section':
        return (
          <div className="space-y-4">
             <Input label="Badge (Text mic sus)" name="badge" val={formData.badge} onChange={handleChange} />
             <div className="grid grid-cols-2 gap-4">
                <Input label="Titlu Prefix" name="titlePrefix" val={formData.titlePrefix} onChange={handleChange} />
                <Input label="Titlu Highlight (Colorat)" name="titleHighlight" val={formData.titleHighlight} onChange={handleChange} />
             </div>
             <TextArea label="Subtitlu" name="subtitle" val={formData.subtitle} onChange={handleChange} />
             <div className="grid grid-cols-2 gap-4">
                <Input label="Buton Principal" name="btnPrimary" val={formData.btnPrimary} onChange={handleChange} />
                <Input label="Buton Secundar" name="btnSecondary" val={formData.btnSecondary} onChange={handleChange} />
             </div>
             <div className="grid grid-cols-3 gap-4">
                <Input label="Beneficiu 1" name="trust1" val={formData.trust1} onChange={handleChange} />
                <Input label="Beneficiu 2" name="trust2" val={formData.trust2} onChange={handleChange} />
                <Input label="Beneficiu 3" name="trust3" val={formData.trust3} onChange={handleChange} />
             </div>
          </div>
        );

      case 'services_section':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold mb-4 text-emerald-700">Header Secțiune</h4>
                <Input label="Titlu Mic (Badge)" name="badge" val={formData.badge} onChange={handleChange} />
                <Input label="Titlu Mare" name="title" val={formData.title} onChange={handleChange} />
                <TextArea label="Descriere Scurtă" name="subtitle" val={formData.subtitle} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase">Card 1 (Meta Ads)</p>
                    <Input label="Titlu" name="card1_title" val={formData.card1_title} onChange={handleChange} />
                    <TextArea label="Descriere" name="card1_desc" val={formData.card1_desc} onChange={handleChange} />
                </div>
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase">Card 2 (TikTok)</p>
                    <Input label="Titlu" name="card2_title" val={formData.card2_title} onChange={handleChange} />
                    <TextArea label="Descriere" name="card2_desc" val={formData.card2_desc} onChange={handleChange} />
                </div>
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase">Card 3 (Web)</p>
                    <Input label="Titlu" name="card3_title" val={formData.card3_title} onChange={handleChange} />
                    <TextArea label="Descriere" name="card3_desc" val={formData.card3_desc} onChange={handleChange} />
                </div>
            </div>
          </div>
        );

      case 'ads_pricing':
        return (
            <div className="space-y-4">
                <Input label="Titlu Secțiune" name="title" val={formData.title} onChange={handleChange} />
                <TextArea label="Subtitlu" name="subtitle" val={formData.subtitle} onChange={handleChange} />
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold mb-2 text-blue-800">Prețuri Pachete</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <Input label="Preț Silver" name="price_silver" val={formData.price_silver} onChange={handleChange} />
                        <Input label="Preț Gold" name="price_gold" val={formData.price_gold} onChange={handleChange} />
                        <Input label="Preț Platinum" name="price_platinum" val={formData.price_platinum} onChange={handleChange} />
                    </div>
                </div>
            </div>
        );

      case 'contact_page':
        return (
            <div className="space-y-4">
                <Input label="Titlu Pagină" name="title" val={formData.title} onChange={handleChange} />
                <TextArea label="Text Introductiv" name="subtitle" val={formData.subtitle} onChange={handleChange} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Email Afișat" name="contact_email" val={formData.contact_email} onChange={handleChange} />
                    <Input label="Telefon Afișat" name="contact_phone" val={formData.contact_phone} onChange={handleChange} />
                </div>
            </div>
        );

        case 'ebook_page':
            return (
                <div className="space-y-4">
                    <Input label="Titlu Ebook" name="title" val={formData.title} onChange={handleChange} />
                    <TextArea label="Descriere" name="description" val={formData.description} onChange={handleChange} />
                    <Input label="Text Buton Download" name="btnText" val={formData.btnText} onChange={handleChange} />
                </div>
            );
    
      case 'blog_posts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Articole Blog</h3>
              <button onClick={() => setEditingPost({})} className="px-3 py-2 bg-emerald-600 text-white rounded-lg">Adaugă articol</button>
            </div>

            {/* List */}
            <div className="grid gap-4">
              {blogPosts.length === 0 && (
                <div className="p-6 bg-gray-50 rounded-lg text-gray-500">Nu există articole.</div>
              )}

              {blogPosts.map((post) => (
                <div key={post.id} className="p-4 bg-white rounded-lg border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">/{post.slug} • {post.category || '-'} • {post.author || '-'}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editPost(post)} className="px-3 py-1 bg-blue-50 text-blue-700 rounded">Edit</button>
                    <button onClick={() => deletePost(post.id)} className="px-3 py-1 bg-red-50 text-red-700 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Editor modal-ish area */}
            {editingPost !== null && (
              <div className="p-4 bg-white rounded-lg border border-gray-100">
                <h4 className="font-bold mb-3">{editingPost.id ? 'Editează articol' : 'Adaugă articol'}</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input label="Titlu" name="title" val={editingPost.title} onChange={(k, v) => setEditingPost(prev => ({ ...prev, title: v }))} />
                  <Input label="Slug" name="slug" val={editingPost.slug} onChange={(k, v) => setEditingPost(prev => ({ ...prev, slug: v }))} />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input label="Categorie" name="category" val={editingPost.category} onChange={(k, v) => setEditingPost(prev => ({ ...prev, category: v }))} />
                  <Input label="Autor" name="author" val={editingPost.author} onChange={(k, v) => setEditingPost(prev => ({ ...prev, author: v }))} />
                </div>
                
                {/* Image Upload Section */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Imagine Articol</label>
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                        {uploading ? 'Se încarcă...' : 'Alege imagine din computer'}
                      </button>
                    </div>
                    {editingPost.image && (
                      <button 
                        type="button"
                        onClick={() => setEditingPost(prev => ({ ...prev, image: '' }))}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  {editingPost.image && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 mb-1">Path: <span className="font-mono text-xs text-emerald-600">{editingPost.image}</span></p>
                      <div className="relative w-40 h-24 bg-gray-200 rounded-lg overflow-hidden">
                        <img src={editingPost.image} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                <TextArea label="Excerpt (Text scurt)" name="excerpt" val={editingPost.excerpt} onChange={(k, v) => setEditingPost(prev => ({ ...prev, excerpt: v }))} />
                <TextAreaLarge label="Conținut Articol (Text complet cu HTML)" name="body" val={editingPost.body} onChange={(k, v) => setEditingPost(prev => ({ ...prev, body: v }))} />
                
                {/* Data informare */}
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4 text-sm text-blue-800">
                  <strong>Data publicării:</strong> {editingPost.date ? new Date(editingPost.date).toLocaleDateString('ro-RO') : 'Setată automat la salvare'}
                </div>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => {
                    const postToSave = { ...editingPost };
                    // Dacă e articol nou, setează data curentă
                    if (!postToSave.id) {
                      postToSave.date = new Date().toISOString();
                    }
                    // Dacă e edit, păstrează data originală
                    addOrUpdatePost(postToSave);
                  }} className="px-4 py-2 bg-emerald-600 text-white rounded">Salvează articol</button>
                  <button onClick={() => setEditingPost(null)} className="px-4 py-2 bg-gray-50 rounded">Anulează</button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div>Selectează o secțiune validă.</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Editor Conținut</h1>
            <p className="text-gray-500">Alege ce parte a site-ului vrei să modifici.</p>
        </div>
        
        <div className="flex gap-3 items-center">
            <div className="relative">
                <select 
                    value={currentSection}
                    onChange={(e) => setCurrentSection(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block w-64 p-3 pr-8 font-bold cursor-pointer shadow-sm"
                >
                    {SECTIONS.map((sec) => (
                        <option key={sec.id} value={sec.id}>{sec.label}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">▼</div>
            </div>

            <button 
                onClick={handleSave}
                disabled={saving || loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50"
            >
                {saving ? <Loader2 className="animate-spin" size={20}/> : <Save size={20} />} 
                Salvează
            </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 min-h-[400px]">
        {loading ? (
            <div className="flex justify-center items-center h-40 text-gray-400">
                <Loader2 className="animate-spin mr-2" /> Se încarcă datele...
            </div>
        ) : (
            renderForm()
        )}
      </div>
    </div>
  );
}

// Componente Helper simple pentru a nu repeta codul HTML
const Input = ({ label, name, val, onChange }) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">{label}</label>
        <input 
            type="text" 
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-gray-800"
            value={val || ''}
            onChange={(e) => onChange(name, e.target.value)}
        />
    </div>
);

const TextArea = ({ label, name, val, onChange }) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">{label}</label>
        <textarea 
            rows="3"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-gray-800"
            value={val || ''}
            onChange={(e) => onChange(name, e.target.value)}
        />
    </div>
);

const TextAreaLarge = ({ label, name, val, onChange }) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">{label}</label>
        <textarea 
            rows="10"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-gray-800 font-mono text-sm"
            value={val || ''}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder="Poți folosi HTML pentru formatare: <h2>Titlu</h2>, <p>Paragraf</p>, <strong>Bold</strong>, etc."
        />
    </div>
);