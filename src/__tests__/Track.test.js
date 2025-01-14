import React from 'react';
import { render, screen } from '@testing-library/react';
import Track from '../components/Track';

describe('<Track />', () => {
    const mockProps = {
        albumArt: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDecide_%2528album%2529&psig=AOvVaw3UFpAxfXEeNFlBL1mGOdPH&ust=1736004933558000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICInL7w2YoDFQAAAAAdAAAAABAE',
        song: 'On and On',
        album: 'Go for it',
        artist: 'Djo'
    };

    it('renders the track image', () => {
        render(<Track {...mockProps} />);
        const imgElement = screen.getByRole('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', mockProps.albumArt);
        expect(imgElement).toHaveClass('track-img');
    });

    it('renders the track name', () => {
        render(<Track {...mockProps} />);
        expect(screen.getByText(mockProps.song)).toBeInTheDocument();
        expect(screen.getByText(mockProps.song)).toHaveClass('track-name');
    });

    it('renders the album name', () => {
        render(<Track {...mockProps}/>);
        expect(screen.getByText(mockProps.album)).toBeInTheDocument();
        expect(screen.getByText(mockProps.album)).toHaveClass('album-name');
    });

    it('renders the artists name', () => {
        render(<Track {...mockProps}/>);
        expect(screen.getByText(mockProps.artist)).toBeInTheDocument();
        expect(screen.getByText(mockProps.artist)).toHaveClass('artist-name');
    });

    it('matches the snapshot', () => {
        const { asFragment } = render(<Track {...mockProps}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should have an accessible image with an alt atttribute', () => {
        render(<Track {...mockProps}/>);
        const imgElement = screen.getByRole('img');
        expect(imgElement).toHaveAttribute('alt', expect.any(String));
    });

    it('renders default values when props are missing', () => {
        render(<Track />);
        expect(screen.queryByText(/Track name/i)).toBeNull();
    });

    it('does not render elements if props are missing', () => {
        render(<Track />);
        expect(screen.queryByText(/Text Song/i)).not.toBeInTheDocument();
    });
})