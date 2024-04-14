export const isUserLoggedIn = () => {
    if(typeof window !== 'undefined'){
        if(window.localStorage.getItem('AuthToken') || window.localStorage.getItem('UserID')){
            return true
        }
        return false
    }
}