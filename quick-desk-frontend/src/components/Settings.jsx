// components/settings.jsx
'use client';
import React, { useState } from 'react';

// FIX: Component re-styled for dark theme and functionality corrected.
const SettingsPage = ({ userRole = 'admin', onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [security, setSecurity] = useState({ password: '', twoFA: false });
  const [notifications, setNotifications] = useState({ ticket: true, chat: false });
  // FIX: Added state to make Agent Settings inputs functional.
  const [agent, setAgent] = useState({ agentId: '', skills: '' });

  const tabs = ['profile', 'security', 'notifications'];
  // FIX: Logic now correctly uses the userRole prop.
  if (userRole !== 'End User') tabs.push('agent');
  if (userRole === 'Admin') tabs.push('admin');

  const tabNames = {
    profile: 'Profile', security: 'Security', notifications: 'Notifications',
    agent: 'Agent', admin: 'Admin'
  };
  
  // FIX: Helper functions re-styled to match the application's dark theme.
  const renderInput = (label, value, onChange, type = 'text', placeholder = '') => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );

  const renderSwitch = (label, value, toggle) => (
    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg mb-4">
      <span className="text-gray-300">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={value} onChange={toggle} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
      </label>
    </div>
  );
  
  const renderButton = (text) => (
      <button className="mt-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          {text}
      </button>
  );

  return (
    <main className="flex-1 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Application Settings</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabs */}
        <div className="flex flex-col gap-2 md:w-1/4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 rounded-lg text-left font-medium transition-colors w-full ${
                activeTab === tab ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tabNames[tab]}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="md:w-3/4 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
          {activeTab === 'profile' && (
            <><h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              {renderInput('Name', profile.name, (e) => setProfile({ ...profile, name: e.target.value }))}
              {renderInput('Email', profile.email, (e) => setProfile({ ...profile, email: e.target.value }), 'email')}
              {renderInput('Phone', profile.phone, (e) => setProfile({ ...profile, phone: e.target.value }), 'tel')}
              {renderButton("Save Profile")}
            </>
          )}

          {activeTab === 'security' && (
            <><h2 className="text-xl font-semibold mb-4">Security</h2>
              {renderInput('New Password', security.password, (e) => setSecurity({ ...security, password: e.target.value }), 'password')}
              {renderSwitch('Enable Two-Factor Authentication (2FA)', security.twoFA, () => setSecurity({ ...security, twoFA: !security.twoFA }))}
              {renderButton("Update Security")}
            </>
          )}

          {activeTab === 'notifications' && (
            <><h2 className="text-xl font-semibold mb-4">Notifications</h2>
              {renderSwitch('Ticket Alerts', notifications.ticket, () => setNotifications({ ...notifications, ticket: !notifications.ticket }))}
              {renderSwitch('Chat Alerts', notifications.chat, () => setNotifications({ ...notifications, chat: !notifications.chat }))}
              {renderButton("Save Notifications")}
            </>
          )}
          
          {activeTab === 'agent' && (
            <><h2 className="text-xl font-semibold mb-4">Agent Settings</h2>
              {/* FIX: Inputs now correctly bind to the agent state */}
              {renderInput('Agent ID', agent.agentId, (e) => setAgent({ ...agent, agentId: e.target.value }))}
              {renderInput('Skills', agent.skills, (e) => setAgent({ ...agent, skills: e.target.value }))}
              {renderButton("Save Agent Settings")}
            </>
          )}

          {activeTab === 'admin' && (
            <><h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
              <div className="space-y-3">
                <button className="w-full bg-gray-700 px-4 py-3 rounded-lg text-left hover:bg-gray-600">Manage Users</button>
                <button className="w-full bg-gray-700 px-4 py-3 rounded-lg text-left hover:bg-gray-600">System Settings</button>
                <button className="w-full bg-gray-700 px-4 py-3 rounded-lg text-left hover:bg-gray-600">Reports & Analytics</button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;