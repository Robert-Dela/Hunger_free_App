import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/login.module.css'
import { useForm } from "react-hook-form"
import isEmail from "validator/lib/isEmail"
import classNames from 'classnames/bind'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import {API_BASE_URL, API_PORT, Login_endpoint} from '../config'

export default function Login () {

// Classname declaration
const {body, container, form, heading_secondary, form_group,
       form_input, form_label, btn, error,

      } = styles

// URL Endpoint declaration
const url = `${API_BASE_URL}:${API_PORT}/${Login_endpoint}`;

// call the hook

const { 
    register, 
      handleSubmit = async (e) => {
        {e.preventDefault}
  
      }, 
      watch, 
      errors
    } = useForm ();
  
      
  
  //handle form data
      
  const onSubmit = (data = {email, password}) => {
    console.log('data is ', data)
    axios.post(url, {
        email: data.email,
        password: data.password
              
      }).then(resp =>{
  
        // On successful login
  
        if (resp.status == 200) {
  
        //store user logged in credentials
  
          console.log(resp.data)
          window.location.href='/Admin/';
          window.alert('Login Successful')
  
          localStorage.setItem('user', JSON.stringify(resp.data))
        }
        // If Login is not successful, stay on login page
        else{
            
          window.location.href='/login';
          console.log(resp.data)
        }
    
        }).catch(err=>{
          console.log('There was an error', err)
          window.alert('kindly enter valid credentials')
  
        })
        
        console.log(data);
        
  }
      
  
  console.log( watch('email',  'password', ))
  console.log(errors.email, errors.password)
  
  // react router redirect to Dashboard 
  
  const  [redirect] = useState(false);
   
      if (redirect==true) {
        return <Redirect to="/Admin" />
      }
      else{

        // Return login component
    return (
        <>
            <Head>
                <link rel="preload" href="/fonts/Work_Sans/static/WorkSans-Regular.ttf" as="Font" crossOrigin=""/>
                
                <title>Hunger Children</title>
            </Head>

                {/* Login Form  */}

            <body className={body}>
                <div className={container}>
                    <form onSubmit={handleSubmit(onSubmit)} className={form}>
                        <h2 className={heading_secondary}>
                            LOGIN
                        </h2>

                        <div className={form_group}>
                            <label for="email" className={form_label}>Email address</label>
                            <input type="email" 
                                className={classNames(errors.email, form_input)} 
                                placeholder="Email address" 
                                name="email"
                                id="email" 
                                ref={register({ required: true , 
                                    validate: (input) => isEmail (input)
                                  })} /> <br/>
                                {errors.email && <span className={error}>Kindly enter a valid email</span> }

                        </div>

                        <div className={form_group}>
                            <label for="password" className={form_label}>Password</label>
                            <input type="password" 
                                className={classNames(errors.password, form_input)} 
                                placeholder="Password" 
                                name="password"
                                id="password"
                                ref={register({required: true, minLength: 5 //, 
                                    //pattern:/^([a-zA-Z0-9@*#]{8,15})$/})}/>
                                  })}  /> <br/>
                                {errors.password && <span className={error}>Kindly enter a valid password</span> }

                        </div>

                        <div className={form_group}>
                            <button type="submit" className={btn}  value="submit">LOGIN &rarr;</button>
                        </div>
                    </form>
                </div>
            </body>
        </>
    )
}
}
