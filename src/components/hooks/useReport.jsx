import {useState} from 'react'

export const useReport = () =>{
    const [isOpen, setIsOpen] = useState(false)

    const [formReport, setFormReport] = useState({
        name: '',
        description: '',
        target: '',
        targetId: ''
    });

    const openReport = (target, targetId) =>{
        setFormReport(prev =>({
            ...prev,
            target,
            targetId
        }));
        setIsOpen(true);
    }

    const closeReport = ()=>{
        setIsOpen(false);
        setFormReport({
            name:'',
            description:'',
            target:'',
            targetId:''
        })
    }

    return {
        isOpen,
        formReport,
        setFormReport,
        openReport,
        closeReport
    }
}