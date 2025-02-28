
import Button from 'react-bootstrap/Button'; 
import './ui.css'; 
 
function ButtonBust({ title, onClick }) { 
  return ( 
      <button type="button" className="btn-lg" as={Button} onClick={onClick}> 
       <div className ="big_button_text"> {title} </div> 
      </button> 
  ); 
} 
 
export default ButtonBust;