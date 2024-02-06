import axios from 'axios';
import * as Constant from "./Constant"
const ApiUrl = process.env.REACT_APP_API_KEY;



const getLogin = async (obj) => {
    const result = await axios.post(ApiUrl + Constant.CHECK_LOGIN, obj);
    return result.data
}

const getDeptList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_DEPARTMENT)
    return result.data
}

const createDept = async (obj) => {
    const result = await axios.post(ApiUrl + Constant.ADD_DEPARTMENT, obj)
    return result.data
}
const updateDept = async (obj) => {
    debugger;
    const result = await axios.put(ApiUrl + Constant.UPDATE_DEPARTMENT , obj)
    debugger;
    return result.data
}
// const getEmpDept = async (id) => {
//     const result = await axios.get(ApiUrl + Constant.GET_EMPLOYEE_BY_DEPT+id);
//     return result.data
// }
const deleteDept = async (id) => {
    const result = await axios.delete(ApiUrl + Constant.DELETE_DEPT_HEAD + id);
    return result.data
}

const getEmpList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_EMP);
    return result.data

}
const createEmp = async (obj) => {
    const result = await axios.post(ApiUrl + Constant.CREATE_EMP, obj)
    return result.data
}

const updateEmp = async (obj) => {
    debugger;

    const result = await axios.put(ApiUrl + Constant.UPDATE_EMP, obj)
    debugger;

    return result.data
}

const editEmp = async (id) => {
    const result = await axios.get(ApiUrl + Constant.EDIT_EMP + id)
    return result.data.data
}
const deleteEmp = async (id) => {
    const result = await axios.delete(ApiUrl + Constant.DELETE_EMP + id);
    return result.data
}

const addTicket = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_TICKET,obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}
const getTicket = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_TICKET );
    return result.data
}

const editTicketData = async(id)=>{
    const result = await axios.get(ApiUrl + Constant.EDIT_TICKET+id)
    return result.data.data
}
const deleteTicketData = async (id)=>{
    const isDelte = window.confirm('Are You Sure want to Delete');
    if(isDelte){
        const result = await axios.delete(ApiUrl + Constant.DELETE_TICKET + id);
        return result.data
    }
   
}

const getRoles = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_ROLE);
    return result.data
}

const getSuperAdmin = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_SUPER_ADMIN);
    return result.data
}



const getTicketById = async (id) => {
    const result = await axios.get(ApiUrl + Constant.SHOW_TICKET_CREATED_BY_EMI_ID+id);
    return result.data
}
const getNewTickets = async (id) => {
    const result = await axios.get(ApiUrl + Constant.SHOW_NEW_TICKET_BY_EMP+id);
    return result.data
}

const startTicket = async (id) => {
    try {
        const result = await axios.post(ApiUrl + Constant.START_TICKET+ id);
        return result.data
    } catch (error) {
        alert(error.code)
    }

}
const closeTicket = async (id) => {
    try {
        const result = await axios.post(ApiUrl + Constant.CLOSE_TICKET+ id);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

//if admin employee logdin
const getAssignedTickets = async (id) => {
    const result = await axios.get(ApiUrl + Constant.SHOW_ASSIGN_TICKET_BY_EMP_ID+id);
    return result.data
}
const GetEmployeesByDeptId = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_EMP_BY_DEPT_ID+id);
    return result.data
}

const getAssignRequest = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.GET_ASSIGN_REQUEST,obj);
    return result.data
    } catch (error) {
        alert(error.code)
    }
    
}

const getEmpDashboard = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_EMP_DASH+id);
    return result.data
}
const getDeptHeadDashData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_DEPT_HEAD_DASH + id);
    return result.data
}
const getAdminEmpDashData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ADMIN_EMP_DASH + id);
    return result.data
}
const getLeaveData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_LEAVE)
    return result.data

}
const addLeave = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_LEAVE,obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}
const editLeave = async (id)=>{
    try {
        const result = await axios.get(ApiUrl + Constant.EDIT_LEAVE +id );
        return result.data
    } catch (error) {
        alert(error.code)
    }

}
const getAllLeaveByEmp = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_LEAVE_BY_EMP + id);
    return result.data
}

const approvelLeave = async (id) => {
    const result = await axios.get(ApiUrl + Constant.FOR_APPROVE_LEAVE+ id);
    return result.data
}
const rejectLeave = async (id) => {
    const result = await axios.get(ApiUrl + Constant.FOR_REJECT_LEAVE + id);
    return result.data
}
const getLeaveForApprovel = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_LEAVE_FOR_APPROVEL + id);
    return result.data
}

export {getLogin,getDeptList,createDept,updateDept,deleteDept,getEmpList,createEmp,updateEmp,
    editEmp,deleteEmp,getTicket,getSuperAdmin,getNewTickets,getAssignedTickets,GetEmployeesByDeptId,
    getAssignRequest,getTicketById,deleteTicketData,editTicketData,getRoles,addTicket,getEmpDashboard,startTicket,closeTicket,getDeptHeadDashData,
    getAdminEmpDashData,getLeaveData,addLeave,editLeave,getAllLeaveByEmp,approvelLeave,rejectLeave,getLeaveForApprovel}