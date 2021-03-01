import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/home.module.css'
import { FaUserCheck, FaHome } from 'react-icons/fa'
import { GiHotMeal, GiMeal } from 'react-icons/gi'
import { MdLibraryAdd } from 'react-icons/md'
import Modal from '../users/modal'
import StudentList from '../users/showusers'


export default function Users () {

// Css style Classnames

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
                {/* Importing fornt Work Sans */}
                <link rel="preload" href="/fonts/Work_Sans/static/WorkSans-Regular.ttf" as="Font" crossOrigin=""/>
                
                <title>HUNGER FREE</title>
            </Head>

            <body className={body}>
                <div className={container}>
                    <div className={dashboard}>

                        {/* This is the dashboard header section */}
                        <section  className={header}>
                            <div className={logo}>
                                HUNGERFREE
                            </div>
                        </section>

                        {/* This is the dashboard side nav section */}
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

                        {/* This is the dashboard main content section */}
                        <section className={main_content}>
                            <div>
                                <h2>Manage Students</h2>
                            </div>

                            <div className={sub_content}>

                                <button className={btn}  id="modalpopup" name="modalpopup" onClick={openModal}>
                                    <MdLibraryAdd className={add_icon}/> Add Student
                                </button>

                                <Modal showmodal={showmodal} setshowmodal={setshowmodal} />
                                <br></br>
                                <br></br>

                                <div className={table}>
                                    <StudentList/>
                                </div>


                            </div>
                        </section>
                    </div>
                </div>
            </body>
        </>
    )
}
