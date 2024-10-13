import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
type Locale = 'en' | 'my' | 'zh';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locale)) notFound();
 
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});