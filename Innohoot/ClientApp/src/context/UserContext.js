import React from 'react';

export const UserContext = React.createContext({
    userId: "",
    updateUserId: (val) => {this.userId = val}
})