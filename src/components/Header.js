import Button from "./Button"

const Header = ({title, onAdd}) => {
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button color='Green' text='Add' onAdd={onAdd}/>
    </header>
  )
}

export default Header
Header.defaultProps ={
    title:'Todo List'
}