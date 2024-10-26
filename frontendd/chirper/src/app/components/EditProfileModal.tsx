'use client';

import { useState } from 'react';
import { userprops } from '@/types/props';

interface EditProfileModalProps {
  user: userprops;
  onClose: () => void;
  onSave: (updatedUser: userprops) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState(user.bio || '');
  const [link, setLink] = useState(user.link || '');
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Convert files to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (img: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleSave = async () => {
    const userId = user._id;

    // Create JSON object
    const updatedUser = {
      fullName,
      email,
      username,
      currentPassword,
      newPassword,
      bio,
      link,
      profileImg,
      coverImg,   
    };

    try {
      const response = await fetch(`http://localhost:5000/api/users/update/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser), 
      });

      const data = await response.json();

      if (response.ok) {
        onSave(data); 
        onClose(); 
      } else {
        setErrorMessage(data.error || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-full">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-blue-400">Full Name</label>
            <input
              type="text"
              value={fullName.toString()}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-blue-400">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-blue-400">Username</label>
            <input
              type="text"
              value={username.toString()}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-blue-400">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (optional)"
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-400">Email</label>
            <input
              type="email"
              value={email.toString()}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>

          {/* Bio */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-blue-400">Bio</label>
            <textarea
              value={bio.toString()}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 p-2 w-full border rounded bg-gray-600"
              rows={3}
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-blue-400">Link</label>
            <input
              type="text"
              value={link.toString()}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Website or social link"
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-blue-400">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProfileImg)}
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-blue-400">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setCoverImg)}
              className="mt-1 p-2 w-full border rounded bg-gray-600"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="py-2 px-4 bg-red-900 rounded text-white">Cancel</button>
          <button onClick={handleSave} className="py-2 px-4 bg-sky-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
