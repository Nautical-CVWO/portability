import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Container, Typography, Box } from '@mui/material';
import bgm from '../assets/bgm.png'
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { readSkillMeanData } from '../backend/command';
import { PieChart, pieArcClasses } from '@mui/x-charts';
interface Skill {
    name: string;
    value: any[];
  }

const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState<Skill[]>([]);
    useEffect(() => {
        readSkillMeanData()
        .then((data) => {
            // Convert the object into an array of objects
            const skillArray = Object.entries(data).map(([name, value]) => ({
                name,
                value: [{value: value, label: "Yes", color: 'white'}, {value: 100 - (value as number), label: "No", color: '#161616'}], // Explicitly cast 'value' to a number
          }));
          setSkills(skillArray)
        })
        .catch((error) => {
          console.error('Failed to fetch data:', error.message);
        });

    }, [])

    return (
        <Container disableGutters={true} maxWidth={false}  sx={{ backgroundColor: '#161616', maxWith:'100%', width: "100%", height: 'min-content', padding: '0px', margin:'0px'}}>
            <Header />
            <Box sx={{ height: '350px', backgroundImage: `url(${bgm})`, backgroundSize: 'cover',  display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <Box sx={{ backgroundColor: 'white', height:' 10%', flex: 3, alignItems: 'center'}}></Box>
                <Typography variant="h1" sx={{ marginBottom: '15px', flex: 3, fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', justifyContent: 'center', color:'white' }}>
                    Nautical
                </Typography>
                <Box sx={{ backgroundColor: 'white', height:' 10%',alignItems: 'center', flex: 3}}></Box>
            </Box>
            <Box sx={{ padding: '30px', paddingLeft: '60px', height: '200px', display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
                <Typography variant="h4" sx={{ marginBottom: '15px',  fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                    HR Management System
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '15px',fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                Introducing Nautical, the cutting-edge HR solution designed to empower
                 HR teams in the pursuit of nurturing a future-ready workforce. 
                 In an era of constant change and evolving business landscapes,
                  our platform equips organizations with the tools and insights needed to thrive.
                </Typography>
            </Box>

            <Box sx={{ margin: '10px', marginLeft:'40px', marginRight:'40px', backgroundColor: 'white', height:'2px'}}></Box>
            {/* Employment Survey */}
            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ flex: 1, padding: '30px', paddingLeft: '60px', height: '300px', display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
                    <Typography variant="h4" sx={{ marginBottom: '15px',  fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                        Employee Portal
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: '15px',fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                        Do your survey now 
                    </Typography>
                    <Box sx={{ height : '20px'}} />
                    <CustomButton label="Proceed" onClick={() => navigate('/login')}  />
                </Box>
                <Box sx={{ flex: 1, padding: '30px', paddingLeft: '60px', height: '300px', display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
                    <Typography variant="h4" sx={{ marginBottom: '15px',  fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                        Employer Portal
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: '15px',fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                        Do your survey now 
                    </Typography>
                    <Box sx={{ height : '20px'}} />
                    <CustomButton label="Proceed" onClick={() => navigate('/employee_survey')}  />
                </Box>  
            </Box>
            <Box sx={{ margin: '10px', marginBottom: '60px', marginLeft:'40px', marginRight:'40px', backgroundColor: 'white', height:'2px'}}></Box>
            <Typography variant="h4" sx={{padding: '30px', paddingLeft: '60px', marginBottom: '15px',  fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                 Employee's Skill Analysis Summary
            </Typography>
            { skills.length !== 0 ? (
                skills.map((item, index) => {
                    return (<Box sx={{marginBottom : '70px', display: 'flex', paddingRight:'60px', flexDirection: 'row',  justifyContent:'flex-start', alignItems: 'flex-start'}}>
                    <PieChart
                        className="remove-pie-border"
                        legend={{ hidden: true }}
                        series={[
                            {
                            data: item.value,
                            paddingAngle: 4,
                            innerRadius: 30,
                            outerRadius: 101,
                            cornerRadius: 3,
                            startAngle: 0,
                            endAngle: 360,
                            highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30 },
    },
  ]}
  sx={{
    [`& .${pieArcClasses.faded}`]: {
      fill: 'gray',
    },
    stroke: 'none',
    width: '10%'
  }}
  height={200}
  width={200}
                        />
                    <Box sx={{display:'flex', flexDirection:'column', flex: 5,}}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign:'left', fontFamily: 'Montserrat', color: 'white'}}>{item.name.toLocaleUpperCase()}</Typography>
                    <Typography variant="h6" sx={{ textAlign:'left', fontFamily: 'Montserrat', color: 'white'}}>{`${item.name.toUpperCase()} 
                    is an important skill in the company. ${item.value[0].value}% of employees are confident that they are skilled in this area.
                    The skill in question holds a paramount position within our organization's framework, 
                    serving as a foundational pillar for success and growth. As we delve deeper into the 
                    skill's significance, it becomes evident that it not only influences individual performance but also plays a pivotal role in shaping the collective competency of our workforce.
                    `}
                    
                    </Typography>

                    </Box>
                    </Box>)
                })
                    
            ): <Typography>This information is not available yet</Typography>}
        </Container>
    )
}

export default Homepage;