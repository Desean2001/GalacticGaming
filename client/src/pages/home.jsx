import React from 'react';
import { Container} from 'react-bootstrap';
import './VerticalCenterText.css';

const HomePage = () => {
  return (
    <Container fluid>
        <div className='vertical-center-container'>
            <h1 className='text-light'>Welcome to GalacticGaming</h1>
            <p className='text-light'>
            Explore the universe of gaming adventures and beyond. May the force of great games be with you!
            </p>
        </div>
    </Container>
  );
};

export default HomePage;