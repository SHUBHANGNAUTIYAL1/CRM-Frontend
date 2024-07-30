import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Components/Dashboard';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://crm-backend-if6g.onrender.com/api/contact/');
        const sortedContacts = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA; // Descending order
        });
        setContacts(sortedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Determine the current contacts to be displayed
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  return (
    <div className="flex h-screen">
      <Dashboard />
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact Number</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Occupation</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Referral Source</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-100">
                  <td className="py-3 px-6 border-b border-gray-200">{contact.name}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{contact.email}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{contact.contactNumber}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{contact.occupation}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{contact.referralSource}</td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center text-gray-700">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
