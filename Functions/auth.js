import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          localStorage.setItem('userData', JSON.stringify(user));
        } else {
          setUser(null);
          localStorage.removeItem('userData');
          router.push('/login');
        }
      });

      return () => unsubscribe();
   
  }, [router]);

  return user;
};