import { render, screen, fireEvent } from '@testing-library/react';
import TrackList from '../components/TrackList';

describe('TrackList', () => {
    it('renders the correct number of tracks', () => {
        const mockTracks = [
          { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1', albumArt: 'url1' },
          { id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2', albumArt: 'url2' },
        ];
      
        render(<TrackList trackList={mockTracks} handleClick={jest.fn()} playList={true} />);
      
        const trackElements = screen.getAllByRole('listitem');
        expect(trackElements).toHaveLength(mockTracks.length);
    });

    it('calls handleClick with the correct track on button click', () => {
        const mockTracks = [
          { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1', albumArt: 'url1' },
        ];
        const handleClick = jest.fn();
      
        const { getByText } = render(
          <TrackList trackList={mockTracks} handleClick={handleClick} playList={true} />
        );
      
        const button = getByText('+');
        fireEvent.click(button);
      
        expect(handleClick).toHaveBeenCalledWith(mockTracks[0]);
    });

    it('renders "+" button when playList is true', () => {
        const mockTracks = [{ id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1', albumArt: 'url1' }];
      
        const { getByText } = render(
          <TrackList trackList={mockTracks} handleClick={jest.fn()} playList={true} />
        );
      
        expect(getByText('+')).toBeInTheDocument();
    });

    it('renders "-" button when playList is false', () => {
        const mockTracks = [{ id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1', albumArt: 'url1' }];
      
        const { getByText } = render(
          <TrackList trackList={mockTracks} handleClick={jest.fn()} playList={false} />
        );
      
        expect(getByText('-')).toBeInTheDocument();
    });

    it('renders empty list when trackList is empty', () => {
        const { container } = render(<TrackList trackList={[]} handleClick={jest.fn()} playList={true} />);
        expect(container.querySelector('.track-list')).toBeEmptyDOMElement();
    });
});