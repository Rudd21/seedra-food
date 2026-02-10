import { useContext, createContext } from "react";
import { useResult } from "../hooks/useResult";

const ResultContext = createContext(null);

export const ResultProvider = ({children}) =>{
    const result = useResult();
    return(
        <ResultContext.Provider value={result}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = ()=>{
    return useContext(ResultContext);
}