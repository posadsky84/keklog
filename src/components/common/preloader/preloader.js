import './preloader.css';
import React from 'react';
import loading from '../../../assets/loading.png';

function Preloader() {
  return <div><img alt="wait" className="movepick" src={loading} /></div>;
}

export default Preloader;
