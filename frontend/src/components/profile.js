import React, { useState, useEffect } from 'react';
import axios from './axiosSetup';
import { fetchProfile} from '../redux/profileSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProfileUpdate = ({ csrfToken, pk }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    bio: '',
    profile_image: null,
    date_of_birth: '',
    location: '',
    website: '',
    social_media_linkedin: '',
    social_media_twitter: '',
    interests: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
      dispatch(fetchProfile({ pk, csrfToken }));
  }, [dispatch, pk, csrfToken]);

  const handleChange = (e) => {
  
    const { name, value, files } = e.target;
  
    if (name === 'profile_image' && files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      for (const key in profileData) {
        if (key === 'profile_image' && profileData[key] instanceof File) {
          formData.append(key, profileData[key]);
        } else {
          formData.append(key, profileData[key]);
        }
      }
  
      formData.append('user.first_name', profileData.first_name);
      formData.append('user.last_name', profileData.last_name);
  
      await axios.patch(`profile/${pk}/`, formData, {
        headers: { 
          'X-CSRFToken': csrfToken,
          'Content-Type': 'multipart/form-data'
        },
      });
  
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  

  return (
<form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 p-4 border rounded-lg shadow-lg">
  <h2 className="text-2xl mb-4">Update Profile</h2>
  <div className="mb-4 mx-4 flex justify-center">
    <div className="w-20 h-20 overflow-hidden rounded-full relative">
      <img
        src={previewImage || profile?.profile_image || '../images/default.jpg'}
        alt="Profile"
        className="object-cover w-full h-full"
      />
      </div>
      <div className="mb-4 mx-4 my-6">
      <label
        htmlFor="profile_image"
        className=" bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-600"
      >
        Change
      </label>
      <input
        type="file"
        id="profile_image"
        name="profile_image"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  </div>
  <div className="grid grid-cols-2 gap-4">
    <div className="mb-4">
      <label htmlFor="username" className="block mb-1">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={profile?.user.username || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        readOnly
      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block mb-1">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={profile?.user.email || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        readOnly
      />
    </div>
    <div className="mb-4">
        <label htmlFor="first_name" className="block mb-1">First Name:</label>
        <input
        type="text"
        id="first_name"
        name="first_name"
        value={profile?.user.first_name || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="last_name" className="block mb-1">Last Name:</label>
        <input
        type="text"
        id="last_name"
        name="last_name"
        value={profile?.user.last_name || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="role" className="block mb-1">Role:</label>
        <input
        type="text"
        id="role"
        name="role"
        value={profile?.role || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>

    <div className="mb-4">
        <label htmlFor="date_of_birth" className="block mb-1">Date of Birth:</label>
        <input
        type="date"
        id="date_of_birth"
        name="date_of_birth"
        value={profile?.date_of_birth || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="location" className="block mb-1">Location:</label>
        <input
        type="text"
        id="location"
        name="location"
        value={profile?.location || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="website" className="block mb-1">Website:</label>
        <input
        type="url"
        id="website"
        name="website"
        value={profile?.website || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="social_media_linkedin" className="block mb-1">LinkedIn:</label>
        <input
        type="url"
        id="social_media_linkedin"
        name="social_media_linkedin"
        value={profile?.social_media_linkedin || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="social_media_twitter" className="block mb-1">Twitter:</label>
        <input
        type="url"
        id="social_media_twitter"
        name="social_media_twitter"
        value={profile?.social_media_twitter || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
        />
    </div>
    <div className="mb-4 col-span-2">
      <label htmlFor="bio" className="block mb-1">Bio:</label>
      <textarea
        id="bio"
        name="bio"
        value={profile?.bio || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
      />
    </div>
    <div className="mb-4 col-span-2">
      <label htmlFor="interests" className="block mb-1">Interests:</label>
      <textarea
        id="interests"
        name="interests"
        value={profile?.interests || ''}
        onChange={handleChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
      />
    </div>
    </div>
    <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Profile</button>
  </form>

  );
};

export default ProfileUpdate;
