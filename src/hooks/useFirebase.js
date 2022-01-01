/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import initAuth from '../firebase/firebase.init';

initAuth();

const useFirebase = () => {
  const [userData, setUserData] = useState({});
  const [dbUserData, setDbUserData] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dbUserLoading, setDbUserLoading] = useState(true);
  const auth = getAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const signupPrevLocation = location?.state?.from || '/';
  const loginPrevLocation = location?.state?.from || '/dashboard';

  console.log('authdata', userData);
  console.log('dbuserdata', dbUserData);

  const fetchDbUser = (email) => {
    setIsLoading(true);
    const url = `http://localhost:5000/getUser`;
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then((res) => res.json())
      .then((data) => setDbUserData(data))
      .catch((err) => console.log(err.message))
      .finally(() => {
        setDbUserLoading(false);
        setIsLoading(false);
      });
  };

  const addUserToDb = (userInfo) => {
    const formDoc = new FormData();
    for (const property in userInfo) {
      formDoc.append(property, userInfo[property]);
    }
    const { email } = userInfo;
    const url = 'http://localhost:5000/addUser';
    fetch(url, {
      method: 'POST',
      body: formDoc
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          fetchDbUser(email);
        }
        console.log(data);
      })
      .catch((err) => console.log(err.message));
  };

  const passwordSignup = (userInfo) => {
    setError('');
    setIsLoading(true);
    if (!userInfo.email || !userInfo.password) {
      setError('Please give your Email & password');
      return;
    }
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(({ user }) => {
        setUserData(user);
        if (user.email) addUserToDb(userInfo);
        setError('');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const passwordLogin = (email, password) => {
    setError('');
    setIsLoading(true);
    if (!email || !password) {
      setError('Please give your Email & password');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUserData(user);
        setError('');
        if (user.email) navigate(loginPrevLocation);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        setDbUserData({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserData(user);
        fetchDbUser(user.email);
        setIsLoading(false);
        console.log(dbUserData);
      } else {
        setUserData({});
        setIsLoading(false);
      }
      setIsLoading(false);
    });
  }, []);

  return {
    userData,
    error,
    isLoading,
    dbUserData,
    dbUserLoading,
    addUserToDb,
    fetchDbUser,
    passwordSignup,
    passwordLogin,
    logout
  };
};

export default useFirebase;
