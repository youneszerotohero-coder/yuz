'use client';

import React, { createContext, useContext, useState } from 'react';

interface LoaderContextType {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  hasIntroPlayed: boolean;
  setHasIntroPlayed: (played: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
  hasIntroPlayed: false,
  setHasIntroPlayed: () => {},
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoaded, setIsLoaded, hasIntroPlayed, setHasIntroPlayed }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
