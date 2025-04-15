import React, { useEffect, useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import './App.css';
import * as XLSX from 'xlsx';

function App() {
  const [students, setStudents] = useState([]);
  const hotRef = useRef(null);

  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          const formatted = json.data.map(student => ({
            id: student._id,
            tempRoll: student.tempRoll || '',
            roll: student.roll || '',
            dob: student.dob || '',
            name: student.name || '',
            gender: student.gender || '',
            caste: student.caste || '',
            nationality: student.nationality || '',
            bloodGroup: student.bloodGroup || '',
            address: student.address || '',
            district: student.district || '',
            state: student.state || '',
            pin: student.pin || '',
            phone: student.phone || '',
            email: student.email || '',
            fatherName: student.fatherName || '',
            fatherOccupation: student.fatherOccupation || '',
            fatherDesignation: student.fatherDesignation || '',
            fatherAge: student.fatherAge || '',
            fatherMobile: student.fatherMobile || '',
            motherName: student.motherName || '',
            motherOccupation: student.motherOccupation || '',
            motherDesignation: student.motherDesignation || '',
            motherAge: student.motherAge || '',
            motherMobile: student.motherMobile || '',
            guardianName: student.guardianName || '',
            enrollmentNo: student.enrollmentNo || '',
            stream: student.stream || '',
            examName: student.examName || '',
            examRank: student.examRank || ''
          }));
          setStudents(formatted);
        } else {
          alert('Failed to load data');
        }
      });
  }, []);

  const saveChanges = async () => {
    const updated = hotRef.current.hotInstance.getSourceData();
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const result = await res.json();
      alert(result.success ? '✅ Saved!' : '❌ Save failed');
    } catch (err) {
      console.error(err);
      alert('⚠️ Error saving');
    }
  };

  const addNewStudent = () => {
    const newRow = {
      tempRoll: '',
      roll: '',
      dob: '',
      name: '',
      gender: '',
      caste: '',
      nationality: '',
      bloodGroup: '',
      address: '',
      district: '',
      state: '',
      pin: '',
      phone: '',
      email: '',
      fatherName: '',
      fatherOccupation: '',
      fatherDesignation: '',
      fatherAge: '',
      fatherMobile: '',
      motherName: '',
      motherOccupation: '',
      motherDesignation: '',
      motherAge: '',
      motherMobile: '',
      guardianName: '',
      enrollmentNo: '',
      stream: '',
      examName: '',
      examRank: ''
    };
    setStudents(prev => [...prev, newRow]);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'students.xlsx');
  };

  return (
    <div className="App">
      <div className="sidebar">
        <h3>Techno Admin</h3>
        <button>📄 Student Editor</button>
        <button disabled style={{ opacity: 0.5 }}>📷 Gallery (coming)</button>
        <button disabled style={{ opacity: 0.5 }}>📢 Notices (coming)</button>
      </div>

      <div className="main">
        <div className="toolbar">
          <button onClick={saveChanges}>💾 Save</button>
          <button onClick={addNewStudent}>➕ Add Student</button>
          <button onClick={downloadExcel}>📥 Download Excel</button>
        </div>

        <HotTable
          ref={hotRef}
          data={students}
          colHeaders={[
            'ID',
            'Temp Roll',
            'Roll',
            'DOB',
            'Name',
            'Gender',
            'Caste',
            'Nationality',
            'Blood Group',
            'Address',
            'District',
            'State',
            'Pin',
            'Phone',
            'Email',
            'Father Name',
            'Father Occupation',
            'Father Designation',
            'Father Age',
            'Father Mobile',
            'Mother Name',
            'Mother Occupation',
            'Mother Designation',
            'Mother Age',
            'Mother Mobile',
            'Guardian Name',
            'Enrollment No',
            'Stream',
            'Exam Name',
            'Exam Rank'
          ]}
          columns={[
            { data: 'id', readOnly: true },
            { data: 'tempRoll' },
            { data: 'roll' },
            { data: 'dob' },
            { data: 'name' },
            { data: 'gender' },
            { data: 'caste' },
            { data: 'nationality' },
            { data: 'bloodGroup' },
            { data: 'address' },
            { data: 'district' },
            { data: 'state' },
            { data: 'pin' },
            { data: 'phone' },
            { data: 'email' },
            { data: 'fatherName' },
            { data: 'fatherOccupation' },
            { data: 'fatherDesignation' },
            { data: 'fatherAge' },
            { data: 'fatherMobile' },
            { data: 'motherName' },
            { data: 'motherOccupation' },
            { data: 'motherDesignation' },
            { data: 'motherAge' },
            { data: 'motherMobile' },
            { data: 'guardianName' },
            { data: 'enrollmentNo' },
            { data: 'stream' },
            { data: 'examName' },
            { data: 'examRank' }
          ]}
          rowHeaders={true}
          stretchH="all"
          width="100%"
          height={600}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </div>
  );
}

export default App;
