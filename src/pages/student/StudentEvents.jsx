import React, { useState } from 'react';
import { Calendar, Users, Mic, BookOpen } from 'lucide-react';

const eventsData = [
  {
    id: 1,
    title: 'AI Workshop: Building Neural Networks',
    date: '2025-09-25',
    domain: 'Artificial Intelligence',
    type: 'Workshop',
    speaker: 'Dr. Priya Sharma',
    description: 'Hands-on session on neural network architectures and training.'
  },
  {
    id: 2,
    title: 'Expert Talk: Future of Quantum Computing',
    date: '2025-09-28',
    domain: 'Quantum Computing',
    type: 'Expert Talk',
    speaker: 'Prof. John Lee',
    description: 'Insights into quantum algorithms and industry applications.'
  },
  {
    id: 3,
    title: 'Seminar: Data Science in Healthcare',
    date: '2025-10-02',
    domain: 'Data Science',
    type: 'Seminar',
    speaker: 'Dr. Anjali Mehta',
    description: 'Exploring data-driven solutions for healthcare challenges.'
  },
  {
    id: 4,
    title: 'Workshop: Web3 & Blockchain Basics',
    date: '2025-10-05',
    domain: 'Blockchain',
    type: 'Workshop',
    speaker: 'Ms. Ritu Agarwal',
    description: 'Introduction to blockchain technology and Web3 development.'
  }
];

const domains = [
  'All',
  'Artificial Intelligence',
  'Quantum Computing',
  'Data Science',
  'Blockchain'
];

const StudentEvents = () => {
  const [selectedDomain, setSelectedDomain] = useState('All');

  // Merge static and local events
  const localEvents = (() => {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  })();
  const allEvents = [...eventsData, ...localEvents];

  const filteredEvents = selectedDomain === 'All'
    ? allEvents
    : allEvents.filter(event => event.domain === selectedDomain);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Calendar className="text-primary" /> Upcoming Events
        </h1>
        <select
          className="form-select border border-primary rounded-lg px-4 py-2 bg-card text-primary"
          value={selectedDomain}
          onChange={e => setSelectedDomain(e.target.value)}
        >
          {domains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="card bg-card border border-border shadow-md p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {event.type === 'Workshop' && <BookOpen className="text-accent" size={20} />}
                {event.type === 'Expert Talk' && <Mic className="text-primary" size={20} />}
                {event.type === 'Seminar' && <Users className="text-success" size={20} />}
                <span className="font-semibold text-lg text-text-primary">{event.title}</span>
              </div>
              <p className="text-sm text-text-secondary mb-2">{event.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-text-muted mb-2">
                <span className="bg-primary/10 px-2 py-1 rounded">{event.domain}</span>
                <span className="bg-accent/10 px-2 py-1 rounded">{event.type}</span>
                <span className="bg-success/10 px-2 py-1 rounded">{event.date}</span>
              </div>
              <p className="text-sm text-text-secondary">Speaker: <span className="font-medium text-primary">{event.speaker}</span></p>
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center text-text-muted py-12">
            No events found for this domain.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEvents;
