import React from 'react';
import Lottie from 'react-lottie-player';

import lottieJson from '../../components/lottie/lottie.json';
import lottieRamdhan from '../../components/lottie/ramadhan.json';

function home() {
  return (
    <div>
      home
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 150, height: 150 }}
      />
      <Lottie
        loop
        animationData={lottieRamdhan}
        play
        // style={{ width: 200, height: 300 }}
      />
    </div>
  );
}

export default home;
