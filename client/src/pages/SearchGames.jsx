import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveGame, gameSeach } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

const SearchGames = () => {

  const [searchedGame, setSearchedGame] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await gameSeach(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await response.json();

      const gameData = results.map((game) => ({
        gameId: game.id,
        name: game.name,
        background_image: game.background_image,
        metacritic: game.metacritic,
        released: game.released,
      }));

      setSearchedGame(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveGame = async (gameId) => {
    const gameToSave = searchedGame.find((game) => game.gameId === gameId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveGame(gameToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Games</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Game'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedGame.length
            ? `Viewing ${searchedGame.length} results:`
            : 'Search for a Game'}
        </h2>
        <Row>
          {searchedGame.map((game) => {
            return (
              <Col md="4" key={game.gameId}>
                <Card border='dark'>
                  {game.background_image ? (
                    <Card.Img src={game.background_image} alt={`The cover for ${game.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <p className='small'>Released: {game.released}</p>
                    <Card.Text>{game.metacritic}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveGame(game.gameId)}>
                        {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                          ? 'This game has already been saved!'
                          : 'Save this game!'}
                      </Button>
                    )}
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

export default SearchGames;