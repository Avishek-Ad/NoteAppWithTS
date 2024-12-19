import { Route, Routes } from "react-router-dom"
import AllNotesPage from "./pages/AllNotesPage"
import CreateNotePage from "./pages/CreateNotePage"
import ReadSingleNote from "./pages/ReadSingleNote"
import EditSingleNote from "./pages/EditSingleNote"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route path="/notes" element={<AllNotesPage />} />
      <Route path="/create" element={<CreateNotePage />} />
      <Route path="/read/:id" element={<ReadSingleNote />} />
      <Route path="/edit/:id" element={<EditSingleNote />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
