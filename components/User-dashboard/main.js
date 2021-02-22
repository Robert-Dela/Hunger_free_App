import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/home.module.css'

export default function Main () {


const {body, container, 

      } = styles

    return (
        <>
            <Head>
                <link rel="preload" href="/fonts/Work_Sans/static/WorkSans-Regular.ttf" as="Font" crossOrigin=""/>
                
                <title>Hunger Children</title>
            </Head>

            <body className={body}>
                <div className={container}>
User Page
                </div>
            </body>
        </>
    )
}
