import  Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const infoName = 'token'

export function getToken() {
  let info = (sessionStorage.getItem(infoName)=='null' || sessionStorage.getItem(infoName)==null ||!sessionStorage.getItem(infoName))?'':sessionStorage.getItem(infoName);
  return info
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setsessionInfo(info){
  return sessionStorage.setItem(infoName, info)
}
export function getsessionInfo(){
  return sessionStorage.getItem(infoName)
}