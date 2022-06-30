const localStorageKey = "hootyUserId"

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

export const AnswerResponseOptions = {
    SUBMIT_VOTE: 1,
    DISPLAY_RESULTS: 2
}