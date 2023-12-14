import { useState, useEffect } from 'react';
import { Container, Form, Button} from 'react-bootstrap';

import { findUsername, createFriend } from '../utils/API';
import { getFriendIds, saveFriendIds } from '../utils/localStorage';
import Auth from '../utils/auth';

const findPeopleForm = () => {

    const [searchedPeople, setSearchedPeople] = useState([])

    const [peopleFormData, setPeopleFormData] = useState({ username: '' });

    const [savedFriendIds, setSavedFriendIds] = useState(getFriendIds());

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };

    useEffect(() => {
        return () => saveFriendIds(savedFriendIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
          const response = await findUsername(peopleFormData);
    
          if (!response.ok) {
            throw new Error('something went wrong');
          }

          const { results } = await response.json();

          const peopleData = results.map((user) => ({
            _id: user.userId,
            username: user.username,
            email: user.email,
          }));

          setSearchedPeople(peopleData);
          setPeopleFormData('');
        } catch (err) {
            console.error(err);
          }
        };

    const handleFriend = async (userId) => {
        const friendToSave = searchedPeople.find((user) => user.userId === userId);
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if (!token) {
            return false;
        }
        
        try {
            const response = await createFriend(friendToSave, token);
        
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
        
            setSavedFriendIds([...savedFriendIds, friendToSave.userId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="text-light bg-dark p-5">
        <Container>
            <h1>Search for People</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className='mb-3'>
                <Form.Label htmlFor='username'>Search for Users</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Username'
                    name='username'
                    onChange={handleInputChange}
                    value={peopleFormData.username}
                    required
                />
                <Form.Control.Feedback type='invalid'>Gotta type a username to Search</Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(peopleFormData.username)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </Container>

        <Container>
        <h2 className='pt-5'>
          {searchedPeople.length
            ? `Viewing ${searchedPeople.length} results:`
            : 'Search for a Username'}
        </h2>
        <Row>
          {searchedPeople.map((user) => {
            return (
              <Col md="4" key={user.username}>
                <Card border='dark'>
                  <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>{user.email}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedFriendIds?.some((savedFriendId) => savedFriendId === user.userId)}
                        className='btn-block btn-info'
                        onClick={() => handleFriend(user.userId)}>
                        {savedFriendIds?.some((savedFriendId) => savedFriendId === user.userId)
                          ? 'Youre friends!'
                          : 'Become Friends?'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
    );
};

export default findPeopleForm;