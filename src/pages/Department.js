import React, { useEffect, useState } from 'react';
import { getDeptList, createDept, updateDept, getEmpList, deleteDept } from '../services/Api';


const Department = () => {

    let [deptHead, setDeptHead] = useState([])
    let [deptData, setDeptData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [isFormSubmitted, setIsFormSubmitted] = useState(false)
    let [deptObj, setDeptObj] = useState({
        "deptId": 0,
        "deptName": "",
        "deptHeadEmpId": '',
        "createdDate": new Date()
    });

    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);


    useEffect(() => {
        getDepartmentData();
        showAllDeptHead();
    }, [])

    const showAllDeptHead = () => {
        getEmpList().then((data) => {
            setDeptHead(data.data)
            setIsLoader(false);
        })
    }


    const getDepartmentData = () => {
        getDeptList().then((data) => {
            setDeptData(data.data);
            setIsLoader();
        })
    }

    const onCreateDept = () => {
        setIsFormSubmitted(true);
        if (deptObj.deptName != '' && deptObj.deptHead != '' && deptObj.createdDate != '') {
            createDept(deptObj).then((data) => {
                if (data.result) {
                    alert('Department Created Successfully')
                    getDepartmentData();

                } else {
                    alert(data.message)
                }
            })
        }
    }

    const onChangeValue = (event, key) => {
        setDeptObj(prevobj => ({ ...prevobj, [key]: event.target.value }))
    }

    const onUpdateDept = () => {
        setIsFormSubmitted(true);
        if (deptObj.deptName != '' && deptObj.deptHead != '' && deptObj.createdDate != '') {
            updateDept(deptObj).then((data) => {
                debugger;

                if (data.result) {
                    debugger;

                    alert('Dept Updated Successfully')
                    getDepartmentData();

                } else {
                    alert(data.message)
                }

            })
        }
    }

    const onEditDept = (item) => {
        try {
            setisShowForm(true);
            setDeptObj(prevObj => ({
                ...prevObj,
                deptId: item.deptId,
                deptName: item.deptName,
                deptHeadEmpId: item.deptHeadEmpId,
                createdDate: item.createdDate
            }))
        } catch (error) {
            alert('Error Occuored');
        }
    }

    const onDeleteDept = (deptId) => {
        deleteDept(deptId).then((data) => {
            const isDelete = window.confirm('Are you sure want to delete')
            if (isDelete) {
                if (data) {
                    alert('Dept Deleted Successfully')
                    getDepartmentData();
                } else {
                    alert(data.message)
                }
            }

        })
    }

    const onResetDept = () => {
        setDeptObj({
            "deptId": 0,
            "deptName": "",
            "deptHeadEmpId": '',
            "createdDate": ""
        })
    }

    const showForm = () => {
        setisShowForm(true);
    }
    const showCard = () => {
        setisShowCard(true);
    }

    const closeForm = () => {
        setisShowForm(false);
    }

    const showTable = () => {
        setisShowCard(false);
    }
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 mb-2 text-end'>
                        <button className='btn btn-danger mb-2' onClick={showForm}>Add Data</button>
                    </div>

                    <div  className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div className='card'>
                            <div className='card-header' style={{backgroundColor:'#263F4E'}}>
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>Department List</strong>
                                    </div>

                                    <div className='col-6 text-end '>
                                        {
                                            !isShowCard && <button className='btn btn-body p-0 outline' onClick={showCard}>
                                                <i class="fa fa-th fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }
                                        {
                                            isShowCard && <button className='btn btn-body p-0 outline' onClick={showTable}>
                                                <i class="fa fa-table fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }

                                    </div>
                                </div>
                            </div>
                            {
                                !isShowCard && <div className='card-body'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Dept Name</th>
                                                <th>Dept Head Name</th>
                                                <th>Created Date</th>
                                                <th>Edit</th>
                                                <th>Delete</th>

                                            </tr>
                                        </thead>
                                        {
                                            isLoader && <tbody>
                                                <tr>
                                                    <td colSpan={9} className='text-center'>
                                                        <div class="spinner-border text-muted"></div>
                                                        <div class="spinner-border text-primary"></div>
                                                        <div class="spinner-border text-success"></div>
                                                        <div class="spinner-border text-info"></div>
                                                        <div class="spinner-border text-warning"></div>
                                                        <div class="spinner-border text-danger"></div>
                                                        <div class="spinner-border text-secondary"></div>
                                                        <div class="spinner-border text-dark"></div>
                                                        <div class="spinner-border text-light"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                        {!isLoader && <tbody>
                                            {
                                                deptData.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1} </td>
                                                        <td> {item.deptName} </td>
                                                        <td> {item.deptHeadName}</td>
                                                        <td> {item.createdDate} </td>
                                                        <td><button className='btn btn-sm btn-primary' onClick={() => { onEditDept(item) }}><i className='fa fa-pencil'></i></button> </td>
                                                        <td> <button className='btn btn-sm btn-danger' onClick={() => { onDeleteDept(item.deptId) }}><i className='fa fa-trash-o'></i></button></td>
                                                    </tr>)
                                                })
                                            }

                                        </tbody>
                                        }
                                    </table>
                                </div>
                            }
                            {
                                isShowCard && <div className='card-body'>
                                    <div className='row'>
                                        {
                                            deptData.map((item) => {
                                                return (
                                                    <div className='col-4 mt-4'>
                                                        <div className='card'>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-6'>
                                                                        <strong>Department Name</strong> - {item.deptName}
                                                                        </div>
                                                                        <div className='col-6'>
                                                
                                                                        <strong>Created Date</strong> - {item.createdDate}

                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className={`col-2 text-end ${isShowForm ? 'offset-6' : 'offset-7'}`}>
                                                                        <button className='btn btn-sm btn-primary' onClick={() => { onEditDept(item) }}><i className='fa fa-pencil'></i></button>

                                                                    </div>
                                                                    <div className='col-2 text-end'>
                                                                        <button className='btn btn-sm btn-danger' onClick={() => { onDeleteDept(item.deptId) }}><i className='fa fa-trash-o'></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='col-4'>
                        {
                            isShowForm && <div className='card'>
                                <div className='card-header'  style={{backgroundColor:'#263F4E'}}>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <strong className='text-white'> Department Form</strong>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <button className='btn p-0 btn-body' onClick={closeForm}>
                                                <i className="fa fa-times fa-lg text-white"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                <div className='card-body'>
                                    <div className='row mt-2'>
                                        <div className='col-6'>
                                            <label>Department Name</label>
                                            <input type='text' className='form-control' value={deptObj.deptName} onChange={(e) => { onChangeValue(e, 'deptName') }} />
                                            {
                                                isFormSubmitted && deptObj.deptName == '' && <span className='text-danger'>Department name Is Required </span>

                                            }
                                        </div>

                                        <div className='col-6'>
                                            <label>Department Head</label>
                                            <select className='form-select' value={deptObj.deptHeadEmpId} onChange={(event) => { onChangeValue(event, 'deptHeadEmpId') }}>
                                                <option value=''>Select Head</option>
                                                {
                                                    deptHead.map((item) => {
                                                        return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                    })
                                                }
                                            </select>
                                            {
                                                isFormSubmitted && deptObj.deptHeadEmpId == '' && <span className='text-danger'>Department Head Is Required </span>

                                            }

                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-6'>
                                            <label>Created Date</label>

                                            <input type='date' className='form-control' value={deptObj.createdDate} onChange={(e) => { onChangeValue(e, 'createdDate') }} />
                                            {
                                                isFormSubmitted && deptObj.createdDate == '' && <span className='text-danger'>Date Is Required </span>

                                            }
                                        </div>
                                    </div>
                                    <div className='row mt-2 mb-2'>
                                        <div className='col-2'>

                                            {deptObj.deptId == 0 && <button className='btn btn-success btn-sm' onClick={onCreateDept}>Save</button>}
                                            {deptObj.deptId !== 0 && <button className='btn btn-warning btn-sm' onClick={onUpdateDept}>Update</button>}


                                        </div>
                                        <div className='col-2'>
                                            <button className='btn btn-secondary btn-sm' onClick={onResetDept}>Reset</button>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        }



                    </div>


                </div>
            </div>
        </div>
    );
};

export default Department;