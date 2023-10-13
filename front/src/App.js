import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import EditClient from './components/EditClient'
import EditMedidor from './components/EditMedidor'
import NewMedidor from './components/NewMedidor'
import Menu from './components/Navbar';
import { Container } from '@mui/material';

export default function app() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/newmedidor/:id" element={<NewMedidor />} />
          <Route path='/clientes/:id/edit' element={<EditClient />} />
          <Route path='/medidores/:id/edit' element={<EditMedidor />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
