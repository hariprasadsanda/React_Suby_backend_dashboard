import React, { useState } from 'react';
import { API_URL } from '../Helpers/api';

const Addfirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [image, setImage] = useState(null);

  const imageUploadHandler = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const categoryChangeHandler = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const regionChangeHandler = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const firmSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        alert('User not registered, please register');
        return;
      }

      const formData = new FormData();

      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('firmImage', image);

      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          token: loginToken,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("")
        setArea("")
        setOffer("")
        setCategory([])
        setRegion([])
        setImage([])
        alert('Firm added successfully');
      } 
      else if(data.message ==="vendor can have only one firm"){
        alert("Firm exists, Only 1 firm can be added")
      } 
      else {
        console.error('Error:', data);
        alert(`Error: ${data.message || 'Failed to add firm'}`);
      }
      const firmId =data.FirmId
      localStorage.setItem('firmId',firmId)
     
    } 
    
    catch (error) {
      console.error('Failed to add firm', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <form className="addfirmSection" onSubmit={firmSubmitHandler}>
        <h2>Add Firm</h2>

        <div className="input-group">
          <label htmlFor="firmName">Firm Name:</label><br />
          <input
            type="text"
            id="firmName"
            name="firmName"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="area">Area:</label><br />
          <input
            type="text"
            id="area"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
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

        <div>
          <label>Region:</label><br />
          <label>
            <input
              type="checkbox"
              id="north-indian"
              name="region"
              value="north-indian"
              checked={region.includes('north-indian')}
              onChange={regionChangeHandler}
            />
            North Indian
          </label>
          <label>
            <input
              type="checkbox"
              id="south-indian"
              name="region"
              value="south-indian"
              checked={region.includes('south-indian')}
              onChange={regionChangeHandler}
            />
            South Indian
          </label>
          <label>
            <input
              type="checkbox"
              id="chinese"
              name="region"
              value="chinese"
              checked={region.includes('chinese')}
              onChange={regionChangeHandler}
            />
            Chinese
          </label>
          <label>
            <input
              type="checkbox"
              id="bakery"
              name="region"
              value="bakery"
              checked={region.includes('bakery')}
              onChange={regionChangeHandler}
            />
            Bakery
          </label>
        </div>

        <div className="input-group">
          <label htmlFor="offer">Offer:</label><br />
          <input
            type="text"
            id="offer"
            name="offer"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="firmImage">Firm Image:</label><br />
          <input
            type="file"
            id="firmImage"
            name="firmImage"
            onChange={imageUploadHandler}
            required
          />
        </div>

        <button type="submit">Add Firm</button>
      </form>
    </div>
  );
};

export default Addfirm;
