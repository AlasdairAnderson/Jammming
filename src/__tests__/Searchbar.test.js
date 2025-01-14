import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Searchbar from '../components/Searchbar';

global.fetch = jest.fn();

describe('Searchbar', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders input and button elements', () => {
        render(<Searchbar token={{ access_token: 'test-token' }} searchResponse={jest.fn()} />);
        const input = screen.getByRole('textbox', { id: /searchTrack/i });
        const button = screen.getByRole('button', { id: /search/i });
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('updates input field value when user types', () => {
        render(<Searchbar token={{ access_token: 'test-token' }} searchResponse={jest.fn()} />);
        const input = screen.getByRole('textbox', { id: /searchTrack/i });
        fireEvent.change(input, { target: { value: 'Test Track' } });
        expect(input.value).toBe('Test Track');
    });

    it('calls searchResponse with an empty array when no tracks are found', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ tracks: { items: [] } }),
        });
        const mockSearchResponse = jest.fn();
        render(<Searchbar token={{ access_token: 'test-token' }} searchResponse={mockSearchResponse} />);
        const button = screen.getByTestId('search')
        fireEvent.click(button);
        await waitFor(() => expect(mockSearchResponse).toHaveBeenCalledWith([]));
    });
});