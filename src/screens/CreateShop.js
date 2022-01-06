import React, { useState } from 'react'

function CreateShop() {
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [shop, setShop] = useState({
        title: "",
        type: "Point",
        longitude:0,
        latitude: 0
    });

    const handleSubmit =async (e) => {
        e.preventDefault();
        let lat = Number(shop.latitude)
        let long = Number(shop.longitude);
        let location = {
            type:shop.type,
            coordinates:[
                lat,
                long
            ]
        }
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/shops/enterShop`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
                },
           body: JSON.stringify({title:shop.title,location,image:image})
          });
          const json = await response.json();
        console.log(json)
    }

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
            setShop({ ...shop, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="container" style={{ position: 'relative', top: "120px" }}>
            <form onSubmit={handleSubmit}>

                <div class="form-group">
                <label for="title">Shop Name</label>
                    <input type="text" class="form-control" id="title" name="title" value={shop.title} onChange={onChange} placeholder="Enter Shop Name" />
                </div>
                <div class="form-group">
                <label for="type">Type </label>
                    <input type="text" class="form-control" id="type" name="type" value={shop.type}  placeholder="Enter Shop Name" />
                </div>
                
                <div class="form-group">
                <label for="longitude">Longitude </label>
                    <input type="number" class="form-control" id="longitude" name="longitude" value={shop.longitude} onChange={onChange}  placeholder="Enter Shop longitude" />
                </div>

                <div class="form-group">
                <label for="longitude">Latitude </label>
                    <input type="number" class="form-control" id="latitude" name="latitude" value={shop.latitude} onChange={onChange}  placeholder="Enter Shop longitude" />
                </div>

                <div class="form-group">
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
                </div>
            </form>
        </div>
    )
}

export default CreateShop
