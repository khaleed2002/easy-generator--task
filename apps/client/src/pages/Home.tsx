import WelcomeHero from "../components/WelcomeHero";
import { LogoutBtn } from "../features/authentication/components";
export const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-indigo-100">
      <WelcomeHero />
      <LogoutBtn />
    </div>
  );
};

export default Home;
