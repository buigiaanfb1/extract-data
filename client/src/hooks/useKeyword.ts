import { useGetAllKeywordsMutation } from 'app/services/keyword';
import { setKeywords, setLoading } from 'features/keyword/keywordSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

export const useKeywords = () => {
  const user = useSelector(selectCurrentUser);
  const [getAllKeywords, { isLoading }] = useGetAllKeywordsMutation();
  const dispatch = useDispatch();

  const getKeywords = async () => {
    if (user?.accessToken) {
      dispatch(setLoading());
      const response = await getAllKeywords().unwrap();
      if (response && response.data.length > 0) {
        dispatch(setKeywords({ data: response.data }));
      }
    }
  };

  return getKeywords;
};
