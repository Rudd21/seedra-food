import axios from "axios";
import { useReportContext } from "./ReportContext"
import {apiRequest} from '../../../serverRequest';

export const ReportModal = ()=>{
    const {isOpen, formReport, setFormReport, closeReport} = useReportContext();

    if(!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="w-96 bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-3">Скарга</h2>

        <input
            className="w-full border p-2 mb-2"
            placeholder="Назва"
            value={formReport.name}
            onChange={e =>
            setFormReport(prev => ({
                ...prev,
                name: e.target.value
            }))
            }
        />

        <textarea
            className="w-full border p-2 mb-3"
            placeholder="Опис"
            value={formReport.description}
            onChange={e =>
            setFormReport(prev => ({
                ...prev,
                description: e.target.value
            }))
            }
        />

        <div className="flex justify-end gap-2">
            <button
            className="px-4 py-2 bg-gray-300"
            onClick={closeReport}
            >
            Скасувати
            </button>

            <button
            className="px-4 py-2 bg-red-500 text-white"
            onClick={() => {
                axios.post(`${apiRequest}/addReport`, 
                    formReport, 
                    {
                        withCredentials: true
                    }
                )
                closeReport();
            }}
            >
            Відправити
            </button>
        </div>
        </div>
    </div>
    );
};