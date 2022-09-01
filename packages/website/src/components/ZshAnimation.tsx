import { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';

const JSON_URL = './anim/zsh-anim.json';

function ZshAnimation() {
  const [animData, setAnimData] = useState(null);

  useEffect(() => {
    fetch(JSON_URL)
      .then((r) => r.json())
      .then((data) => {
        setAnimData(data);
      })
      .catch((err) => {
        console.error(`Failed to load zsh animation: ${err}`);
      });
  }, []);

  return (
    animData && (
      <Lottie
        play
        loop
        animationData={animData}
        style={{
          width: 680,
          height: 384,
          maxWidth: '90%',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    )
  );
}

export default ZshAnimation;
