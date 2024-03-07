import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card'

const CompanyCount = () => {
    const [companyTotalCount,setCount] = useState([])
    const [eighthClassStudents, setEighthClassStudents] = useState([]);
    const [ninthClassStudents, setNinthClassStudents] = useState([]); 

    useEffect(() => {
        let url = 'http://localhost:3005/v1/getCompanyData';
        axios.get(url, {
           
        }).then(response => {
            // console.log(response.data.activecompanyData, "response");
            let stData = response.data.activeData;
            setCount(stData);
            const eighthStudents = stData.filter(student => student.Address === 'hyderabad');
               console.log(eighthStudents)
                const ninthStudents = stData.filter(student => student.Address === 'vijayawada');
                setEighthClassStudents(eighthStudents);
                setNinthClassStudents(ninthStudents);
 
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}, []);
 
    return (
       <div>
        <Card sx={{ 
            width: '20%', 
            // margin : 'auto',
            textAlign: 'center',
            backgroundColor: 'lightblue',
            padding: 2,
            borderRadius: 5,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
             
              <h2>Total companys count:  {companyTotalCount.length}</h2>
          </Card>



<Card sx={{ width: '20%', p: 2, m: 5 }}>
                <h3>Hyderanbad Companys   </h3>
                <h3 style={{ textAlign: 'center' }}>  {eighthClassStudents.length}</h3>
            </Card>
 
            <Card sx={{ width: '20%', p: 2, m: 5 }}>
                <h3> Vijayawada Companys  </h3>
                <h3 style={{ textAlign: 'center' }}>  {ninthClassStudents.length}</h3>
            </Card>

            </div>
    )
}


export default CompanyCount;