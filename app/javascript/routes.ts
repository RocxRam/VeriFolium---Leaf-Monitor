export function root_path() {
  return '/'
}

export function about_path() {
  return '/about'
}

export function about_team_path() {
  return '/about/team'
}

export function about_technology_path() {
  return '/about/technology'
}

export function inference_path() {
  return '/inference'
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

export function dashboard_path() {
  return '/dashboard'
}

export function edit_profile_path() {
  return '/profile/edit'
}

export function profile_path() {
  return '/profile'
}

export function new_scan_path() {
  return '/scans/new'
}

export function scan_path(id: number | string) {
  return `/scans/${encodeURIComponent(String(id))}`
}

export function passwords_path() {
  return '/passwords'
}

export function password_path(token: string) {
  return `/passwords/${encodeURIComponent(token)}`
}
