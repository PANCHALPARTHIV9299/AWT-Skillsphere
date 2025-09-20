import React, { useState } from 'react';
import { Calendar, BookOpen, Mic, Users } from 'lucide-react';

const domains = [
  'Artificial Intelligence',
  'Quantum Computing',
  'Data Science',
  'Blockchain',
  'Other'
];

const types = ['Workshop', 'Expert Talk', 'Seminar'];

const TeacherUploadEvent = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    domain: domains[0],
    type: types[0],
    speaker: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Store event in localStorage
    const events = localStorage.getItem('events');
    const eventsList = events ? JSON.parse(events) : [];
    eventsList.push({
      id: Date.now(),
      ...form
    });
    localStorage.setItem('events', JSON.stringify(eventsList));
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-xl w-full bg-white border-2 border-black shadow-2xl p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 justify-center">
          <Calendar className="text-blue-600" /> Upload New Event
        </h1>
        {submitted ? (
          <div className="text-center text-green-600">
            <Users className="mx-auto mb-4 text-green-600" size={32} />
            <h2 className="text-lg font-semibold mb-2">Event Uploaded!</h2>
            <p>Your event has been submitted for review and will appear in the student dashboard once approved.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Event Title"
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="domain"
              value={form.domain}
              onChange={handleChange}
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="text"
              name="speaker"
              value={form.speaker}
              onChange={handleChange}
              placeholder="Speaker Name"
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Event Description"
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              required
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full text-lg px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherUploadEvent;