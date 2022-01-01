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
import { useNavigate } from 'react-router-dom';
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

  const fetchDbUser = (email) => {
    setIsLoading(true);
    const url = `https://hero-rider-im-rudra.herokuapp.com/getUser`;
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

  useEffect(() => {
    if (!userData.email) return;
    fetchDbUser(userData.email);
  }, [userData.email]);

  console.log(dbUserData);

  const addUserToDb = (userInfo) => {
    const formDoc = new FormData();
    for (const property in userInfo) {
      formDoc.append(property, userInfo[property]);
    }
    const { email } = userInfo;
    const url = 'https://hero-rider-im-rudra.herokuapp.com/addUser';
    fetch(url, {
      method: 'POST',
      body: formDoc
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          fetchDbUser(email);
        }
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
        if (user.email) navigate('/dashboard');
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
