// showImage.src = ;
import React, { useState } from "react";
import "./AddItems.scss"
import FormData from "form-data"
import Axios from "axios";
import { useNavigate } from "react-router-dom";
// import TextField from '@material-ui/core/TextField';
// import DatePicker from 'react-date-picker';

const AddItems = () => {
    const navigate = useNavigate()

    const [itemName, setItemName] = useState('');
    const [additionDate, setAdditionDate] = useState('');
    const [foundLocation, setFoundLocation] = useState('');
    const [foundBy, setFoundBy] = useState('');
    const [otherName, setOtherName] = useState('');
    const [file, setFile] = useState(null);
    const [path, setPath] = useState(null);

    const handleFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setPath(e.target.files[0])
        document.querySelector(".text").style.display = "none";
    }
    // ``
    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const formData = new FormData();
        formData.append('item_name', itemName);
        formData.append('found_date', additionDate);
        formData.append('found_location', foundLocation);
        formData.append('found_by', foundBy);
        formData.append('item_image',  path);
        console.log(itemName)
        const response = await Axios.post('http://localhost:8000/api/admin/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

        if(response.data.success == 1){
            navigate('/')
            alert('Successfully Added')
            console.log("Name :", otherName)
        }

        // Handle the response
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };
    return (
            <section className="add-item-form">
                <h1>Add New Lost Item</h1>
                <form action="" onSubmit={(e)=>handleSubmit(e)} method="POST" encType="multipart/form-data">
                    <div className="item-name">
                        <label for="item-name">Item Name<span>*</span></label><br />
                        <input type="text" id="item-name" name="item_name" onChange={(e)=>{setItemName(e.target.value)}} required />
                    </div>

                    <div className="found-location">
                        <label for="found-location">Found Location<span>*</span></label><br />
                        <input type="text" id="found-location" name="found_location" onChange={(e)=>{setFoundLocation(e.target.value)}} required />
                    </div>

                    <div className="found-by">
                        <label for="">Found By<span>*</span></label><br />
                        <div className="options">
                            <span>
                                <input type="radio" id="didi1" name="found_by" value="didi1" onClick={(e)=>{setFoundBy(e.target.value)}} checked="true"/>
                                <label for="didi1">Didi 1</label>
                            </span>

                            <span>
                                <input type="radio" id="didi2" name="found_by" value="didi2" onClick={(e)=>{setFoundBy(e.target.value)}}/>
                                <label for="didi2">Didi 2</label>
                            </span>

                            <span>
                                <input type="radio" id="didi3" name="found_by" value="didi3" onClick={(e)=>{setFoundBy(e.target.value)}}/>
                                <label for="didi3">Didi 3</label>
                            </span>

                            <span>
                                <input type="radio" id="didi4" name="found_by" value="didi4" onClick={(e)=>{setFoundBy(e.target.value)}}/>
                                <label for="didi4">Didi 4</label>
                            </span>

                            <span className="other">
                                <input type="radio" id="other" name="found_by" onClick={(e)=>{setFoundBy(otherName)}}/>
                                <label for="other">Other: <input type="text" name="other_value" onChange={(e)=>setOtherName(e.target.value)}/></label>
                            </span>
                        </div>
                    </div>

                    <div className="found-date">
                        <label for="found-date">Found Date<span>*</span></label><br />
                        <input type="date" id="found-date" name="date" onChange={(e)=>{setAdditionDate(e.target.value)}} required />
                    </div>

                    <div className="image">
                        <label for="item-image">Upload Image<span>*</span></label><br />
                        <label for="item-image">
                            <div className="img-upload-section">
                                <div className="text">Drag and Drop or &nbsp;<span>Browse</span></div>
                                {file? <img src={file? file : ""} classname="showImage" alt="Hello Nepal" width="100%"/>:""}
                            </div>
                        </label>
                        <input type="file" id="item-image" name="item_image" onChange={(e)=>{
                            handleFile(e)
                        }} required />
                    </div>

                    <div className="buttons">
                        <button><span>X</span> Cancel</button>
                        <button type="submit"><span>+&nbsp;&nbsp;</span>Add New Item</button>
                    </div>
                </form>
            </section>
    )
}

export default AddItems