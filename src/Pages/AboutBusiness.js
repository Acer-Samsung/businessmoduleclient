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
            <Box display={"flex"} style={{flexWrap:"wrap",height:"93.5vh"}} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Box style={{margin:"0 auto",width:"750px"}}>
                    <Typography variant={"h4"} ><span style={{fontWeight:"550"}}>CEO: </span>{business?.ceoName}</Typography>
                    <Typography variant={"h4"} ><span style={{fontWeight:"550"}}>Address:</span> {business?.address}</Typography>
                    <Typography variant={"h4"} ><span style={{fontWeight:"550"}}>Business Type: </span> {business?.businessType}</Typography>
                    <Typography variant={"h4"} ><span style={{fontWeight:"550"}}>Created At: </span>{business?.createdAt}</Typography>
                    <Typography variant={"h4"} style={{wordWrap:"break-word"}} > {business.description? <span><span style={{fontWeight:"550"}}>Description: </span> {business.description}</span> : ""}</Typography>
                    <Typography variant={"h4"} >{business.motto? <span><span style={{fontWeight:"550"}}>Motto:</span>{business.motto}</span> : ''}</Typography>
                    <Typography variant={"h4"} ><span style={{fontWeight:"550"}}>Company Name: </span>{business?.name}</Typography>
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