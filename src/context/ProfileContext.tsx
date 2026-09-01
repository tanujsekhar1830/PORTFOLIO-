import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfilePhotoContextType {
  photoUrl: string | null;
  setCustomPhoto: (fileOrUrl: File | string) => void;
  removePhoto: () => void;
  isUploaded: boolean;
}

const STORAGE_KEY = 'tanuj_custom_profile_photo';

const ProfilePhotoContext = createContext<ProfilePhotoContextType>({
  photoUrl: null,
  setCustomPhoto: () => {},
  removePhoto: () => {},
  isUploaded: false,
});

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim() !== '') {
        setPhotoUrl(saved);
      }
    } catch {
      // localStorage may fail in restricted iframes
    }
  }, []);

  const setCustomPhoto = (fileOrUrl: File | string) => {
    if (typeof fileOrUrl === 'string') {
      setPhotoUrl(fileOrUrl);
      try {
        localStorage.setItem(STORAGE_KEY, fileOrUrl);
      } catch (err) {
        console.warn('Storage limit reached, keeping in session memory', err);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setPhotoUrl(result);
          try {
            localStorage.setItem(STORAGE_KEY, result);
          } catch (err) {
            console.warn('Storage limit reached, keeping in session memory', err);
          }
        }
      };
      reader.readAsDataURL(fileOrUrl);
    }
  };

  const removePhoto = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setPhotoUrl(null);
  };

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl,
        setCustomPhoto,
        removePhoto,
        isUploaded: Boolean(photoUrl),
      }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => useContext(ProfilePhotoContext);
