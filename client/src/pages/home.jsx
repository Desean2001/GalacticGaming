import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container fluid>
        <h1 className='text-light'>Welcome to GalacticGaming</h1>
        <p className='text-light'>
          Explore the universe of gaming adventures and beyond. May the force of great games be with you!
        </p>
    </Container>
  );
};

export default HomePage;