import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import Navbar from "../Components/Navbar";
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AboutBusiness = (props) => {
    let pathname = props.location.pathname;
    let businessId = pathname.toString().match(/\d+/)[0];

    const [business,setBusiness] = useState({});
    const [employeeList,setEmployeeList] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBusinessInfo = () => {
      axios.get(`${API_PATH}/api/v1/businesses/${businessId}/more`)
          .then((res)=>{
              console.log(res)
              setBusiness(res.data.body.business)
              setEmployeeList(res.data.body.employeeList)
          })
          .catch((err)=>{
              console.log(err)
          })
          .finally(()=>{
              
          })
    }
    
    useEffect(()=>{
        getBusinessInfo();
    },[])

    return (
        <div>
            <Navbar/>
            <Box display={"flex"} style={{flexWrap:"wrap"}} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Box>
                    <Typography variant={"h4"} >CEO: {business?.ceoName}</Typography>
                    <Typography variant={"h4"} >Address: {business?.address}</Typography>
                    <Typography variant={"h4"} >Business Type: {business?.businessType}</Typography>
                    <Typography variant={"h4"} >Created At: {business?.createdAt}</Typography>
                    <Typography variant={"h4"} >{business.description? `Description: ${business.description}` : ""}</Typography>
                    <Typography variant={"h4"} >{business.motto? `Motto: ${business.motto}` : ""}</Typography>
                    <Typography variant={"h4"} >Company Name: {business?.name}</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"column",textAlign:'center',margin:"20px 0 0 0 "}} width={"40%"}>
                    <Typography variant={"h4"} style={{marginBottom:"10px"}}>Employees: </Typography>
                    {
                        employeeList ? employeeList.map((item,i)=>(
                            <Box style={{border:"1px solid black",padding:"10px",margin:"5px 0"}}>
                                <Typography>{item.firstName} {item.lastName} {item.birthDate}</Typography>
                            </Box>

                        )) : ""
                    }
                </Box>

                <Button style={{marginTop:"10px"}} variant={"outlined"} ><Link to={"/businesses"} style={{textDecoration:"none",color:"blue"}}>Back</Link></Button>

            </Box>



        </div>
    );
};

export default AboutBusiness;