// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="w-64 bg-blue-600 text-white">
      <header className="p-4 text-2xl font-bold">CRM</header>
      <nav className="p-4 mt-10">
        <ul>
          <li className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faAddressBook} className="mr-2" />
            <Link to="/home" className="text-white font-bold hover:text-gray-300">
              Contact Details
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            <Link to="/" className="text-white font-bold hover:text-gray-300">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
