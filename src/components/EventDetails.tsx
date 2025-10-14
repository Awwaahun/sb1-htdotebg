import { Calendar, MapPin, Clock } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function EventDetails() {
  const events = [
    {
      title: 'Wedding Ceremony',
      time: '2:00 PM',
      location: 'St. Mary\'s Cathedral',
      address: '123 Church Street, Downtown',
      description: 'Join us as we exchange our vows in the presence of our loved ones',
      icon: Calendar,
    },
    {
      title: 'Reception',
      time: '5:00 PM',
      location: 'Grand Hotel Ballroom',
      address: '456 Celebration Avenue, City Center',
      description: 'Celebrate with us with dinner, dancing, and unforgettable memories',
      icon: Clock,
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">When & Where</h2>
          <p className="text-gray-600">We can't wait to celebrate with you!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => {
            const EventCard = () => {
              const { elementRef, isVisible } = useScrollAnimation();
              return (
                <div
                  ref={elementRef}
                  className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-on-scroll ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-rose-100 p-4 rounded-full mr-4 animate-wave">
                      <event.icon className="text-rose-600" size={32} />
                    </div>
                <div>
                  <h3 className="text-2xl font-serif text-gray-800">{event.title}</h3>
                  <p className="text-rose-600 font-medium">{event.time}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-gray-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-800">{event.location}</p>
                    <p className="text-gray-600 text-sm">{event.address}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed pl-8">{event.description}</p>

                    <button className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-105">
                      <MapPin size={18} />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>
              );
            };
            return <EventCard key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
