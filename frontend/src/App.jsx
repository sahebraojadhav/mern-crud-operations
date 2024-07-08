import './App.css'
import { Route,Routes } from 'react-router-dom'

import CreateBook from './Pages/CreateBooks'
import DeleteBook from './Pages/DeleteBooks'
import EditBook from './Pages/EditBooks'
import ShowBook from './Pages/ShowBooks'
import Home from './Pages/Home'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      </Route>
      
    </Routes>
  )
} 

export default App
