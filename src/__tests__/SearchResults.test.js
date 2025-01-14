import { render, screen } from '@testing-library/react';
import SearchResults from '../components/SearchResults';

describe('SearchResults', () => {

    it('passes props to TrackList', () => {
        const mockUpdateTrackList = jest.fn();
        const mockHandleClick = jest.fn();
        const mockSearchResult = [{ id: '1', name: 'Track 1' }];
    
        render(
            <SearchResults
                searchResult={mockSearchResult}
                updateTrackList={mockUpdateTrackList}
                handleClick={mockHandleClick}
            />
        );
    
        const trackListElement = screen.getByText(/results/i).nextSibling;
        expect(trackListElement).toBeInTheDocument();
    });

    it('renders the correct number of tracks', () => {
        const mockSearchResult = [
            { id: '1', name: 'Track 1' },
            { id: '2', name: 'Track 2' },
        ];
    
        render(<SearchResults searchResult={mockSearchResult} updateTrackList={jest.fn()} handleClick={jest.fn()} />);
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
    
    
});