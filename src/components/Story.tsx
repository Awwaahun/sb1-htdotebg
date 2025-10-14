import { Heart } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Story() {
  const stories = [
    {
      title: 'First Meet',
      date: 'Spring 2019',
      description: 'Our story began at a cozy coffee shop on a rainy afternoon. A simple conversation about books turned into hours of laughter and connection.',
      image: 'https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'First Date',
      date: 'Summer 2019',
      description: 'Our first official date was a walk through the botanical gardens. We talked until sunset, and I knew I had found someone special.',
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'The Proposal',
      date: 'Winter 2023',
      description: 'Under a starlit sky on a mountain peak, James got down on one knee. Through happy tears, I said YES to forever with my best friend.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Our Love Story</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gray-300"></div>
            <Heart className="text-rose-500" size={20} fill="currentColor" />
            <div className="h-px w-16 bg-gray-300"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {stories.map((story, index) => {
            const StoryItem = () => {
              const { elementRef, isVisible } = useScrollAnimation();
              return (
                <div
                  ref={elementRef}
                  className={`flex flex-col md:flex-row gap-8 mb-16 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  } animate-on-scroll ${isVisible ? 'visible' : ''}`}
                >
                  <div className="md:w-1/2">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="rounded-lg shadow-lg w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className="text-rose-500 font-medium mb-2">{story.date}</div>
                    <h3 className="text-3xl font-serif text-gray-800 mb-4">{story.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{story.description}</p>
                  </div>
                </div>
              );
            };
            return <StoryItem key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
