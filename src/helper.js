
export const isAuth = () => {

  const token = localStorage.getItem(`token`);
  try {
    const data = JSON.parse(atob(token.split('.')[1]));
    return data?.exp * 1000 > +(new Date());
  } catch (e) {
    return false;
  }

}



export const logout = () => {
  localStorage.clear();
  window.location.replace(`/`);
}