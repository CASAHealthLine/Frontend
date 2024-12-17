import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { clearUser, setUser } from '../slices/userSlice';

function useAuthValidation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validateAuth = async () => {
      api.get('/auth/account/')
        .then(({ data }) => {
          dispatch(setUser(data));
        })
        .catch(() => {
          dispatch(clearUser());
          navigate('/login');
        });
    };

    validateAuth();
  }, [dispatch, navigate]);
}

export { useAuthValidation };