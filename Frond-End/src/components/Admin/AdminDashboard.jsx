import React, { useState, useEffect } from "react";
import "./AdminDashboard.scss"
import { FiSearch, FiEdit } from "react-icons/fi"
import { RiDeleteBinLine } from "react-icons/ri"
import { TbCircleDashed } from "react-icons/tb"
import { TiTick } from "react-icons/ti"
import Axios from "axios"
import 'boxicons'
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = () =>{
            Axios.get("http://localhost:8000/api/admin").then((response) =>{
                setItems(response.data.data);
                console.log(response.data.data)
            });
        }
        fetchItems();
    }, []);
    
    const removeItem = (id)=>{
        console.log(id)
        Axios.delete("http://localhost:8000/api/admin",{
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                item_image: id
            }
        }).then((response) =>{
            window.location.href = "./"
        })
    }

    return (
        <>
            <section className="admin-search">
                <div className="left">
                    <div className="entries">
                        <p>Show</p>
                        <input type="number" value="10" />
                        <p>Entries</p>
                    </div>

                    <div className="search-bar">
                        <FiSearch/>
                        <input type="text" placeholder="Search..."/>
                    </div>
                </div>

                <div className="right" onClick={()=>navigate("/add-items-page")}>
                    <p><b>+</b> Add Items</p>
                </div>
            </section>

            <section className="item-details">
                <table>
                    <tr>
                        <th>Item Name</th>
                        <th>Image</th>
                        <th>Found Location</th>
                        <th>Found By</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    
                    {items
                        ?   items.map((item)=>{
                                const imgPath = `http://localhost:8000/item_image/${item.item_image}`
                                return (
                                    <tr>
                                        <td>{item.item_name}</td>
                                        <td><div className="image"><img src={imgPath} alt="" /></div></td>
                                        <td>{item.found_location}</td>
                                        <td>{item.found_by}</td>
                                        <td>{item.found_date}</td>
                                        <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
                                        <td><span className="claim-status"><box-icon name='loader'></box-icon> Un-Claimed</span></td>
                                        <td><span className="buttons"><FiEdit className="edit-btn"/><RiDeleteBinLine className="delete-btn" onClick={()=>removeItem(item.item_image)}/></span></td>
                                    </tr>
                                )
                            })
                        : null}
                </table>
            </section>
        </>
    )
}

export default AdminDashboard