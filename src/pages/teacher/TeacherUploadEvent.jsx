import React, { useState } from 'react';
import { Calendar, BookOpen, Mic, Users } from 'lucide-react';
import { createSeminar } from '../../lib/api';

const domains = [
  'Artificial Intelligence',
  'Quantum Computing',
  'Data Science',
  'Blockchain',
  'Other'
];

const types = ['Workshop', 'Seminar'];

const TeacherUploadEvent = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    capacity: 0,
    type: 'Seminar',
    speaker: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        date: form.date,
        time: form.time,
        speaker: form.speaker,
        venue: form.venue,
        capacity: Number(form.capacity) || 0,
        type: (form.type || 'Seminar').toLowerCase()
      };
      await createSeminar(payload);
      setSubmitted(true);
    } catch (err) {
      setError(typeof err === 'string' ? err : err.message || 'Failed to create');
    }
  };

  return (
    <div className="h-screen bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))] flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-xl w-full bg-[hsl(var(--card))] dark:bg-[hsl(var(--card))] border-2 border-border shadow-2xl p-8 rounded-lg">
  <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] mb-6 flex items-center gap-2 justify-center">
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
              className="border border-border bg-[hsl(var(--input))] dark:bg-[hsl(var(--input))] text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-border bg-[hsl(var(--input))] dark:bg-[hsl(var(--input))] text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="border border-border bg-[hsl(var(--input))] dark:bg-[hsl(var(--input))] text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-border bg-[hsl(var(--input))] dark:bg-[hsl(var(--input))] text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-border bg-[hsl(var(--input))] dark:bg-[hsl(var(--input))] text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Venue"
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Event Description"
              className="border border-border bg-[hsl(var(--input))] dark:bg-[hsl(var(--input))] text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              required
            />
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              className="border border-blue-600 bg-white text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <div className="text-red-600">{error}</div>}
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