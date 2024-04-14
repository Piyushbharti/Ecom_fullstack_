import { createContext, useContext, useReducer } from "react";
import { reducerCombined, initialStateCombined } from "@/reducer";

const AppContext = createContext();

export function AppWrapper({children}){
    const [state, dispatch] = useReducer(reducerCombined, initialStateCombined)
    const sharedState = {state, dispatch}
    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
}