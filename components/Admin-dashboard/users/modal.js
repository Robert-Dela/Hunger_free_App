import axios from 'axios'
import {Form } from 'reactstrap'
import { MdClose } from 'react-icons/md'
import { useForm } from "react-hook-form"
import "bootstrap/dist/css/bootstrap.min.css"
import { API_BASE_URL, API_PORT, AddStudent_endpoint} from '../../../config'
import styles from '../../../styles/modal.module.css'
import { useSpring, animated } from 'react-spring'
import {useRef, useEffect, useCallback} from 'react'
import isEmail from "validator/lib/isEmail"



export default function Modal({ showmodal, setshowmodal }){

  //Enpoints and urls

  const add_student_url = `${API_BASE_URL}:${API_PORT}/${AddStudent_endpoint}`;

  //handling student data 
  const { register,
          handleSubmit,
          watch, 
        } = useForm ();

  // Css Styling classnames
  const {
          modal_wrapper, closeModalButton, form_group, form_input,
          modal_header, form, form_label, btn,


  } = styles;

  // Pop up modal function
  const modalRef = useRef();

  const animation = useSpring({
      config: {
      duration: 250
      },
      opacity: showmodal ? 1 : 0,
      transform: showmodal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
      if (modalRef.current === e.target) {
        setshowmodal(false);
      }
  };
    
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showmodal) {
        setshowmodal(false);
          console.log('I pressed');
        }
    },
      [setshowmodal, showmodal]
  );
    
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  },
    [keyPress]
  );


  //function for adding new student 
  const onSubmit = (data = {fname, lname, email, age, Class}) => {
    
    // const userdata = JSON.parse(localStorage.getItem("user"));
    // console.log(userdata)
    //   if(userdata) {
    //     // const foundUser = JSON(userdata)
    //     created_by(userdata.email)
    //     console.log('user adding new student')
    //   }

    console.log('data is ', data)
    axios.post( add_student_url, 

        {
          firstname: data.fname,
          lastname: data.lname,
          email: data.email,
          age: data.age,
          Class: data.Class
          
      }
      
          
      )
.then(resp =>{

      // On successful addition of student 
      console.log(resp)
      
      if (resp.status == 201 || 200) {

        //store added Student details

        localStorage.setItem('student', resp.data)
        console.log(resp.data)
        window.alert('Student added successfully')
        window.location.reload()
          
      }
      else{
        console.log(resp.data)
      }

      }).catch(err=>{
        console.log('Failed to add student', err)
        window.alert('Failed to add student')
        window.location.reload()


      })
      console.log(data);
      
  }
  console.log( watch('email'))

    return(
        <>
            {showmodal ? (
                <div onClick={closeModal} ref={modalRef}>   
                    <animated.div style={animation}>
                        <div className={modal_wrapper} showmodal={showmodal}>
                            <div className={modal_header}>
                                <h5>Add Student</h5>
                                
                            </div>
                            
                            <div className={form}>
                              <Form onSubmit={handleSubmit(onSubmit)}>

                                <div className={form_group}>
                                  {/* <label for="fname" className={form_label}>First Name</label> */}
                                  <input type="text" 
                                    className={form_input} 
                                    placeholder="First Name" 
                                    name="fname"
                                    id="fname" 
                                    ref={register({ required: true, minLength:3 })} /> 

                                </div>

                                <div className={form_group}>
                                  {/* <label for="lname" className={form_label}>Last Name</label> */}
                                  <input type="text" 
                                    className={form_input} 
                                    placeholder="Last Name" 
                                    name="lname"
                                    id="lname" 
                                    ref={register({ required: true, minLength:3 })} /> 

                                </div>

                                <div className={form_group}>
                                  {/* <label for="email" className={form_label}>Email address</label> */}
                                  <input type="email" 
                                    className={form_input} 
                                    placeholder="Email address" 
                                    name="email"
                                    id="email" 
                                    ref={register({ required: true , 
                                        validate: (input) => isEmail (input)
                                      })} /> 

                                </div>

                                <div className={form_group}>
                                  {/* <label for="age" className={form_label}>Age</label> */}
                                  <input type="number" 
                                    className={form_input} 
                                    placeholder="Age" 
                                    name="age"
                                    id="age" 
                                    ref={ register({ required: true , 
                                          min: 1, max: 100
                                    })} /> 

                                </div>

                                <div className={form_group}>
                                      <label for="Class" className={form_label}>Class</label>                                    
                                      <select id="Class" name="Class" className={form_input} 

                                        ref={register({ required: true})}>
                                        <option value="Class 1">Class 1</option>
                                        <option value="Class 2">Class 2</option>
                                        <option value="Class 3">Class 3</option>
                                        <option value="Class 4">Class 4</option>
                                        <option value="Class 5">Class 5</option>
                                        <option value="Class 6">Class 6</option>
                                        <option value="Form 1">Form 1</option>
                                        <option value="Form 2">Form 2</option>
                                        <option value="Form 3">Form 3</option>

                                    </select>
                                </div>

                                <div className={form_group}>
                                    <button type="submit" className={btn}  id="addstudent"  value="submit" name="addstudent" >
                                        Submit
                                    </button>
                                </div>

                              </Form>       
                            </div>                       
                            
                            <MdClose className={closeModalButton}
                                aria-label='Close modal'
                                onClick={() => setshowmodal(prev => !prev)}
                            />
                        </div>

                    </animated.div>
                </div>
            ) : null}
       
        </>

    );

}

 