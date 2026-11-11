let _menuState = $state(false)
//Todo: check if we have cross user editing of this store because of SSR
export const toggleMenu = () => (_menuState = !_menuState)
export const menuState = () => _menuState

export const closeMenu = () => (_menuState = false)
