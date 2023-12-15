export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    });
};

export const findUsername = (username) => {
    return fetch(`/api/users/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const saveGame = (gameData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gameData),
    });
  };
  
export const deleteGame = (gameId, token) => {
    return fetch(`/api/users/games/${gameId}`, {
        method: 'DELETE', 
        headers: {
            authorization: `Bearer ${token}`
        },
    });
};

export const createFriend = (userData, token) => {
    return fetch(`/api/users/friends/${userData}`, {
        meathod: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData)
    });
};

export const deleteFriend = (friendId, token) => {
    return fetch(`/api/users/friends/${friendId}`, {
        meathod: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

const key = import.meta.env.VITE_KEY_ID

export const gameSeach = (search) => {
    return fetch(`https://api.rawg.io/api/games?key=${key}&search=${search}&page_size=9`)
};