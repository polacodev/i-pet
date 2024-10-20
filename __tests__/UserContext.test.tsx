import '@testing-library/react-native/extend-expect';
import { render, waitFor } from '@testing-library/react-native';

import { PetText } from '@/components/PetText';
import { PetView } from '@/components/PetView';
import { UserContextProvider, useUser } from '@/components/context/UserContext';
import { supabase } from '@/lib/supabase';

jest.mock('@react-native-async-storage/async-storage', () => ({
  AsyncStorage: jest.fn(),
}));

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

const mockUser = { id: 'user-123', email: 'test@example.com' };
const mockSession = { user: mockUser, access_token: 'fake-token' };

const TestComponent = () => {
  const { user, session } = useUser();

  return (
    <PetView>
      <PetText testID="user">{user?.email ?? 'No user'}</PetText>
      <PetText testID="session">{session ? 'Session exists' : 'No session'}</PetText>
    </PetView>
  );
};

describe('Context', () => {
  test('UserContextProvider should set the session correctly', async () => {
    // Mock getSession to return a session
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
    });

    // Mock onAuthStateChange to simulate the auth state change event
    (supabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
      callback('SIGNED_IN', mockSession);
      return { data: { subscription: { unsubscribe: jest.fn() } } };
    });
    const { getByTestId } = render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>,
    );

    await waitFor(() => {
      const userText = getByTestId('user');
      const sessionText = getByTestId('session');
      expect(userText.props.children).toBe('test@example.com');
      expect(sessionText.props.children).toBe('Session exists');
    });
  });

  test('UserContextProvider should not set the session correctly', async () => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
    });

    (supabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
      callback('SIGNED_IN', null);
      return { data: { subscription: { unsubscribe: jest.fn() } } };
    });
    const { getByTestId } = render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>,
    );

    await waitFor(() => {
      const userText = getByTestId('user');
      const sessionText = getByTestId('session');
      expect(userText.props.children).toBe('No user');
      expect(sessionText.props.children).toBe('No session');
    });
  });
});
