import React from 'react';
import { Container} from 'react-bootstrap';
import './VerticalCenterText.css';

const HomePage = () => {
  return (
    <Container fluid>
        <div className='vertical-center-container'>
            <h1 className='text-caution'>Welcome to Galactic Gaming</h1>
        </div>
        <div className='vertical-center-container'>
            <p className='text-caution'>
                Explore the universe of gaming adventures and beyond. May the force of great games be with you!
            </p>
        </div>
    </Container>
  );
};

export default HomePage;