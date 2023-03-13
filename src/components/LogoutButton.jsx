import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Button from '@material-ui/core/Button';
// import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [user, setUser] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('userRoles');
    //   navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user && (
        <Button variant="text" style={{color: 'white'}} onClick={handleLogout}>
        Logout
      </Button>
      
      )}
    </>
  );
}

export default LogoutButton;
