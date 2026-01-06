import {createContext, useContext} from 'react'
import { useReport } from '../hooks/useReport';

const ReportContext = createContext(null)

export const ReportProvider = ({children}) => {
    const report = useReport();
    return (
        <ReportContext.Provider value={report}>
            {children}
        </ReportContext.Provider>
    );
};

export const useReportContext= ()=>{
    return useContext(ReportContext)
}