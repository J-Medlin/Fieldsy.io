import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { format, addDays } from 'date-fns';
import WorkshopForm from './WorkshopForm';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  daylight?: {
    sunrise: string;
    sunset: string;
    daylightHours: number;
  };
  plantingInfo?: {
    crops: string[];
    moonPhase: string;
    bestTasks: string[];
  };
}

const demoWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'Urban Gardening',
    description: 'Learn how to maximize small spaces for gardening.',
    date: '2025-03-15',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
    daylight: {
      sunrise: '06:45',
      sunset: '19:15',
      daylightHours: 12.5
    },
    plantingInfo: {
      crops: ['Tomatoes', 'Herbs', 'Lettuce'],
      moonPhase: 'Waxing Crescent',
      bestTasks: ['Seed Starting', 'Transplanting']
    }
  },
  {
    id: '2',
    title: 'Sustainable Farming',
    description: 'Introduction to sustainable farming practices.',
    date: '2025-03-20',
    image: 'https://images.unsplash.com/photo-1592991538534-00972b6f59ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
    daylight: {
      sunrise: '06:30',
      sunset: '19:30',
      daylightHours: 13
    },
    plantingInfo: {
      crops: ['Peas', 'Carrots', 'Radishes'],
      moonPhase: 'First Quarter',
      bestTasks: ['Direct Sowing', 'Soil Preparation']
    }
  },
  {
    id: '3',
    title: 'Beekeeping Basics',
    description: 'Learn the fundamentals of beekeeping.',
    date: '2025-03-25',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
    daylight: {
      sunrise: '06:15',
      sunset: '19:45',
      daylightHours: 13.5
    },
    plantingInfo: {
      crops: ['Wildflowers', 'Clover', 'Lavender'],
      moonPhase: 'Waxing Gibbous',
      bestTasks: ['Hive Maintenance', 'Honey Collection']
    }
  }
];

export default function Workshops() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarEvents = demoWorkshops.map(workshop => ({
    title: workshop.title,
    date: workshop.date,
    id: workshop.id,
    extendedProps: {
      daylight: workshop.daylight,
      plantingInfo: workshop.plantingInfo
    }
  }));

  // Generate next 30 days of daylight data
  const daylightEvents = Array.from({ length: 30 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      title: 'Daylight Hours',
      start: format(date, 'yyyy-MM-dd'),
      display: 'background',
      color: '#f3f4f6'
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Workshops & Classes</h2>
          <p className="text-lg mb-6">Discover upcoming events, learn new skills, and connect with local experts.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-green-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Host Workshop
          </button>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 shadow-md rounded-lg overflow-hidden bg-white p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={[...calendarEvents, ...daylightEvents]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek'
              }}
              height="auto"
              eventClick={(info) => {
                const workshop = demoWorkshops.find(w => w.id === info.event.id);
                if (workshop) {
                  setSelectedDate(new Date(workshop.date));
                }
              }}
              dateClick={(info) => {
                setSelectedDate(info.date);
              }}
            />
          </div>

          {/* Daylight & Planting Info */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Daily Insights</h3>
            {selectedDate ? (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900">Daylight Hours</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600">Sunrise: 06:30 AM</p>
                    <p className="text-sm text-gray-600">Sunset: 19:45 PM</p>
                    <p className="text-sm text-gray-600">Total: 13.25 hours</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Moon Phase</h4>
                  <p className="mt-2 text-sm text-gray-600">Waxing Crescent - Good for planting above-ground crops</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Recommended Tasks</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-600">• Start seedlings indoors</li>
                    <li className="text-sm text-gray-600">• Prepare garden beds</li>
                    <li className="text-sm text-gray-600">• Prune fruit trees</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Weather Forecast</h4>
                  <p className="mt-2 text-sm text-gray-600">Partly cloudy, High: 75°F, Low: 55°F</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Select a date to view detailed information</p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-2xl font-semibold text-center mb-6">Featured Workshops</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoWorkshops.map((workshop) => (
            <div key={workshop.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="font-semibold text-xl mb-2">{workshop.title}</h4>
                <p className="text-gray-600 mb-4">{workshop.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Daylight:</span> {workshop.daylight?.daylightHours} hours
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Moon Phase:</span> {workshop.plantingInfo?.moonPhase}
                  </p>
                </div>
                <button className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Host a New Workshop</h2>
            <WorkshopForm onSuccess={() => setShowForm(false)} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}