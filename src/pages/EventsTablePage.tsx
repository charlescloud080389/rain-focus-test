import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Event } from '../types/Event';
import { Column } from '../types/Table';

const API_URL = 'https://rf-json-server.herokuapp.com/events';

const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get<Event[]>(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching events:', err);
    throw err;
  }
};

const EventsTablePage: React.FC = () => {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        const sortedEvents = events.sort((a, b) => a.name.localeCompare(b.name));
        setData(sortedEvents);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleUpdate = (row: Event) => {
    navigate(`/update-event/${row.id}`, { state: { eventData: row } });
  };

  const handleDelete = async (row: Event) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the event: ${row.name}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${row.id}`);
      setData((prevData) => prevData.filter((event) => event.id !== row.id));
      alert(`Event "${row.name}" deleted successfully.`);
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete the event. Please try again later.');
    }
  };

  const columns: Column<Event>[] = [
    { key: 'name', label: 'Event Name' },
    { key: 'description', label: 'Description' },
    { key: 'company', label: 'Company' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Event) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={() => navigate('/new-event')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 self-end"
        >
          Create Event
        </button>
      </div>
      <div className="">
        {loading ? (
          <div className="bg-white shadow-md rounded-md p-4 text-center text-gray-500">Loading events...</div>
        ) : error ? (
          <div className="bg-white shadow-md rounded-md p-4 text-center text-red-500">{error}</div>
        ) : (
          <Table columns={columns} data={data} keyField="id" />
        )}
      </div>
    </div>
  );
};

export default EventsTablePage;