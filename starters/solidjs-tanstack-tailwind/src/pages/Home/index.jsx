import { NavLink } from 'solid-app-router';

const Home = () => {
  return (
    <div>
      <NavLink href="/counter">Counter</NavLink>
      <NavLink href="/">Home</NavLink>
    </div>
  );
};

export default Home;
