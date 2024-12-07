import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { clearAuthenticated, setAuthenticated } from '../slices/authSlice';

function useAuthValidation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validateAuth = async () => {
      api.get('/auth/protected/')
        .then(() => {
          dispatch(setAuthenticated());
        })
        .catch(() => {
          dispatch(clearAuthenticated());
          navigate('/login');
        });
    };

    validateAuth();
  }, [dispatch, navigate]);
}

export { useAuthValidation };