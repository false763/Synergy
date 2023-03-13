import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from './firebase';

const GetUserRoles = () => {
  const { user } = auth();

  useEffect(() => {
    if (user) {
      firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          console.log(idTokenResult.claims);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return null;
}

export default GetUserRoles;
