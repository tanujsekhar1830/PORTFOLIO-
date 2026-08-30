import React, { createContext, useContext } from 'react';
import defaultPhoto from '../assets/images/tanuj_profile_exact_1788089149242.jpg';

interface ProfilePhotoContextType {
  photoUrl: string;
}

const ProfilePhotoContext = createContext<ProfilePhotoContextType>({
  photoUrl: defaultPhoto,
});

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProfilePhotoContext.Provider value={{ photoUrl: defaultPhoto }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => useContext(ProfilePhotoContext);

