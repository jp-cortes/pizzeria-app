import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
};

export function Layout (props:Props) {
  return (
    <>
      <Navbar/>
      {props.children}
      <Footer/>
    </>
  );
}
