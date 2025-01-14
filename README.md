# Jammming

Jammming is a React-based web application that allows users to search for tracks on Spotify, create custom playlists, and save them directly to their Spotify account. This app leverages Spotify's Web API to provide a seamless and interactive music curation experience.

---

## Features

- **Spotify Authentication**: Login with your Spotify account to access its functionality.
- **Search Tracks**: Search for tracks from Spotify’s database using keywords.
- **Interactive Playlist Builder**: Add or remove tracks to create a personalized playlist.
- **Save Playlist**: Save the created playlist directly to your Spotify account.
- **Responsive Design**: Works across different screen sizes.

---

## Technologies Used

- **React**: Front-end library for building the user interface.
- **Spotify Web API**: For track searching and playlist management.
- **CSS**: Custom styling for an intuitive UI.
- **Jest & React Testing Library**: For unit and integration testing.

---

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/jammming.git
   cd jammming
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a Spotify Developer Application**:
   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
   - Create a new application and retrieve your Client ID.
   - Set the Redirect URI to `http://localhost:3000` in your app settings.

4. **Set up environment variables**:
   Create a `.env` file in the project root and add the following:

   ```env
   REACT_APP_SPOTIFY_CLIENT_ID=your-client-id
   REACT_APP_REDIRECT_URI=http://localhost:3000
   ```

5. **Run the application**:

   ```bash
   npm start
   ```

6. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── src
│   ├── components
│   │   ├── Authorisation.js
│   │   ├── Playlist.js
│   │   ├── Searchbar.js
│   │   ├── SearchResults.js
│   │   └── TrackList.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── public
├── .env
├── package.json
└── README.md
```

---

## Testing

1. **Run Tests**:

   ```bash
   npm test
   ```

2. **Test Coverage**:
   - Tests include unit tests for individual components and integration tests for user flows.
   - Focused on API interaction, state updates, and UI rendering.

---

## Usage

1. **Login**:
   - Click on the "Login to Spotify" button to authenticate.

2. **Search for Tracks**:
   - Use the search bar to find your favorite tracks.

3. **Add to Playlist**:
   - Click the "Add" button next to a track to include it in your playlist.

4. **Save Playlist**:
   - Enter a playlist name and click "Save" to upload your playlist to Spotify.

---

## Known Issues

- **Multiple Save Buttons**: Ensure unique identifiers for buttons to avoid multiple roles conflicts.
- **Deprecation Warnings**: Address warnings such as `ReactDOMTestUtils.act` deprecation by using `React.act`.

---

## Future Improvements

- Add drag-and-drop functionality for track reordering.
- Implement user feedback (e.g., loading indicators, success messages).
- Improve error handling and display meaningful error messages.
- Enhance UI/UX with animations and modern design elements.

---

## Contributing

Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgements

- Spotify for providing the Web API.
- React for a robust front-end framework.
- [Codecademy](https://www.codecademy.com) for inspiring the project.
