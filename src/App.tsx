import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PostPage } from './pages/PostPage'
import { SeriesListPage } from './pages/SeriesListPage'
import { SeriesPage } from './pages/SeriesPage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="posts/:slug" element={<PostPage />} />
        <Route path="series" element={<SeriesListPage />} />
        <Route path="series/:slug" element={<SeriesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
