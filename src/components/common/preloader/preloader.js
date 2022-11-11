import './preloader.css';
import React from 'react';
import loading from '../../../assets/loading.png';

const Preloader = () => (
  <div><img alt="wait" className="movepick" src={loading} /></div>
);

export default Preloader;
