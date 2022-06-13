import React from 'react';
import '../css/loading.css'

const LoadingPin = () => {
    return (
        <div className='overlay'>
            <span className="loader"></span>
        </div>
    );
};

export default LoadingPin;