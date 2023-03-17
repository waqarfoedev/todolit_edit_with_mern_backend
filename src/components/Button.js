
function Button({ color, text, onAdd }) {
  return (
    <button style={{ backgroundColor: color }} onClick={onAdd} className='btnn' >{text}</button>
  );
}

export default Button;