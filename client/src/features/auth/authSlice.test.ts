import { buildAuthReducerState, setCredentials } from './authSlice';
import authReducer from './authSlice';

describe('test keywordSlice', () => {
  const initialAuthState = buildAuthReducerState();
  it('setCredentials', () => {
    const userInfo = {
      id: '1',
      username: 'test',
      email: 'test@gmail.com',
      accessToken: 'abcdef',
    };
    expect(
      authReducer(undefined, setCredentials({ data: { ...userInfo } }))
    ).toEqual({
      ...initialAuthState,
      data: userInfo,
      token: 'abcdef',
    });
  });
});
