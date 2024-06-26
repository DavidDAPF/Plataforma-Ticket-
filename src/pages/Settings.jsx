import React from 'react';
import ManageLocations from '../components/settings/ManageLocations.jsx';
import ManageUserAccounts from '../components/settings/ManageUserAccounts.jsx';
import ManageLogo from '../components/settings/ManageLogo.jsx';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Configuraciones</h1>
        <ManageLogo />
        <ManageLocations />
        <ManageUserAccounts />
      </div>
    </div>
  );
};

export default Settings;
