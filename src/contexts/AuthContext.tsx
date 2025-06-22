// src/contexts/AuthContext.tsx

import { auth } from "../firebase";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

// Define User type
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    currency: string;
    language: string;
    persona: 'solo' | 'group' | 'business' | 'eco' | 'budget';
  };
}

// Define Context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to convert Firebase user to our User type
  const formatUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    name: firebaseUser.displayName ?? "",
    email: firebaseUser.email ?? "",
    avatar: firebaseUser.photoURL ?? "",
    preferences: {
      currency: "USD",
      language: "en",
      persona: "solo",
    },
  });

  // Login
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Register
  const register = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(formatUser(firebaseUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
