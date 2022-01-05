import React,{useState} from 'react'

function UploadProduct() {

  const [product, setProduct] = useState({
    name: "",
    shop: "",
    description: "",
    category:""
  });
  
 const [price1000, setPrice1000] = useState('');
 const [price750, setPrice750] = useState('');
 const [price350,setPrice350] = useState('');
 const [price180,setPrice180] = useState('');


  const { name, shop, description,category } = product;
  
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");


//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//     const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/createProduct`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': localStorage.getItem('token')
//             },
//        body: JSON.stringify({name:detail.name,shop:detail.shop,description:detail.description,category:detail.category, })
//       });
//       const json = await response.json();
//     //console.log(json)
// }
  

const handleSubmit =async (e) => {
  e.preventDefault();
    
    let price={
      price1000ml:price1000,
      price750ml:price750,
      price350ml:price350,
      price180ml:price180
    }

      const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/createProduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
              },
         body: JSON.stringify({name:name,shop:shop,description:description,category:category,image:image ,price:price})
        });
        const json = await response.json();
      console.log(json)


  // const myForm = new FormData();

  //  myForm.set("name", name);
  //  myForm.set("shop", shop);
  //  myForm.set("description", description);
  //  myForm.set("image",image);
  //  console.log(myForm)
 // dispatch(register(myForm));
};


const onChange = (e) => {
  if (e.target.name === "image") {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  } else {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
};


return (
    <div>
      <div className="container my-5" style={{position:"relative",top:'100px'}}>
        <h1> Upload Product</h1>
        <div>
<form  onSubmit={handleSubmit}>
  <div class="form-group">
    <input type="text" class="form-control" id="shop" name="shop" value={shop} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Shop Name"/>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="name" name="name"  value={name}  onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Product Name"/>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="price1000" name="price1000" value={price1000} onChange={(e)=>{setPrice1000(e.target.value)}}  aria-describedby="emailHelp" placeholder="Enter Product Price for 1000ml ₹"/>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="price750" name="price750" value={price750} onChange={(e)=>{setPrice750(e.target.value)}}  aria-describedby="emailHelp" placeholder="Enter Product Price for 750ml ₹"/>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="price350" name="price350" value={price350} onChange={(e)=>{setPrice350(e.target.value)}}  aria-describedby="emailHelp" placeholder="Enter Product Price  for 350ml ₹"/>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="price180" name="price180" value={price180} onChange={(e)=>{setPrice180(e.target.value)}}  aria-describedby="emailHelp" placeholder="Enter Product Price  for 180ml ₹"/>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="description" name="description" value={description} onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter Product Description"/>
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="category" name="category" value={category} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Product Category"/>
    </div>
    <div id="productImage">
                  <img src={imagePreview} alt="Product Preview" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={onChange}
                  />
                </div>
  <button type="submit" class="btn btn-primary">Submit</button>

          </form>
        </div>
        
      </div>
    </div>
  )
}

export default UploadProduct

