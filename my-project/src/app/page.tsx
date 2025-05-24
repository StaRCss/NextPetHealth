// src/app/page.tsx
import { Metadata } from 'next';
import HeroSection from '@/components/landing/hero';
import FeaturesSection from '@/components/landing/features/featuresSection';
import Footer from '@/components/landing/footer/Footer';
import LandingNav from '@/components/landing/landingnav';
import Divider from '@/components/landing/divider';
import FAQs from '@/components/landing/faq/faqs';


export const metadata: Metadata = {
  title: "Track Your Pet's Health and Wellness",
  description: "Easily monitor your pet's health, diet, and activities all in one place.",
  openGraph: {
    title: "Track Your Pet's Health and Wellness",
    description: "Monitor your pet's health, diet, and activities all in one place.",
    url: "https://yourwebsite.com",
  },
  robots: "index, follow",
};

const Page: React.FC = () => {
  return (
    <main>
      <LandingNav/>
      <HeroSection />
      <FeaturesSection />
      <Divider />
      <FAQs/>
      <Footer/>
      {/* Add more sections as needed */}
    </main>
  );
};

export default Page;
