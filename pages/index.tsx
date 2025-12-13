import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import PortfolioHome from "@/components/PortfolioHome";
import ProfessionalJourney from "@/components/ProfessionalJourney";
import ScrollToTop from "@/components/ScrollToTop";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";


export default function Home() {
  return (
    <ThemeProvider>
    <div
      className="max-w-8xl flex flex-col min-h-screen items-center justify-center gap-10 bg-zinc-50 font-sans dark:bg-gray-800"
    >
         <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
              </div>
        <HeroSection imageUrl="/dev1.png" />
        <AboutSection />
        <TechnicalArsenal/>
        <ProfessionalJourney/>
        <PortfolioHome />
        <ContactSection />
        <CTASection />
        <ScrollToTop/>
        <Footer />
    </div>
      </ThemeProvider>
  );
}
