import {
  buildAuthReducerState,
  clearCredentials,
  setCredentials,
} from './authSlice';
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

  it('clearCredentials', () => {
    const userInfo = {
      id: '1',
      username: 'test',
      email: 'test@gmail.com',
      accessToken: 'abcdef',
    };
    expect(
      authReducer({ data: userInfo, token: 'abcdef' }, clearCredentials())
    ).toEqual({
      ...initialAuthState,
      data: {
        username: null,
        email: null,
        id: null,
        accessToken: null,
      },
      token: null,
    });
  });
});
