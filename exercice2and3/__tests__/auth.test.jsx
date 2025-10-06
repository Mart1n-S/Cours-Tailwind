/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LoginForm } from '../src/components/LoginForm'
import { AuthProvider } from '../src/Context/AuthContext'

// --- Mock du module API ---
jest.mock('../src/services/api', () => ({
  loginApi: jest.fn(),
  logout: jest.fn(),
  getUserEmail: jest.fn(),
  isAuthenticated: jest.fn(() => false),
}))

import { loginApi } from '../src/services/api'

// --- Mock de useNavigate pour éviter les erreurs ---
const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
  }
})

// --- Helper pour wrapper avec le contexte ---
const renderWithProviders = (ui) =>
  render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  )

// --- Tests ---
describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('connexion réussie redirige et affiche pas d’erreur', async () => {
    loginApi.mockResolvedValueOnce('fake-token')

    renderWithProviders(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'student@example.com' } })
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password' } })
    fireEvent.click(screen.getByRole('button', { name: /valider/i }))

    await waitFor(() => {
      expect(loginApi).toHaveBeenCalledWith('student@example.com', 'password')
      expect(mockedNavigate).toHaveBeenCalledWith('/tasks', { replace: true })
    })

    expect(screen.queryByText(/erreur/i)).toBeNull()
  })

  test('connexion échouée affiche une erreur', async () => {
    loginApi.mockRejectedValueOnce({
      response: { data: { error: 'Identifiants invalides' } },
    })

    renderWithProviders(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } })
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: /valider/i }))

    const errorMessage = await screen.findByText(/erreur réseau ou serveur|invalides/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
