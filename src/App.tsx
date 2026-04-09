import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Scissors, 
  Palette, 
  Sparkles, 
  Wind, 
  Crown, 
  MapPin, 
  Calendar, 
  Music2, 
  Instagram, 
  ChevronRight,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const services = [
  { name: "Precision Cuts", icon: <Scissors className="w-5 h-5" />, description: "Expertly tailored cuts for every hair type and face shape." },
  { name: "Couture Color", icon: <Palette className="w-5 h-5" />, description: "From subtle balayage to bold transformations." },
  { name: "Royal Styling", icon: <Crown className="w-5 h-5" />, description: "Red carpet ready styles for your most special moments." },
  { name: "Nourishing Treatments", icon: <Sparkles className="w-5 h-5" />, description: "Revitalize your hair with premium deep conditioning." },
  { name: "Master Braiding", icon: <Wind className="w-5 h-5" />, description: "Intricate and protective styles crafted with precision." },
  { name: "Wig & Extensions", icon: <ArrowRight className="w-5 h-5" />, description: "Seamless fixing and custom wig services." },
];

// Generate 47 gallery images
const galleryImages = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/seed/hair-style-${i + 100}/800/1000`,
  title: `Transformation ${i + 1}`
}));

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-neutral text-brand-purple selection:bg-brand-gold selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Crown className="w-8 h-8 text-brand-gold" />
            <span className="text-xl font-serif font-bold tracking-tighter uppercase">
              Johobeh <span className="text-brand-gold">Beauty</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            {["Services", "Gallery", "Location"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-brand-gold transition-colors"
                onClick={(e) => {
                  if (item === "Gallery") {
                    e.preventDefault();
                    scrollToGallery();
                  }
                }}
              >
                {item}
              </a>
            ))}
            <Button className="bg-brand-purple hover:bg-brand-accent text-white rounded-none px-8 uppercase tracking-widest text-xs">
              Book Now
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {["Services", "Gallery", "Location"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-2xl font-serif"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="bg-brand-purple text-white rounded-none px-12 py-6 text-lg">
              Book Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/luxury-hair/1920/1080" 
            alt="Hero" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/40 via-transparent to-brand-neutral" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-brand-gold uppercase tracking-[0.4em] text-sm mb-6 font-medium">
              Premium Hairstyling Studio
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tight">
              Where Your Crown Gets <br />
              <span className="italic text-brand-gold">The Royal Treatment</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Button 
                onClick={scrollToGallery}
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-purple rounded-none px-10 py-7 text-sm uppercase tracking-widest font-bold border-none"
              >
                Explore Our Gallery
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-brand-purple rounded-none px-10 py-7 text-sm uppercase tracking-widest font-bold transition-all"
              >
                View Services
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-serif mb-6">Our Royal Services</h2>
              <p className="text-lg text-brand-purple/70 leading-relaxed">
                We believe every head of hair is a unique canvas. Our master stylists combine 
                artistry with technical expertise to deliver results that empower and inspire.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4 text-brand-gold font-serif italic text-xl">
                <span>Excellence in every strand</span>
                <Separator className="w-24 bg-brand-gold" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-purple/10 border border-brand-purple/10">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 group hover:bg-brand-purple transition-all duration-500 cursor-default"
              >
                <div className="text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-white transition-colors">
                  {service.name}
                </h3>
                <p className="text-brand-purple/60 group-hover:text-white/70 transition-colors leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} id="gallery" className="py-24 bg-brand-neutral">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Visual Proof</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6">The Gallery of Kings & Queens</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
                viewport={{ once: true }}
                className="break-inside-avoid"
              >
                <Card className="border-none bg-transparent overflow-hidden group rounded-none shadow-none">
                  <CardContent className="p-0 relative">
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-purple/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                      <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white font-serif text-lg italic">{img.title}</p>
                        <div className="w-8 h-[1px] bg-brand-gold mx-auto mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-purple text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-serif mb-8 max-w-4xl mx-auto leading-tight">
            Ready for Your <br />
            <span className="text-brand-gold italic">Royal Transformation?</span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
            Book your appointment today and experience the pinnacle of premium hairstyling.
          </p>
          <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-purple rounded-none px-12 py-8 text-lg uppercase tracking-widest font-bold">
            Schedule Your Visit
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="location" className="bg-white py-20 border-t border-brand-purple/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Crown className="w-8 h-8 text-brand-gold" />
                <span className="text-2xl font-serif font-bold tracking-tighter uppercase">
                  Johobeh <span className="text-brand-gold">Beauty</span>
                </span>
              </div>
              <p className="text-brand-purple/60 leading-relaxed mb-8">
                Dedicated to the art of hair and the empowerment of our clients. 
                Experience luxury that goes beyond the surface.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-brand-purple/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all">
                  <Music2 className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-brand-purple/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold mb-8 uppercase tracking-widest">Visit Us</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                  <p className="text-brand-purple/70">
                    123 Luxury Lane, Royal District <br />
                    Beauty Kingdom, BK 90210
                  </p>
                </div>
                <div className="flex gap-4">
                  <Calendar className="w-5 h-5 text-brand-gold shrink-0" />
                  <div className="text-brand-purple/70">
                    <p>Mon - Fri: 9am - 8pm</p>
                    <p>Sat: 10am - 6pm</p>
                    <p>Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold mb-8 uppercase tracking-widest">Newsletter</h4>
              <p className="text-brand-purple/60 mb-6">Subscribe for royal updates and exclusive offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-brand-neutral border-none px-4 py-3 w-full focus:ring-1 focus:ring-brand-gold outline-none"
                />
                <Button className="bg-brand-purple rounded-none px-6">
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-brand-purple/5 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-brand-purple/40 uppercase tracking-widest">
            <p>© 2026 JOHOBEH BEAUTY KINGDOM. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
