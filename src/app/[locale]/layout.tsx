import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from './Header'
import Sidebar from './Sidebar'
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from '@/components/providers'
import { NextIntlClientProvider } from 'next-intl'
import {getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team Sync',
  description: 'A business-oriented team collaboration platform',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'my' }, { locale: 'zh' }]
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex flex-col h-screen bg-background">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    {children}
                  </main>
                </div>
              </div>
            </ThemeProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}