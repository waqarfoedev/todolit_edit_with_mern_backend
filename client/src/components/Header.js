import Button from "./Button"

const Header = ({title, onAdd, showTask}) => {
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button color={showTask ? 'green' : 'black'} text={showTask ? 'Close' : 'Add'} onAdd={onAdd}/>
    </header>
  )
}

export default Header
Header.defaultProps ={
    title:'Todo List'
}