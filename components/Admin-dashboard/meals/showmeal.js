import axios from 'axios'
import { MdDelete, MdEdit } from 'react-icons/md'
import {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { API_BASE_URL, API_PORT, Meal_endpoint} from '../../../config'
import styles from '../../../styles/display.module.css'


export default function MealList(){

    //Css Style ClassNames
    const { table_btn, Table, table_action,

    } = styles

    //Enpoints and urls

    const list_meals_url = `${API_BASE_URL}:${API_PORT}/${Meal_endpoint}`
    // const list_students_url = 'https://jsonplaceholder.typicode.com/users'



    //  State objects

    const [meals, setMeals] = useState([])

    useEffect(() => {
        getData()
    }, [])

    //function to fetch meals
    const getData = async () => {
        const response = await axios.get(list_meals_url)
        setMeals(response.data)
    }
    

    //function to remove meals from list
    const removeData = (id) => {  

        axios.delete(`${list_meals_url}/${id}`).then(res => {
            const del = meals.filter(meal => id !== meal.id)
            setMeals(del)
        })
    }

    //Header function for meals list

    const renderHeader = () => {
        let headerElement = ['Id', 'Name','Protein Source', 'Price', 'Action']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    //mapping student details to table

    const renderBody = () => {
        return meals && meals.map(({ id, name, protein, price }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name} </td>
                    <td>{protein} </td>
                    <td>{price}</td>
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


 