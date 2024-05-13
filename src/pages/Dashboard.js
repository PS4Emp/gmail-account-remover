// client/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('/api/services')
      .then(response => {
        setServices(response.data.connections);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const handleRevoke = (serviceId) => {
    axios.post('/api/revoke', { serviceId })
      .then(response => {
        setServices(services.filter(service => service.resourceName !== serviceId));
      })
      .catch(error => {
        console.error('Error revoking access:', error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <a href="/logout">Logout</a>
      <ul>
        {services.map(service => (
          <li key={service.resourceName}>
            {service.names[0].displayName}
            <button onClick={() => handleRevoke(service.resourceName)}>Revoke</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
