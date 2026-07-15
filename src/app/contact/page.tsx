import Contact from '@/components/Contact';

export const metadata = {
  title: 'Contact Us | DeepTech.AI 2026',
  description: 'Get in touch with the DeepTech.AI 2026 organizing committee for inquiries about the summit, registration, or sponsorship opportunities.',
};

export default function ContactPage() {
  return (
    <main className="flex-grow pt-20">
      <Contact />
    </main>
  );
}
