import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Button, Paper } from '@mui/material';
import { useState, useEffect } from 'react';

export default function EmployeeDetails() {
  const paperStyle = { padding: '60px 30px', width: 500, margin: '30px auto' };
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const employee = { employeeName: name, employeeDescription: desc };
    console.log(employee);

    async function saveEmployee(employee) {
      try {
        const response = await fetch('http://localhost:8080/employee/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(employee)
        });
        if (!response.ok) {
          throw new Error('Failed to save employee');
        }
        console.log('Employee saved');
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    }

    saveEmployee(employee);
  };

  useEffect(() => {
    fetch('http://localhost:8080/employee/getall')
      .then((res) => res.json())
      .then((result) => {
        setEmployees(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'Black' }}>
          <u>Add Employee Details</u>
        </h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Employee Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Employee Desc"
            variant="outlined"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button variant="contained" color="success" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>
      <h1>Employees</h1>
      <Paper elevation={3} style={paperStyle}>
        {employees.map((employee) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={employee.employeeId}
          >
            Name: {employee.employeeName}
            <br />
            Desc: {employee.employeeDescription}
            <br />
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
