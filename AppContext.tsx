
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppItem, AboutData, StoreSettings } from '../types';
import { APP_DATA, INITIAL_ABOUT_DATA, INITIAL_STORE_SETTINGS, DATA_VERSION } from '../constants';

interface AppContextType {
  apps: AppItem[];
  aboutData: AboutData;
  storeSettings: StoreSettings;
  theme: 'light' | 'dark';
  userRatings: Record<string, number>;
  toggleTheme: () => void;
  addApp: (app: AppItem) => void;
  updateApp: (app: AppItem) => void;
  deleteApp: (id: string) => void;
  updateAbout: (data: AboutData) => void;
  updateStoreSettings: (data: StoreSettings) => void;
  rateApp: (appId: string, rating: number) => void;
  isInstallable: boolean;
  installApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // Helper to determine if we should use Local Storage
  const shouldLoadFromStorage = () => {
    if (typeof window === 'undefined') return false;
    const storedVersion = localStorage.getItem('as_universe_version');
    // ONLY load from storage if the stored version matches the current code version.
    // This ensures that when deployment updates DATA_VERSION, we force a refresh.
    return storedVersion === DATA_VERSION;
  };

  // Sync version on mount
  useEffect(() => {
    localStorage.setItem('as_universe_version', DATA_VERSION);
  }, []);

  const [apps, setApps] = useState<AppItem[]>(() => {
    if (shouldLoadFromStorage()) {
      const saved = localStorage.getItem('as_universe_apps');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return APP_DATA;
  });

  const [aboutData, setAboutData] = useState<AboutData>(() => {
    if (shouldLoadFromStorage()) {
      const saved = localStorage.getItem('as_universe_about');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_ABOUT_DATA;
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    if (shouldLoadFromStorage()) {
      const saved = localStorage.getItem('as_universe_settings');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_STORE_SETTINGS;
  });

  // User Ratings State
  const [userRatings, setUserRatings] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('as_universe_user_ratings');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return {};
  });

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('as_universe_theme');
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    }
    return 'dark';
  });

  // PWA Install Logic
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  // Apply Theme to Document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('as_universe_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Persist to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('as_universe_apps', JSON.stringify(apps));
    } catch (error) {
      console.error("LocalStorage Save Error:", error);
    }
  }, [apps]);

  useEffect(() => {
    try {
      localStorage.setItem('as_universe_about', JSON.stringify(aboutData));
    } catch (error) {
      console.error("LocalStorage Save Error:", error);
    }
  }, [aboutData]);

  useEffect(() => {
    try {
      localStorage.setItem('as_universe_settings', JSON.stringify(storeSettings));
    } catch (error) {
      console.error("LocalStorage Save Error:", error);
    }
  }, [storeSettings]);

  // Persist ratings
  useEffect(() => {
    try {
      localStorage.setItem('as_universe_user_ratings', JSON.stringify(userRatings));
    } catch (error) {
      console.error("LocalStorage Save Error:", error);
    }
  }, [userRatings]);

  const addApp = (app: AppItem) => setApps(prev => [...prev, app]);
  
  const updateApp = (updatedApp: AppItem) => {
    setApps(prevApps => prevApps.map(app => app.id === updatedApp.id ? updatedApp : app));
  };

  const deleteApp = (id: string) => setApps(prev => prev.filter(a => a.id !== id));
  const updateAbout = (data: AboutData) => setAboutData(data);
  const updateStoreSettings = (data: StoreSettings) => setStoreSettings(data);

  const rateApp = (appId: string, rating: number) => {
    setUserRatings(prev => ({ ...prev, [appId]: rating }));
  };

  return (
    <AppContext.Provider value={{ apps, aboutData, storeSettings, theme, userRatings, isInstallable, toggleTheme, addApp, updateApp, deleteApp, updateAbout, updateStoreSettings, rateApp, installApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApps = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApps must be used within AppContextProvider');
  return context;
};
