import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { getMe, deleteGame } from '../utils/API';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

const SavedGames = () => {
  const [userData, setUserData] = useState({});

  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteGame(gameId, token);

      if (!response.ok) {
        throw new Error('something went wrong');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved Games</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games'}
        </h2>
        <Row>
          {userData.savedGames.map((game) => {
            return (
              <Col md="4">
                <Card key={game.gameId} border='dark'>
                  {game.background_image ? <Card.Img src={game.background_image} alt={`The cover art for ${game.name}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <p className='small'>Metacritic: {game.metacritic}</p>
                    <Card.Text>{game.released}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.gameId)}>
                      Delete this Game
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedGames;