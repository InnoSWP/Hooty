
let localStorageKey = "hootyUserId"

export let UserContext = {
    getUserId: () => {
        let userId = localStorage.getItem(localStorageKey)
        
        if (userId === null) {
            console.log("no userID")
        }
        
        return userId
    },
    setUserId: (newUserId) => {
        localStorage.setItem(localStorageKey, newUserId)
    }
}