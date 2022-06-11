import React from 'react';

export let defaultUserContext = {
    userId: "",
    updateUserId (val) {
        this.userId = val
    }
}

export const UserContext = React.createContext(defaultUserContext)