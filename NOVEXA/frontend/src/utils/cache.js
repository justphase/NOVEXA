// Cache management utilities for NOVEXA

export const clearUserCache = () => {
  try {
    localStorage.removeItem('novexa_user');
    console.log('User cache cleared successfully');
    return true;
  } catch (error) {
    console.error('Failed to clear user cache:', error);
    return false;
  }
};

export const getUserFromCache = () => {
  try {
    const stored = localStorage.getItem('novexa_user');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to get user from cache:', error);
    return null;
  }
};

export const setUserInCache = (userId, userName) => {
  try {
    localStorage.setItem('novexa_user', JSON.stringify({
      id: userId,
      name: userName
    }));
    return true;
  } catch (error) {
    console.error('Failed to set user in cache:', error);
    return false;
  }
};

export const clearAllCache = () => {
  try {
    localStorage.clear();
    console.log('All cache cleared successfully');
    return true;
  } catch (error) {
    console.error('Failed to clear all cache:', error);
    return false;
  }
};
