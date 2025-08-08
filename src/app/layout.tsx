import Navbar from '../components/Navbar';
import './global.css';

export const metadata = {
  title: 'Natali og Fredrik',
  description: 'Velkommen til vårt bryllup',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className="bg-wedding-gold-100 h-full min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
