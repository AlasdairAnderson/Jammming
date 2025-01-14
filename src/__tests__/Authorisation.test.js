import { requestAuthentication, getAccessToken, getUser, generateRandomString } from "../components/Authorisation";
import '@testing-library/jest-dom';

describe('requestAuthentication', () => {
    it('should generate the correct Spotify authentication URL', () => {
        const clientId = 'test-client-id';
        const url = requestAuthentication(clientId);

        expect(url).toContain('https://accounts.spotify.com/authorize');
        expect(url).toContain('response_type=token');
        expect(url).toContain(`client_id=${encodeURIComponent(clientId)}`);
        expect(url).toContain('redirect_uri=' + encodeURIComponent('http://localhost:3000/'));
        expect(localStorage.getItem('spotify_auth_state')).not.toBeNull();
    });

    it('should store and user the correct state', () => {
        const clientId = 'test-client-id';
        const url = requestAuthentication(clientId);

        const storedState = localStorage.getItem('spotify_auth_state');
        const urlParams = new URLSearchParams(new URL(url).search);
        const state = urlParams.get('state');

        expect(storedState).toBe(state);
    });

    it('should return null for invalid URL formats', () => {
        const invalidURL = 'invalid-url';
        const result = getAccessToken(invalidURL);

        expect(result).toBeNull();
    })
});


describe('getAccessToken', () => {
    it('should parse access token form URL', () => {
        const url = 'http://localhost:3000/#access_token=test-token&token_type=Bearer&expires_in=36000&state=test-state';
        const tokenData = getAccessToken(url);

        expect(tokenData).toEqual({
            access_token: 'test-token',
            token_type: 'Bearer',
            expires_in: '36000',
            state: 'test-state'
        });
    });

    it('should return null if access token is not in URL', () => {
        const url = 'http://localhost:3000/#state=test-state';
        const tokenData = getAccessToken(url);

        expect(tokenData).toBeNull();
    })

    it('should parse and return token expiry time', () => {
        const url = 'http://localhost:3000/#access_token=test-token&token_type=Bearer&expires_in=3600';
        const tokenData = getAccessToken(url);
      
        expect(tokenData.expires_in).toBe('3600');
      });
});

describe('getUser', () => {
    global.fetch = jest.fn();

    it('should fetch and return uer data from Spotify API', async () => {
        const mockUserToken = { access_token: 'test-token'};
        const mockResponse = {
            country: 'UK',
            display_name: 'Jack Smith',
            email: 'jack.smith@test.com',
            href: 'https://api.spotify.com/v1/users/jacksmith',
            id: '01',
            product: 'premium',
            type: 'user',
            uri: 'spotify:user:jacksmith'
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async => mockResponse
        });

        const userData = await getUser(mockUserToken);
        expect(userData).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
        fetch.mockResolvedValueOnce({ok: false});

        const mockUserToken = {access_token: 'test-token'};
        const userData= await getUser(mockUserToken);

        expect(userData).toBeUndefined();
    })
});

describe('generateRandomString', () => {
    it('should generate a random string of specified length', () => {
        const randomString = generateRandomString(16);

        expect(randomString).toHaveLength(16);
        expect(/^[A-Za-z0-9]+$/.test(randomString)).toBe(true);
    });
});

