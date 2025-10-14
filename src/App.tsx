import { Heart, Calendar, MapPin, Gift, Users, Clock, MessageCircle, UserCircle, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Couple from './components/Couple';
import Story from './components/Story';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import Donation from './components/Donation';
import RSVP from './components/RSVP';
import GuestBook from './components/GuestBook';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 md:space-x-8">
            {[
              { icon: Heart, label: 'Home', id: 'hero' },
              { icon: UserCircle, label: 'Couple', id: 'couple' },
              { icon: Users, label: 'Story', id: 'story' },
              { icon: Calendar, label: 'Event', id: 'event' },
              { icon: Gift, label: 'Gallery', id: 'gallery' },
              { icon: Wallet, label: 'Gift', id: 'donation' },
              { icon: MessageCircle, label: 'RSVP', id: 'rsvp' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-rose-600' : 'text-white hover:text-rose-200'
                }`}
              >
                <item.icon size={18} />
                <span className="hidden md:inline text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Sections */}
      <div id="hero">
        <Hero />
      </div>

      <Countdown />

      <div id="couple">
        <Couple />
      </div>

      <div id="story">
        <Story />
      </div>

      <div id="event">
        <EventDetails />
      </div>

      <div id="gallery">
        <Gallery />
      </div>

      <div id="donation">
        <Donation />
      </div>

      <div id="rsvp">
        <RSVP />
      </div>

      <GuestBook />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Heart className="inline-block text-rose-500 mb-2" size={24} />
          <p className="text-sm">Made with love for our special day</p>
          <p className="text-xs text-gray-400 mt-2">© 2025 - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
