import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdminTableUsers from '../Components/Admin/AdminTableUsers'
import AdminTablePlantation from '../Components/Admin/AdminTablePlantation'
import styled from 'styled-components'
import axios from 'axios'
import URL from '../Config/baseUrl'
import Styles from '../Config/theme/styles';
import H1 from '../Components/H1';
import colors from '../Config/theme/colors';

const Content = styled.div`
    padding: ${Styles.padding.xl};
`

const AdminPage = () => {
    const [categories, setCategories] = useState();
    const [value, setValue] = useState('1');
    const [update, setUpdate] = useState(false);

    const getData = async () => {
        try {
            await axios.get(`${URL}/categories`)
            .then((res) => setCategories(res.data))
        } catch(error){
            console.error(error);
        }
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        getData();
    }, [update]);
    
    // Check if the events state updated
    useEffect(() => {

    }, [categories]);  

    return (
        <Content>
          <H1 content="Back-Office" />
          <Box sx={{ width: '90%', mx: 'auto'  }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 3, borderColor: `${colors.primary}`, mb:2, pb: 2 }}>
                <TabList onChange={handleChange} aria-label="Interface administrateur" >
                  <Tab label="Utilisateurs" value="1" sx={{color:'black'}} />
                  <Tab label="Fruits/Légumes" value="2" sx={{color:'black'}}/>
                </TabList>
              </Box>
              <TabPanel value="1"><AdminTableUsers setUpdate={setUpdate} update={update}/></TabPanel>
              <TabPanel value="2"><AdminTablePlantation categories={categories} setUpdate={setUpdate} update={update}/></TabPanel>
            </TabContext>
          </Box>
        </Content >
      );

    }

export default AdminPage;