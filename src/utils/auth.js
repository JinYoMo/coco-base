import Cookies from 'js-cookie'

const TokenKey = 'token' // token：cookie中
const PublicKey = 'public_key' // 公钥：localStorage中
const CurrentSystem = 'current_system' // 当前系统，未必每个项目都有用：localStorage中

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPublicKey() {
  return window.localStorage.getItem(PublicKey)
}

export function setPublicKey(publicKey) {
  return window.localStorage.setItem(PublicKey, publicKey)
}

export function removePublicKey() {
  return window.localStorage.removeItem(PublicKey)
}
export function getCurrentSys() {
  let currentSystem = window.localStorage.getItem(CurrentSystem)
  if (typeof (currentSystem) === 'undefined') {
    return undefined
  } else {
    currentSystem = JSON.parse(currentSystem)
    return currentSystem
  }
}
export function setCurrentSys(currentSystem) {
  console.log('in auth setCurrentSys')
  const currentSys = JSON.stringify(currentSystem)
  return window.localStorage.setItem(CurrentSystem, currentSys)
}

export function removeCurrentSys() {
  return window.localStorage.removeItem(CurrentSystem)
}
