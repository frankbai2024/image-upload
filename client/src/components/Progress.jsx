import React from 'react';

function Progress({ percentage }) {
  //console.log('percentage:', percentage);
  return (
    <div className='progress'>
      <div
        className="progress-bar progress-bar-striped bg-success"
        role='progressbar'
        style={{ width: `${percentage}%` }}
      >
      </div>
    </div>
  );
}

export default Progress