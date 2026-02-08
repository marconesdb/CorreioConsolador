// UserProfile.tsx

import React from 'react';
import { User } from '../types';
import { ShareIcon } from './Icons';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="pt-24 flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-1">{user.displayName}</h1>
      <p className="text-gray-500 text-sm mb-2">@{user.username}</p>
      <p className="text-gray-700 max-w-md text-center mb-4">{user.bio}</p>
      
      <div className="flex space-x-2 mb-8 text-sm font-semibold text-gray-900">
        <span>{user.followers} followers</span>
        <span>·</span>
        <span>{user.following} following</span>
      </div>

      <div className="flex space-x-2 mb-12">
        <button className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-3xl font-semibold">Share</button>
        <button className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-3xl font-semibold">Edit Profile</button>
      </div>

      <div className="flex space-x-8 mb-6 border-b-2 border-transparent w-full justify-center">
        <button className="pb-2 border-b-2 border-black font-semibold">Created</button>
        <button className="pb-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900">Saved</button>
      </div>

      <div className="w-full max-w-[1800px] px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 opacity-50">
        {/* Placeholder Mock Content for Profile */}
        {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-gray-200 rounded-xl h-64 w-full animate-pulse"></div>
        ))}
      </div>
      <div className="py-10 text-gray-500">No pins created yet.</div>
    </div>
  );
};

export default UserProfile;