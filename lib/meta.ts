import type { Metadata } from 'next'
import { env } from './env'

interface Props {
  title: string
  description?: string
  canonical?: string
  keywords?: string[]
  openGraphImage?: string
  openGraphType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
}

export const domain = env.NEXT_PUBLIC_APP_URL || 'https://duythaidev-portfolio.vercel.app'
export const siteName = 'duythaidev-portfolio'
const defaultOgImage = '/opengraph-image'
const defaultAuthor = 'duythaidev-portfolio'

export default function meta({
  title,
  description = 'duythaidev portfolio - This is my personal portfolio website showing my projects and experience with some cool animations and effects.',
  canonical,
  keywords,
  openGraphImage = defaultOgImage,
  openGraphType = 'website',
  publishedTime,
  modifiedTime,
  category = 'Portfolio',
  author = defaultAuthor,
  ...props
}: Props & Partial<Metadata>): Metadata {
  const absoluteCanonical = canonical ? `${domain}${canonical.startsWith('/') ? canonical : `/${canonical}`}` : domain

  const ogImage = openGraphImage.startsWith('http') ? openGraphImage : `${domain}${openGraphImage}`

  return {
    title,
    description,
    metadataBase: new URL(domain),
    applicationName: siteName,
    referrer: 'origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: absoluteCanonical,
      languages: {
        'vi-VN': absoluteCanonical,
      },
    },
    keywords: keywords ?? [
      'duythaidev',
      'duythaidev-portfolio',
      'duythai'
    ],
    openGraph: {
      title,
      description,
      url: absoluteCanonical,
      siteName,
      type: openGraphType,
      locale: 'vi_VN',
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: author,
      images: [ogImage],
    },
    authors: [{ name: author }],
    publisher: author,
    category,
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/apple-icon.png',
    },
    manifest: '/manifest.webmanifest',
    ...(openGraphType === 'article'
      ? {
          openGraph: {
            type: 'article',
            ...{
              title,
              description,
              url: absoluteCanonical,
              siteName,
              locale: 'vi_VN',
              images: [
                {
                  url: ogImage,
                  secureUrl: ogImage,
                  width: 1200,
                  height: 630,
                  alt: `${title} - ${siteName}`,
                },
              ],
              publishedTime,
              modifiedTime,
              authors: [author],
              section: category,
            },
          },
        }
      : {}),

    ...props,
  }
}
