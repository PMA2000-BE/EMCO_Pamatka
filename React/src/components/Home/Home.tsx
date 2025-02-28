// это главная страница 
import React from 'react'; 
import Glava from '../Glava/glava';
import TagsList from '../Taglist/Taglist';
import './ui.scss'; 
 
const Home: React.FC = () => { 
  return ( 
    <> 
    <div> 
        <Glava title="Выберите технику" /> 
        <TagsList/>
    </div> 
    </> 
  ); 
}; 
 
export default Home