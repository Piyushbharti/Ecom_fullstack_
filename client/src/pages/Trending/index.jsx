import React, { useEffect, useRef, useState } from 'react'
import Style from './style.module.scss'
import { getAllProduct } from './apiService'
import { useRouter } from 'next/router'
import { useAppContext } from '@/context/AppContext'
import { getCartDetails } from '../api/serviceAPI'

const Trending = () => {
    const router = useRouter();
    const [allData, setAllData] = useState({});
    const [allCartData, setAllCartData] = useState({});
    const { state, dispatch } = useAppContext();
    const { srpReducer } = state;
    const [selectedProducts, setSelectedProducts] = useState({});
    const [dispatchCount, setDispatchCount] = useState(0);
    const buyButtonRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProduct();
                setAllData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);
    console.log(router.query,'router')
    useEffect(() => {
        // Only dispatch when selectedProducts changes
        if (dispatchCount > 0) {
            const productsArray = Object.values(selectedProducts).map(product => ({
                product: product.title,
                images: product.images,
                price: product.price
            }));
            dispatch({ type: 'HandleCart', payload: productsArray });
            console.log(productsArray, '12345', srpReducer.cartValue);
        }
    }, [selectedProducts, dispatchCount]);

    const buyClickHandle = (e, product) => {
        // dispatch({ type: 'COUNT' });
        e.stopPropagation();

        console.log(product,"prevState")
        setSelectedProducts(prevState => {
            if (prevState[product.id]) {
                return {
                    ...prevState,
                        product: prevState[product.title],
                        price: prevState[product.price],
                        images: prevState[product.images[0]]
                    
                };
            } else {
                return {
                    ...prevState,
                        product: product.title,
                        price: product.price,
                        images: product.images[0]
                };
            }
        });
        console.log(selectedProducts,'piyush')
        setDispatchCount(prevCount => prevCount + 1);
    }
    // const [allData]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCartDetails(selectedProducts);
                console.log("Cart data received:", data);
                dispatch({type: 'COUNT' , payload : data.userData.cart.length})
                setAllCartData(data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchData();
    }, [JSON.stringify(selectedProducts)]);
    
    return (
        <div className={Style.gridContainer}>
            {allData?.products?.map((item, index) => (
                <div key={index} className={Style.gridItem}>
                    <h6>{item.title}</h6>
                    <img className={Style.img} src={item.images[0]} alt={item.title} />
                    {selectedProducts[item.id] ? (
                        <button className={Style.buyButton} onClick={(e) => buyClickHandle(e, item)}>Remove</button>
                    ) : (
                        <button className={Style.buyButton} ref={buyButtonRef} onClick={(e) => {buyClickHandle(e, item)}}>Buy Now</button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Trending;






// const { value, errors, handleSubmit, submitCount, setSubmitting } = formik
// const SignupSchema = Yup.object().shape({
//     firstName: Yup.string()
//         .min(2, 'Too Short!')
//         .max(70, 'Too Long!')
//         .required('Required')
// })

// const formik = useFormik({
//     initialValues : {
//         firstName : '',
//         lastName : '',
//         PhoneNo: '',
//         SocialMediaAccount: ''
//     },
//     validationSchema : SignupSchema
// })
// const handleSubmitForm = () => {
//     return
// }
// const handleChange = (e) => {
//     console.log(e)
//     formik.setFieldValue('firstName', e.target.value)
// }
// console.log(errors,'error')
// return (
//     <form onSubmit={handleSubmitForm}>
//         <label className={Style.label}>Enter Your FirstName</label>
//         <input type='text' id='firstName' name='firstName' value={formik.values.firstName} onChange={handleChange}></input>
//         {errors.firstName && <div>{errors.firstName}</div>}
//         <button className={Style.button} onClick={handleSubmitForm}>Submit</button>
//     </form>
// )




// const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     Email: '',
//     PhoneNumber: ''
// })
// const [formDataDisplay, setFormDataDisplay] = useState({
//     firstName: '',
//     lastName: '',
//     Email: '',
//     PhoneNumber: ''
// })
// const [submitClicked, setSubmitClicked] = useState(false)
// const handleInputChange = (e) => {
//     setFormData({
//         ...formData,
//         [e.target.name]: e.target.value
//     });
//     console.log(formData,'dwd')
// };
// const handleSubmit = (e) => {
//     // e.preventDefault()
//     setFormDataDisplay(formData);
//     console.log(formDataDisplay,'formData')
//     setSubmitClicked(true)
//     setFormData({
//         firstName: '',
//         lastName: '',
//         Email: '',
//         PhoneNumber: ''
//     });
// }
// return (
//     <>
//     {/* <form > */}
//         <label htmlFor="firstName">First Name:</label>
//         <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             className={Style.FirstName}
//             onChange={handleInputChange}
//             />
//         <button className={Style.button} onClick={handleSubmit}>Submit</button>
//     {/* </form> */}
//     {submitClicked && <div>
//         {/* {console.log(formDataDisplay,'he;llll')} */}
//         {formDataDisplay.firstName}
//         </div>}
//     </>
// )