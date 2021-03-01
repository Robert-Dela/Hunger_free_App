import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/main.module.css'

export default function Main () {


const { body, container, content, content_header, logo, btn,
        content_body,

      } = styles

    return (
        <>
            <Head>
                <link rel="preload" href="/fonts/Work_Sans/static/WorkSans-Regular.ttf" as="Font" crossOrigin=""/>
                
                <title>HUNGER FREE</title>
            </Head>

            <body className={body}>
                <div className={container}>
                    <div className={content}>
                        <section className={content_header}>
                            <div className={logo}>
                                HUNGERFREE
                            </div>
                            <h2>ORDER ALL OF YOUR MEALS RIGHT HERE</h2>
                            <button type="submit" className={btn}  value="submit">Show Meal Orders</button> 
                                                       
                        </section>

                        <section className={content_body}>
                        
                            <h2>MONDAY</h2>
                            <h2>TUESDAY</h2>
                            <h2>WEDNESDAY</h2>
                            <h2>THURSDAY</h2>
                            <h2>FRIDAY</h2>

                        </section>
                    </div>
                </div>
            </body>
        </>
    )
}
