import { createStore } from 'solid-js/store';
const initialValue = {
  username: 'Free Guy',
};

const [state, setState] = createStore(initialValue);

const dispatch = ({ action, payload = null }) => {
  switch (action) {
    case 'SETUSER':
      setState('username', (username) => (username = payload));
      break;
    default:
      break;
  }
};

export { state, dispatch };
