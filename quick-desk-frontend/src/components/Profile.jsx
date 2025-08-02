// components/Profile.js
'use client';
import React, { useState, useRef } from 'react';
import { User, Upload, ChevronDown } from 'lucide-react';

const Profile = ({ user, userRole, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: user || '',
    role: userRole || 'End User',
    category: '',
    language: 'English'
  });
  
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const roles = ['End User', 'Support Agent', 'Admin'];
  const categories = ['Technical', 'AI', 'Development', 'Business', 'General'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpgradeRequest = () => {
    setShowUpgrade(true);
    // Simulate upgrade request
    setTimeout(() => {
      setShowUpgrade(false);
      alert('Upgrade request sent to admin for approval');
    }, 1500);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Create a URL for the selected file to preview it
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleImageUploadClick = () => {
    // This function is called when the button is clicked.
    // It programmatically clicks the hidden file input.
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex justify-center items-center">
      <div className="max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            User should able to see & change the profile details.
          </h1>
          <button
            onClick={() => onNavigate('landing')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Home
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Profile Form */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Profile</h2>
              <div className="flex gap-2">
                <button onClick={() => onNavigate('dashboard')} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Dashboard
                </button>
                {/* Admin button is now conditional */}
                {userRole === 'Admin' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Admin
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={32} className="text-white" />
                  )}
                </div>
                {/* This input is hidden but is essential for the feature to work */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/png, image/jpeg"
                />
                {/* The onClick handler is now correctly attached to this button */}
                <button onClick={handleImageUploadClick} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <Upload size={16} />
                  Change Image
                </button>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                />
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Role:
                </label>
                <div className="flex gap-2">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={userRole !== 'Admin'} // Non-admins can't change their role directly
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {formData.role === 'End User' && (
                    <button
                      onClick={handleUpgradeRequest}
                      disabled={showUpgrade}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white rounded-lg transition-colors"
                    >
                      {showUpgrade ? 'Requesting...' : 'Upgrade'}
                    </button>
                  )}
                </div>
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Category In Interest:
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Language Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Change Language:
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
