import React, { useEffect, useState } from 'react';
import { getEmpList, getDeptList, createEmp, updateEmp, editEmp, deleteEmp, getRoles } from '../services/Api'

const Employee = () => {

    let [allRoles, setAllRolles] = useState([]);
    let [empList, setEmpList] = useState([]);
    let [deptList, setDeptList] = useState([]);
    let [isFormSubmitted, setIsFormSubmitted] = useState(false)
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);


    let [isLoader, setIsLoader] = useState(true);
    let [empObj, setEmpObj] = useState({
        "employeeId": 0,
        "employeeName": "",
        "contactNo": "",
        "emailId": "",
        "deptId": 0,
        "password": "",
        "gender": "",
        "role": ""

    })

    useEffect(() => {
        showAllEmpList();
        getDepartmentData();
        getAllRoles();
    }, [])

    const getAllRoles = () => {
        getRoles().then((data) => {
            setAllRolles(data.data)
        })
    }

    const onChangeValue = (event, key) => {
        setEmpObj(prevobj => ({ ...prevobj, [key]: event.target.value }))
    }

    const onSaveEmp = () => {
        try {
            setIsFormSubmitted(true);
            debugger;
            if (
                empObj.employeeName != '' &&
                empObj.contactNo != '' &&
                empObj.emailId != '' &&
                empObj.deptId != '' &&
                empObj.password != '' &&
                empObj.role != '' &&
                empObj.gender != '') {
                debugger;
                createEmp(empObj).then((data) => {

                    if (data.result) {

                        alert('Employee Created Successfully')
                        showAllEmpList();


                    } else {
                        alert(data.message)
                    }
                })
            }

        } catch (error) {
            alert(error.code)

        }


    }


    const onUpdateEmp = () => {
        updateEmp(empObj).then((data) => {


            if (data.result) {


                alert('Emp Updated Successfully')
                showAllEmpList();
            } else {
                alert(data.message)
            }

        })
    }

    const onEditEmp = (employeeId) => {
        setisShowForm(true);

        editEmp(employeeId).then((data) => {
            setEmpObj(data)
        })
    }
    const onDeleteEmp = (employeeId) => {
        deleteEmp(employeeId).then((data) => {
            const isDelete = window.confirm('Are you sure want to delete')
            if (isDelete) {
                if (data) {
                    alert('Employee Deleted Successfully')
                    showAllEmpList();

                } else {
                    alert(data.message)
                }
            }

        })
    }

    const showAllEmpList = () => {
        getEmpList().then((data) => {
            setEmpList(data.data)
            setIsLoader(false);
        })
    }

    const getDepartmentData = () => {
        getDeptList().then((data) => {
            setDeptList(data.data);
            setIsLoader();
        })
    }

    const onResetEmp = () => {
        setIsFormSubmitted(false);
        setEmpObj({
            "employeeId": 0,
            "employeeName": "",
            "contactNo": "",
            "emailId": "",
            "deptId": '',
            "password": "",
            "gender": "",
            "role": ""
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
                    <div className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div className='card'>
                            <div className='card-header' style={{ backgroundColor: '#263F4E' }}>
                                <div className='row'>
                                    <div className='col-4 text-start'>
                                        <strong className='text-white'>Employee List</strong>
                                    </div>
                                    <div className='col-8 d-flex justify-content-end'>
                                        <div className='row'>
                                            <div className='col-9'>
                                            <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchIcon" />
                                                    <span class="input-group-text" id="searchIcon">
                                                        <i class="fa fa-search" ></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='col-3'>
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



                                </div>
                            </div>




                            {
                                !isShowCard && <div className='card-body'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Employee Name</th>
                                                <th>Department Name</th>
                                                <th>Contact No</th>
                                                <th>Role</th>
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
                                                empList.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1} </td>
                                                        <td> {item.employeeName} </td>
                                                        <td> {item.deptName}</td>
                                                        <td> {item.contactNo} </td>
                                                        <td> {item.role} </td>
                                                        <td><button className='btn btn-sm btn-primary' onClick={() => { onEditEmp(item.employeeId) }} ><i className='fa fa-pencil'></i></button> </td>
                                                        <td> <button className='btn btn-sm btn-danger' onClick={() => { onDeleteEmp(item.employeeId) }}><i className='fa fa-trash-o'></i></button></td>
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
                                            empList.map((item) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-header text-start'>

                                                                <i className='fa fa-user fa-lg'></i> {item.employeeName}
                                                            </div>
                                                            <div className='card-body text-start'>
                                                                <div className='row'>

                                                                    <div className='col-12'>
                                                                        <strong>E-mail</strong> - {item.emailId}
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-12'>

                                                                        <strong>Department Name</strong> - {item.deptName}
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <strong>Contact</strong> - {item.contactNo}
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <strong>Role</strong> - {item.role}
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <div className='row  mb-2 '>
                                                                <div className={`col-2  ${isShowForm ? 'offset-' : 'offset-1'}`}>
                                                                    <td><button className='btn btn-sm btn-primary' onClick={() => { onEditEmp(item.employeeId) }} ><i className='fa fa-pencil'></i></button> </td>

                                                                </div>
                                                                <div className='col-2  '>
                                                                    <td> <button className='btn btn-sm btn-danger' onClick={() => { onDeleteEmp(item.employeeId) }}><i className='fa fa-trash-o'></i></button></td>
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
                                <div className='card-header' style={{ backgroundColor: '#263F4E' }}>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <strong className='text-white'>Employee Form</strong>
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
                                            <label>Employee Name</label>
                                            <input type='text' className='form-control' value={empObj.employeeName} onChange={(e) => { onChangeValue(e, 'employeeName') }} />
                                            {

                                                isFormSubmitted && empObj.employeeName == '' && <span className='text-danger'>Name Is Required </span>
                                            }

                                        </div>
                                        <div className='col-6'>
                                            <label>Contact No</label>
                                            <input type='text' className='form-control' value={empObj.contactNo} onChange={(e) => { onChangeValue(e, 'contactNo') }} />
                                            {

                                                isFormSubmitted && empObj.contactNo == '' && <span className='text-danger'>Contact Is Required </span>
                                            }

                                        </div>
                                    </div>
                                    <div className='row mt-2 '>
                                        <div className='col-6'>
                                            <label>Email</label>
                                            <input type='email' className='form-control' value={empObj.emailId} onChange={(e) => { onChangeValue(e, 'emailId') }} />
                                            {

                                                isFormSubmitted && empObj.emailId == '' && <span className='text-danger'>Email Is Required </span>
                                            }

                                        </div>
                                        <div className='col-6'>
                                            <label>Select Department</label>
                                            <select className='form-select' value={empObj.deptId} onChange={(event) => { onChangeValue(event, 'deptId') }}>
                                                <option value=''>Select Dept</option>
                                                {
                                                    deptList.map((item) => {
                                                        return (<option value={item.deptId}>{item.deptName}</option>)
                                                    })
                                                }
                                            </select>

                                            {

                                                isFormSubmitted && empObj.deptId == '' && <span className='text-danger'>Field Is Required </span>
                                            }

                                        </div>
                                    </div>
                                    <div className='row mt-1'>
                                        <div className='col-6'>
                                            <label>Password</label>

                                            <input type='text' className='form-control' value={empObj.password} onChange={(e) => { onChangeValue(e, 'password') }} />
                                            {

                                                isFormSubmitted && empObj.password == '' && <span className='text-danger'>Password Is Required </span>
                                            }

                                        </div>
                                        <div className='col-6'>
                                            <label>Role</label>
                                            <select className='form-select' value={empObj.role} onChange={(e) => { onChangeValue(e, 'role') }}>
                                                <option>select role</option>
                                                {
                                                    allRoles.map((item) => {
                                                        return (<option value={item}>{item}</option>)
                                                    })
                                                }


                                            </select>

                                            {

                                                isFormSubmitted && empObj.role == '' && <span className='text-danger'>Role Is Required </span>
                                            }

                                        </div>
                                    </div>
                                    <div className='row mt-2 mb-2'>
                                        <div className='col-6'>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" value='Male' onChange={(event) => { onChangeValue(event, 'gender') }} checked={empObj.gender === 'Male'} />
                                                <label className="form-check-label">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" value='Female' onChange={(event) => { onChangeValue(event, 'gender') }} checked={empObj.gender === 'Female'} />
                                                <label className="form-check-label" >Female</label>
                                            </div>
                                            {

                                                isFormSubmitted && empObj.gender == '' && <span className='text-danger'>Gender Required </span>
                                            }
                                        </div>
                                    </div>
                                    <div className='row mt-2 mb-2'>
                                        <div className='col-2'>

                                            {empObj.employeeId == 0 && <button className='btn btn-success btn-sm' onClick={onSaveEmp}>Save</button>}
                                            {empObj.employeeId !== 0 && <button className='btn btn-warning btn-sm' onClick={onUpdateEmp}>Update</button>}


                                        </div>
                                        <div className='col-2'>
                                            <button className='btn btn-secondary btn-sm' onClick={onResetEmp}>Reset</button>
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

export default Employee;