import { useAuthMutation } from 'app/services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'utils/getSetToken';
import { selectCurrentUser, setCredentials } from '../features/auth/authSlice';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = getToken();
  const [auth, { isLoading }] = useAuthMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAuth = async () => {
    if (token && !user?.accessToken) {
      console.log(!user?.accessToken);
      const response = await auth().unwrap();
      if (response && response.data.accessToken) {
        localStorage.setItem(
          'access_token',
          JSON.stringify(response.data.accessToken)
        );
        dispatch(setCredentials(response));
        navigate('/dashboard');
      }
    }
  };

  return getAuth;
};
