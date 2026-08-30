import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultPhoto from '../assets/images/tanuj_profile_exact_1788089149242.jpg';

interface ProfilePhotoContextType {
  photoUrl: string;
  setCustomPhoto: (fileOrUrl: File | string) => void;
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
    try {
      const saved = localStorage.getItem('tanuj_portfolio_profile_photo');
      if (saved) {
        setPhotoUrl(saved);
        setIsCustom(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setCustomPhoto = (fileOrUrl: File | string) => {
    if (typeof fileOrUrl === 'string') {
      setPhotoUrl(fileOrUrl);
      setIsCustom(true);
      try {
        localStorage.setItem('tanuj_portfolio_profile_photo', fileOrUrl);
      } catch (err) {
        console.warn('Storage limit reached, cached in memory', err);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setPhotoUrl(result);
          setIsCustom(true);
          try {
            localStorage.setItem('tanuj_portfolio_profile_photo', result);
          } catch (err) {
            console.warn('Storage limit reached, cached in memory', err);
          }
        }
      };
      reader.readAsDataURL(fileOrUrl);
    }
  };

  const resetPhoto = () => {
    try {
      localStorage.removeItem('tanuj_portfolio_profile_photo');
    } catch {
      // Ignore error
    }
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

