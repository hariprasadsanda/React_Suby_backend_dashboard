import React ,{useState}from 'react'
import { use } from 'react'
import { API_URL } from '../Helpers/api';

const AddProducts = () => {
  const[productName,setProductName]=useState("")
  const[price,setPrice]=useState("")
  const [category, setCategory] = useState([])
  const[bestseller,setBestseller]= useState(false)
  const[description,setDescription]=useState("")
  const[image,setImage]=useState(null)

  const imageUploadHandler = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  }

  const categoryChangeHandler = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const bestsellerHandler =(event)=>{
    
    const value = event.target.value ==='true';
    setBestseller(value)

  }

  const addProductHandler= async(e)=>{
    e.preventDefault()

    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId= localStorage.getItem('firmId');
      if(!firmId){
        console.error("User Not Authenitacted")
      }
      const formData = new FormData();

      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('deccription', description);
      formData.append('image', image);

      category.forEach((value) => {
        formData.append('category', value);
      });
    const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
      method:'POST',
      body:formData
    })
    const data = await response.json()

    if(response.ok){
      alert("product added successfully"
      )
    }

    } catch (error) {
      console.error(error)
      alert("failred to add products")
      
    }

  }
  return (
    <div>
        <form className='addproductSection' onSubmit={addProductHandler}>
      <h2>Add Product</h2>
      <div className="input-group">
        <label htmlFor="productName">Product Name:</label><br/>
        <input type="text"
         id="productName"
          name="productName" 
          value={productName} 
         onChange={(e) => setProductName(e.target.value)}
         required />
      </div>
      <div className="input-group">
        <label htmlFor="price">Price:</label><br/>
        <input type="number"
         id="price"
          name="price"
           value={price}
           onChange={(e) => setPrice(e.target.value)}
           required />
      </div>
      <div className="input-group">
        <label htmlFor="bestseller">Best Seller:</label><br/>
        <label htmlFor="bestseller">Yes:</label>
        <input type="radio" name="bestseller" value="true" checked={bestseller === true} onChange={bestsellerHandler}/><br/>
        <label htmlFor="bestseller">NO:</label>
        <input type="radio" name="bestseller" value="false" checked={bestseller === false}  onChange={bestsellerHandler} />
      </div>
      <div className="input-group">
        <label htmlFor="description">Description:</label><br/>
        <textarea id="description" name="description" rows="4" onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div>
          <label>Category:</label><br />
          <label>
            <input
              type="checkbox"
              id="veg"
              name="category"
              value="veg"
              checked={category.includes('veg')}
              onChange={categoryChangeHandler}
            />
            Veg
          </label>
          <label>
            <input
              type="checkbox"
              id="non-veg"
              name="category"
              value="non-veg"
              checked={category.includes('non-veg')}
              onChange={categoryChangeHandler}
            />
            Non-Veg
          </label>
        </div>
      <div className="input-group">
        <label htmlFor="productImage">Product Image:</label><br/>
        <input type="file" id="productImage" name="productImage" onChange={imageUploadHandler} required />
      </div>
      <button type="submit" className='buttonSection'>Add Product</button>
    </form>
    </div>
  )
}

export default AddProducts
