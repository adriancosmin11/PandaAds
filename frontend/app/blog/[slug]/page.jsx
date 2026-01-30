import React from 'react';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }) {
  const { slug } = await params;
  const prisma = new PrismaClient();

  try {
    const record = await prisma.siteContent.findUnique({ where: { sectionKey: 'blog_posts' } });
    const posts = record && Array.isArray(record.content) ? record.content : [];
    const post = posts.find((p) => p.slug === slug);
    if (!post) return notFound();

    // Formatează data mai frumos
    const formattedDate = post.date ? new Date(post.date).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : new Date().toLocaleDateString('ro-RO');

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header cu buton back */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
              <ArrowLeft size={18} />
              Înapoi la blog
            </Link>
          </div>
        </div>

        {/* Main content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-10 bg-gray-200">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            {/* Category Tag */}
            {post.category && (
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-emerald-600 rounded-full"></div>
                <span className="text-sm font-bold uppercase tracking-wider text-emerald-600">{post.category}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{post.author}</div>
                    <div className="text-xs text-gray-500">Autor</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm">{formattedDate}</span>
              </div>

              {/* Reading time estimate */}
              <div className="text-sm text-gray-500">
                {Math.ceil((post.body || post.excerpt || '').split(' ').length / 200)} min citire
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-12">
            {post.body ? (
              <div 
                className="text-gray-700 leading-relaxed space-y-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-gray-900 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-gray-800 [&>p]:leading-7 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:space-y-2 [&>li]:text-gray-700 [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>a]:text-emerald-600 [&>a]:hover:text-emerald-700 [&>a]:underline"
                dangerouslySetInnerHTML={{ __html: post.body }} 
              />
            ) : (
              <p className="text-gray-700 text-lg leading-7">{post.excerpt}</p>
            )}
          </div>

          {/* Article Footer */}
          <div className="border-t border-gray-200 pt-8">
            {/* Share Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 mb-8 border border-emerald-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Partajează acest articol</h3>
                  <p className="text-sm text-gray-600">Ajută și alți specialiști să descobere acest conținut</p>
                </div>
                <div className="flex gap-3">
                  <ShareButton 
                    url={`https://pandaads.ro/blog/${post.slug}`}
                    platform="facebook"
                    title={post.title}
                  />
                  <ShareButton 
                    url={`https://pandaads.ro/blog/${post.slug}`}
                    platform="twitter"
                    title={post.title}
                  />
                  <ShareButton 
                    url={`https://pandaads.ro/blog/${post.slug}`}
                    platform="linkedin"
                    title={post.title}
                  />
                </div>
              </div>
            </div>

            {/* Author Info */}
            {post.author && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Despre {post.author}</h4>
                    <p className="text-gray-600 text-sm">Specialist în marketing digital și SEO cu experiență în creșterea afacerilor online.</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-8 text-center text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Ai nevoie de ajutor cu marketingul tău?</h3>
              <p className="mb-4 text-emerald-50">Contactează-ne pentru o consultație gratuită</p>
              <Link 
                href="/contact" 
                className="inline-block bg-white text-emerald-600 font-bold px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Contactează-ne acum
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="bg-gray-50 border-t border-gray-200 mt-16 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Alte articole din blog</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {posts
                .filter(p => p.slug !== slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    {relatedPost.image && (
                      <div className="relative h-40 bg-gray-200 overflow-hidden">
                        <Image 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-xs font-bold text-emerald-600 mb-2">{relatedPost.category}</div>
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error('Error loading post:', e);
    return notFound();
  }
}

// Componenta pentru Share buttons
function ShareButton({ url, platform, title }) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const labels = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
  };

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors border border-gray-200"
      title={`Partajează pe ${labels[platform]}`}
    >
      <Share2 size={16} />
      {labels[platform]}
    </a>
  );
}
