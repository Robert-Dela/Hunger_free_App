import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/home.module.css'
import MealModal from '../meals/mealmodal'
import { FaUserCheck, FaHome } from 'react-icons/fa'
import { GiHotMeal, GiMeal } from 'react-icons/gi'
import { MdLibraryAdd } from 'react-icons/md'
import MealList from '../meals/showmeal'

export default function Meals () {


const { body, container, dashboard, side_nav, logo, main_content, 
        header, navigation_list, navigation_item, navigation_icon,
        sub_content, btn, add_icon, table,
        
      } = styles

// Pop up modal
const [showmodal, setshowmodal] = useState(false);

const openModal = () => {
    setshowmodal(prev => !prev);
};

    return (
        <>
            <Head>
                <link rel="preload" href="/fonts/Work_Sans/static/WorkSans-Regular.ttf" as="Font" crossOrigin=""/>
                
                <title>HUNGER FREE</title>
            </Head>

            <body className={body}>
                <div className={container}>
                    <div className={dashboard}>
                        <section  className={header}>
                            <div className={logo}>
                                HUNGERFREE
                            </div>
                        </section>

                        <section className={side_nav}>
                            <div>
                                <ul className={navigation_list}>
                                    
                                    <Link href="/Admin">
                                    <li className={navigation_item}>
                                        <FaHome className={navigation_icon}/> Dashboard
                                    </li>
                                    </Link>

                                    <Link href="/Admin/users">
                                    <li className={navigation_item}>
                                        <FaUserCheck className={navigation_icon}/> Students
                                    </li>
                                    </Link>

                                    <Link href="/Admin/meals">
                                    <li className={navigation_item}>
                                        <GiHotMeal className={navigation_icon}/> Meals
                                    </li>
                                    </Link>

                                    <Link href="/Admin/menu">
                                    <li className={navigation_item}>
                                        <GiMeal className={navigation_icon}/> Menu
                                    </li>
                                    </Link>
                                </ul>
                            </div>

                        </section>

                        <section className={main_content}>
                            <div>
                                <h2>Manage Meals</h2>
                            </div>

                            <div className={sub_content}>
                                <button className={btn}  id="modalpopup" name="modalpopup" onClick={openModal}>
                                    <MdLibraryAdd className={add_icon}/> Add Meal
                                </button>

                                <MealModal showmodal={showmodal} setshowmodal={setshowmodal} />
                                <br></br>
                                <br></br>

                                <div className={table}>
                                    <MealList/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </body>
        </>
    )
}
