import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attending: 'yes',
    dietary: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('rsvp').insert([
        {
          name: formData.name,
          email: formData.email,
          guests: parseInt(formData.guests),
          attending: formData.attending === 'yes',
          dietary_requirements: formData.dietary,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        guests: '1',
        attending: 'yes',
        dietary: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-20 bg-gradient-to-br from-rose-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-12 text-center animate-scale-in">
            <Heart className="text-rose-500 mx-auto mb-4 animate-pulse-glow" size={64} fill="currentColor" />
            <h2 className="text-3xl font-serif text-gray-800 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your RSVP has been received. We're so excited to celebrate with you!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              Submit another RSVP
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">RSVP</h2>
          <p className="text-gray-600">Please let us know if you can join us</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="john@example.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Number of Guests *</label>
                <select
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Will you attend? *</label>
                <select
                  required
                  value={formData.attending}
                  onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Dietary Requirements</label>
              <input
                type="text"
                value={formData.dietary}
                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Vegetarian, allergies, etc."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message to the Couple</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Share your wishes for the happy couple..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
            >
              {submitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send RSVP</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
