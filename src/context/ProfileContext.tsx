import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultPhoto from '../assets/images/tanuj_profile_official_1788076448498.jpg';

interface ProfilePhotoContextType {
  photoUrl: string;
  setCustomPhoto: (file: File | string) => void;
  resetPhoto: () => void;
  isCustom: boolean;
}

const ProfilePhotoContext = createContext<ProfilePhotoContextType>({
  photoUrl: defaultPhoto,
  setCustomPhoto: () => {},
  resetPhoto: () => {},
  isCustom: false,
});

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(defaultPhoto);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has saved a custom original image in localStorage
    const saved = localStorage.getItem('tanuj_portfolio_custom_photo');
    if (saved) {
      setPhotoUrl(saved);
      setIsCustom(true);
    }
  }, []);

  const setCustomPhoto = (fileOrUrl: File | string) => {
    if (typeof fileOrUrl === 'string') {
      setPhotoUrl(fileOrUrl);
      setIsCustom(true);
      try {
        localStorage.setItem('tanuj_portfolio_custom_photo', fileOrUrl);
      } catch (e) {
        console.warn('Storage full, keeping in memory', e);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setPhotoUrl(result);
          setIsCustom(true);
          try {
            localStorage.setItem('tanuj_portfolio_custom_photo', result);
          } catch (err) {
            console.warn('Storage limit reached, photo active in memory session', err);
          }
        }
      };
      reader.readAsDataURL(fileOrUrl);
    }
  };

  const resetPhoto = () => {
    localStorage.removeItem('tanuj_portfolio_custom_photo');
    setPhotoUrl(defaultPhoto);
    setIsCustom(false);
  };

  return (
    <ProfilePhotoContext.Provider value={{ photoUrl, setCustomPhoto, resetPhoto, isCustom }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => useContext(ProfilePhotoContext);
