import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Playlist from '../components/Playlist';

describe('Playlist', () => {
    it('renders the playlist form with input and save button', () => {
        render(
            <Playlist
                token={{ access_token: 'test-token' }}
                playlistName="My Playlist"
                playListTracks={[]}
                handlePlaylistNameChange={[]}
                handleClick={[]}
                user={{ id: 'test-user' }}
            />
        );
        expect(screen.getByRole('textbox', { id: /playlistName/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { id: /save/i })).toBeInTheDocument();
    });

    it('disables the save button while saving', async () => {
        const mockProps = {
            token: { access_token: 'test-token' },
            playlistName: 'Test Playlist',
            playListTracks: [{ id: '1', name: 'Track 1', uri: 'spotify:track:1' }],
            handlePlaylistNameChange: jest.fn(),
            handleClick: jest.fn(),
            user: { id: 'test-user' },
        };

        render(<Playlist {...mockProps} />);
        const button = screen.getByTestId('savePlaylist');

        fireEvent.click(button);

        expect(button).toBeDisabled();
        await waitFor(() => expect(button).not.toBeDisabled());
    });
})