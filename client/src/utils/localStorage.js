export const getSavedGameIds = () => {
    const savedGameIds = localStorage.getItem('saved_games')
      ? JSON.parse(localStorage.getItem('saved_games'))
      : [];
  
    return savedGameIds;
  };
  
  export const saveGameIds = (gameIdArr) => {
    if (gameIdArr.length) {
      localStorage.setItem('saved_games', JSON.stringify(gameIdArr));
    } else {
      localStorage.removeItem('saved_games');
    }
  };
  
  export const removeGameId = (gameId) => {
    const savedGameIds = localStorage.getItem('saved_games')
      ? JSON.parse(localStorage.getItem('saved_games'))
      : null;
  
    if (!savedGameIds) {
      return false;
    }
  
    const updatedSavedGameIds = savedGameIds?.filter((savedGameId) => savedGameId !== gameId);
    localStorage.setItem('saved_games', JSON.stringify(updatedSavedGameIds));
  
    return true;
  };

  //export const getFriendIds = () => {
  //  const friendsIds = localStorage.getItem('friends')
   //   ? JSON.parse(localStorage.getItem('friends'))
    //  : [];

  //  return friendsIds;
  //};

 // export const saveFriendIds = (friendsArr) => {
 //   if (friendArr.length) {
 //     localStorage.setItem('friends', JSON.stringify(friendsArr));
  //  } else {
   //   localStorage.removeItem('friends');
  //  }
  //};

 // export const removeFriendsId = (friendId) => {
  //  const friendsIds = localStorage.getItem('friends')
   //   ? JSON.parse(localStorage.getItem('friends'))
  //    : null;
//
   //   if (!friendsIds) {
   //     return false;
   //   }

  //    const updatedFriendsIds = friendsIds?.filter((savedFriend) => savedFriend !== friendId);
  //    localStorage.setItem('friends', JSON.stringify(updatedFriendsIds));
//
  //    return true;
//  };