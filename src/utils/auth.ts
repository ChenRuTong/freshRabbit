export const getToken = (): any => {
  return JSON.parse(localStorage.getItem('freshrabbitToken') || '{}')
}

export const setToken = (token: string) => {
  localStorage.setItem('freshrabbitToken', JSON.stringify(token))
}
