import axios from 'axios'
import { MdDelete, MdEdit } from 'react-icons/md'
import {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { API_BASE_URL, API_PORT, AddStudent_endpoint} from '../../../config'
import styles from '../../../styles/display.module.css'


export default function StudentList(){

    //Css Style ClassNames
    const { table_btn, Table, table_action,

    } = styles

    //Enpoints and urls

    const list_students_url = `${API_BASE_URL}:${API_PORT}/${AddStudent_endpoint}`
    // const list_students_url = 'https://jsonplaceholder.typicode.com/users'



    //  State objects

    const [students, setStudents] = useState([])

    useEffect(() => {
        getData()
    }, [])

    //function to fetch students
    const getData = async () => {
        const response = await axios.get(list_students_url)
        setStudents(response.data)
    }
    

    //function to remove students from list
    const removeData = (id) => {  

        axios.delete(`${list_students_url}/${id}`).then(res => {
            const del = students.filter(student => id !== student.id)
            setStudents(del)
        })
    }

    //Header function for student list

    const renderHeader = () => {
        let headerElement = ['Id', 'Name', 'Email', 'Age', 'Class', 'Action']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    //mapping student details to table

    const renderBody = () => {
        return students && students.map(({ id, firstname, lastname, email, age, Class }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstname} {} {lastname}</td>
                    <td>{email}</td>
                    <td>{age}</td>
                    <td>{Class}</td>
                    <td className={table_action}>
                        <MdEdit className={table_btn}/>

                        <MdDelete className={table_btn} aria-label='Close modal'
                        onClick={() => removeData(id)}/>                        
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
            <table className={Table}>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>

        </>

    );

}


 