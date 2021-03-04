import axios from 'axios'
import {Form } from 'reactstrap'
import { MdClose } from 'react-icons/md'
import { useForm } from "react-hook-form"
import "bootstrap/dist/css/bootstrap.min.css"
import { API_BASE_URL, API_PORT, Meal_endpoint} from '../../../config'
import styles from '../../../styles/modal.module.css'
import { useSpring, animated } from 'react-spring'
import {useRef, useEffect, useCallback} from 'react'



export default function MealModal({ showmodal, setshowmodal }){

  //Enpoints and urls

  const add_meal_url = `${API_BASE_URL}:${API_PORT}/${Meal_endpoint}`;

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
  const onSubmit = (data = {mealname, price, protein}) => {
    

    console.log('data is ', data)
    axios.post( add_meal_url, 

        {
          name: data.mealname,
          price: data.price,
          protein: data.protein
          
          
      }
      
          
      )
.then(resp =>{

      // On successful addition of student 
      console.log(resp)
      
      if (resp.status == 201 || 200) {

        //store added Student details

        localStorage.setItem('meal', resp.data)
        console.log(resp.data)
        window.alert('Meal added successfully')
        window.location.reload()
          
      }
      else{
        console.log(resp.data)
      }

      }).catch(err=>{
        console.log('Failed to add Meal', err)
        window.alert('Failed to add Meal')
        window.location.reload()


      })
      console.log(data);
      
  }
  console.log( watch('mealname'))

    return(
        <>
            {showmodal ? (
                <div onClick={closeModal} ref={modalRef}>   
                    <animated.div style={animation}>
                        <div className={modal_wrapper} showmodal={showmodal}>
                            <div className={modal_header}>
                                <h5>Add Meal</h5>
                                
                            </div>
                            
                            <div className={form}>
                              <Form onSubmit={handleSubmit(onSubmit)}>

                                <div className={form_group}>
                                  {/* <label for="fname" className={form_label}>First Name</label> */}
                                  <input type="text" 
                                    className={form_input} 
                                    placeholder="Meal Name" 
                                    name="mealname"
                                    id="mealname" 
                                    ref={register({ required: true, minLength:3 })} /> 

                                </div>

                                <div className={form_group}>
                                  {/* <label for="lname" className={form_label}>Last Name</label> */}
                                  <input type="number" 
                                    className={form_input} 
                                    placeholder="Price" 
                                    name="price"
                                    id="price" 
                                    ref={register({ required: true, min: 3, max: 100 })} /> 

                                </div>

                                <div className={form_group}>
                                  {/* <label for="fname" className={form_label}>First Name</label> */}
                                  <input type="text" 
                                    className={form_input} 
                                    placeholder="Protein Source" 
                                    name="protein"
                                    id="protein" 
                                    ref={register({ required: true, minLength:3 })} /> 

                                </div>

                                <div className={form_group}>
                                    <button type="submit" className={btn}  id="addmeal"  value="submit" name="addmeal" >
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

 