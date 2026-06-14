export function root_path() {
  return '/'
}

export function about_path() {
  return '/about'
}

export function login_path() {
  return '/login'
}

export function signup_path() {
  return '/signup'
}

export function logout_path() {
  return '/logout'
}

export function password_path(token: string) {
  return `/passwords/${encodeURIComponent(token)}`
}

export function passwords_path() {
  return '/passwords'
}
