import { useEffect, useState } from 'react';

const useData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const url = 'https://hero-rider-im-rudra.herokuapp.com/users';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('useData', data);
        setUsers(data);
      });
  }, []);
  return { users, setUsers };
};

export default useData;
