import { Routes, Route, Navigate } from 'react-router-dom'
import { RequireAuth } from './features/auth/RequireAuth'
import { AppShell } from './components/layout/AppShell'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import VerifyPage from './features/auth/VerifyPage'
import DashboardPage from './features/dashboard/DashboardPage'
import TicketsListPage from './features/tickets/TicketsListPage'
import NewTicketPage from './features/tickets/NewTicketPage'
import TicketDetailPage from './features/tickets/TicketDetailPage'
import SearchPage from './features/search/SearchPage'
import ProfilePage from './features/profile/ProfilePage'
import AdminPage from './features/admin/AdminPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerifyPage />} />

      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tickets" element={<TicketsListPage />} />
        <Route path="/views/:view" element={<TicketsListPage />} />
        <Route path="/tickets/new" element={<NewTicketPage />} />
        <Route path="/tickets/:id" element={<TicketDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
