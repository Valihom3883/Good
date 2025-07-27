import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const withAdmin = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        const decodedToken = jwt_decode(token);
        if (decodedToken.role !== 'admin') {
          router.push('/dashboard');
        } else {
          setVerified(true);
        }
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return Wrapper;
};

export default withAdmin;
