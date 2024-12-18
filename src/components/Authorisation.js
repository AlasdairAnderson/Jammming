export function requestAuthentication(clientId) {
    
    const stateKey = 'spotify_auth_state';
    const state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

    
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent('http://localhost:3000/');
    url += '&state=' + encodeURIComponent(state);

    return url; 
}

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

export function getAccessToken(result) {  
  try {
    
    const urlParams = new URLSearchParams(new URL(result).hash.substring(1));
    const accessToken = urlParams.get('access_token');
    const tokenType = urlParams.get('token_type');
    const expiresIn = urlParams.get('expires_in');
    const state = urlParams.get('state');

    if(!accessToken){
      throw new Error('Access token not found in URL.');
    }

    return { access_token: accessToken, token_type: tokenType, expires_in: expiresIn, state: state }

  } catch (error) {
    console.log(error);
    return null;
  }
}

 export async function getUser(userToken) {
  try {
    const ENDPOINT = 'https://api.spotify.com/v1/me';
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken.access_token}`
      }
    }

    console.log(userToken.access_token);

    const response = await fetch(ENDPOINT, options);

    if(response.ok){
      
      const responseObject = await response.json();

      const user = {
        country: responseObject.country,
        display_name: responseObject.display_name,
        email: responseObject.email,
        href:  responseObject.href,
        id:  responseObject.id,
        product: responseObject.product,
        type: responseObject.type,
        uri: responseObject.uri
      }

      return user;
    }
    

  } catch (error) {
    console.log(error);
  }
}