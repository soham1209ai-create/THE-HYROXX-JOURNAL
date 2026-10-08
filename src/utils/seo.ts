import { Article, Category } from '../types';

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  articleData?: Article;
}

const SITE_NAME = 'The HYROX Journal';
const DEFAULT_IMAGE = '/images/hero_hyrox_arena.jpg';

export function updatePageSeo({
  title,
  description,
  canonicalPath = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  articleData,
}: SeoProps) {
  // 1. Update Document Title
  const formattedTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  document.title = formattedTitle;

  // 2. Resolve Canonical URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://thehyroxjournal.com';
  const fullUrl = `${origin}${canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : ''}`;
  const fullImageUrl = image.startsWith('http') ? image : `${origin}${image}`;

  // Helper to set or create meta tag
  const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Primary Meta Tags
  setMeta('name', 'description', description);
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // 4. OpenGraph Tags
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:title', formattedTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:url', fullUrl);
  setMeta('property', 'og:image', fullImageUrl);

  // 5. Twitter Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', formattedTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', fullImageUrl);

  // 6. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // 7. Dynamic Schema.org JSON-LD
  let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dynamic-page-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  if (articleData) {
    const articleSchema: Record<string, any> = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'NewsArticle',
          '@id': `${fullUrl}#article`,
          isPartOf: {
            '@type': 'WebSite',
            '@id': `${origin}/#website`,
            name: SITE_NAME,
            url: origin,
          },
          headline: articleData.title,
          description: articleData.excerpt,
          url: fullUrl,
          inLanguage: 'en-US',
          mainEntityOfPage: fullUrl,
          image: fullImageUrl,
          datePublished: '2026-09-01T08:00:00+00:00',
          dateModified: '2026-10-07T12:00:00+00:00',
          articleSection: articleData.category,
          keywords: articleData.tags.join(', '),
          author: {
            '@type': 'Person',
            name: articleData.author.name,
            jobTitle: articleData.author.role,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: origin,
            logo: {
              '@type': 'ImageObject',
              url: fullImageUrl,
            },
          },
        },
      ],
    };

    // If the article has FAQs, append FAQPage schema
    if (articleData.faq && articleData.faq.length > 0) {
      articleSchema['@graph'].push({
        '@type': 'FAQPage',
        '@id': `${fullUrl}#faq`,
        mainEntity: articleData.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    schemaScript.textContent = JSON.stringify(articleSchema, null, 2);
  } else {
    // Website / Archive Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: SITE_NAME,
      url: origin,
      description: description,
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: SITE_NAME,
        url: origin,
      },
    };
    schemaScript.textContent = JSON.stringify(websiteSchema, null, 2);
  }
}
