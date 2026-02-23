'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { authClient } from '@/lib/authClient';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await authClient.getCurrentUser();
      setUser(currentUser);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const signup = useCallback(
    async (email: string, password: string, name?: string) => {
      try {
        setLoading(true);
        const result = await authClient.signup(email, password, name);
        if (result.error) {
          setError(result.error);
          return { success: false, error: result.error };
        }
        setError(null);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Sign up failed';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        const result = await authClient.login(email, password);
        if (result.error) {
          setError(result.error);
          return { success: false, error: result.error };
        }
        setUser(result.user);
        setError(null);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authClient.logout();
      setUser(null);
      setError(null);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePassword = useCallback(
    async (newPassword: string) => {
      try {
        setLoading(true);
        const result = await authClient.updatePassword(newPassword);
        if (result.error) {
          setError(result.error);
          return { success: false, error: result.error };
        }
        setError(null);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Update failed';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetPassword = useCallback(
    async (email: string) => {
      try {
        setLoading(true);
        const result = await authClient.resetPassword(email);
        if (result.error) {
          setError(result.error);
          return { success: false, error: result.error };
        }
        setError(null);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Reset failed';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const isAuthenticated = !!user;

  const getUserProfile = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        const profile = await authClient.getUserProfile(userId);
        setError(null);
        return { profile, success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get profile';
        setError(message);
        return { profile: null, success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateProfile = useCallback(
    async (updates: Record<string, any>) => {
      try {
        setLoading(true);
        const result = await authClient.updateProfile(updates);
        if (result.error) {
          setError(result.error);
          return { success: false, error: result.error };
        }
        setError(null);
        return { success: true, profile: result.profile };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update profile';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signup,
    login,
    logout,
    updatePassword,
    resetPassword,
    getUserProfile,
    updateProfile,
    loadUser,
  };
}
