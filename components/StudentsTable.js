import React, { useEffect, useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

const StudentsTable = () => {
  const [data, setData] = useState([]);
  const hotTableComponent = useRef(null);

  // Fetch data from the backend API
  const fetchData = async () => {
    try {
      const response = await fetch('/api/students');
      const json = await response.json();
      if (json.success) {
        setData(json.data);
      } else {
        alert('Failed to fetch data.');
      }
    } catch (error) {
      alert('Error connecting to the server.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save changes back to the backend
  const saveChanges = async () => {
    const updatedData = hotTableComponent.current.hotInstance.getSourceData();
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      const json = await response.json();
      if (json.success) {
        alert('Data saved successfully.');
        fetchData(); // Refresh data if needed
      } else {
        alert('Error saving data.');
      }
    } catch (error) {
      alert('Error connecting to the server.');
    }
  };

  return (
    <div>
      <HotTable
        ref={hotTableComponent}
        data={data}
        colHeaders={[
          'ID',
          'Name',
          'Email',
          'Mobile',
          'Address',
          "Father's Name",
          "Father's Phone",
          "Mother's Name",
          "Mother's Phone"
        ]}
        columns={[
          { data: 'id', readOnly: true },
          { data: 'name' },
          { data: 'email' },
          { data: 'mobile' },
          { data: 'address' },
          { data: 'father_name' },
          { data: 'father_phone' },
          { data: 'mother_name' },
          { data: 'mother_phone' }
        ]}
        width="100%"
        height={400}
        licenseKey="non-commercial-and-evaluation"
      />
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
};

export default StudentsTable;
