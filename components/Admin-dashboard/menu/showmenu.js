import axios from 'axios'
import { MdDelete, MdEdit, MdLibraryAdd } from 'react-icons/md'
import {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { API_BASE_URL, API_PORT, Menu_endpoint} from '../../../config'
import styles from '../../../styles/display.module.css'
import MenuModal from '../menu/menumodal'


export default function MenuList(){

    //Css Style ClassNames
    const { table_btn, Table, table_action, btn, add_icon,

    } = styles

    //Enpoints and urls

    const list_menus_url = `${API_BASE_URL}:${API_PORT}/${Menu_endpoint}`

    // Pop up modal
    const [showmodal, setshowmodal] = useState(false);

    const openModal = () => {
        setshowmodal(prev => !prev);
    };

    //  State objects

    const [menus, setMenus] = useState([])

    useEffect(() => {
        getData()
    }, [])

    //function to fetch menus
    const getData = async () => {
        const response = await axios.get(list_menus_url)
        setMenus(response.data)
    }
    

    //function to remove menus from list
    const removeData = (id) => {  

        axios.delete(`${list_menus_url}/${id}`).then(res => {
            const del = menus.filter(menu => id !== menu.id)
            setMenus(del)
        })
    }

    //Header function for menus list

    const renderHeader = () => {
        let headerElement = ['Day', 'Menu', 'Action', 'Add Meal']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    //mapping meal details to table

    const renderBody = () => {
        return menus && menus.map(({ day, meal }) => {
            return (
                <tr key={day}>
                    <td>{day}</td>
                    <td>{meal} </td>
                    <td className={table_action}>
                        <MdDelete className={table_btn} aria-label='Close modal'
                        onClick={() => removeData(id)}/>                        
                    </td>
                    <td>
                        <button className={btn}  id="modalpopup" name="modalpopup" onClick={openModal}>
                            <MdLibraryAdd className={add_icon}/> Add Meal
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
            <div>
                <MenuModal showmodal={showmodal} setshowmodal={setshowmodal} />

            </div>
            <br/>
            <br/>
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


 