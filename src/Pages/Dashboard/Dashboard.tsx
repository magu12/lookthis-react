import { Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { Posts } from '../../Components/Posts/Posts';
import { Users } from '../../Components/Users/Users';
import './Dashboard.scss';

export const Dashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className="dashboard">
      <div className="wrap">
        <div className="tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab
              label="Authors"
              className="tab"
            />
            <Tab
              label="Articles"
              className="tab"
            />
          </Tabs>
        </div>
      </div>
      {value === 0 && <Users />}
      {value === 1 && <Posts />}
    </main>
  );
};