import './globals.css'
import { Noto_Sans } from 'next/font/google'
import  { Toaster } from 'react-hot-toast';
import Provider from '@/providers';

const inter = Noto_Sans({ 
  weight: ['400','500', '600', '700', '800'],
  subsets: ['latin'] 
})

export const metadata = {
  title: 'Write Something',
  description: 'Write Something',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Provider>
            {children}
          </Provider>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </body>
    </html>
  )
}
