import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import { requestAuthentication } from '../components/Authorisation';
import Playlist from '../components/Playlist';

jest.mock('../components/Authorisation', () => ({
    requestAuthentication: jest.fn(() => 'mock-auth-url'),
    getAccessToken: jest.fn(() => 'mock-access-token'),
    getUser: jest.fn(() => Promise.resolve({ id: 'mock-user-id', display_name: 'Mock User' }))
}));

describe('App', () => {
    it('renders longin button and redirects to Spotify', () => {
        render(<App />);

        const loginButton = screen.getByRole('button', { name: /login to spotify/i});
        expect(loginButton).toBeInTheDocument();

        fireEvent.click(loginButton);
        expect(window.location.href).toBe('http://localhost/');
        expect(requestAuthentication).toHaveBeenCalledWith('558c266021d047679f2fa39b762bb7b4');
    });
});

