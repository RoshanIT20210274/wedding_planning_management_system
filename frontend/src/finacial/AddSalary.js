import React, {useState} from "react";
import "./AddPayment.css";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import swal from 'sweetalert';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const AddPayment = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    employeeName:"",
    nic:"",
    date:"",
    basicSalary:0,
    festivalAllowance:"",
    specialAllowance:0,
    medicalAllowance:0,
    netSalary:0,
  })

  const [errorState, setErrorState] = useState({ 
    
    employeeName:false,
    nic:false,
    date:false,
    basicSalary:false,
    festivalAllowance:false,
    specialAllowance:false,
    medicalAllowance:false,
    netSalary:false,

  });

  const [submitEnabled, setSubmitEnabled] = useState(true);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setSubmitEnabled(false);

    const errors = Object.keys(state).filter((key) => !state[key]);

    setErrorState({ 
        employeeName:false,
        nic:false,
        date:false,
        basicSalary:false,
        festivalAllowance:false,
        specialAllowance:false,
        medicalAllowance:false,
        netSalary:false,

    });

    if (errors.length) {
      console.log("inside error.length", state, errorState);
      const newErrorSate = {};
      errors.forEach((key) => (newErrorSate[key] = true));
      setErrorState(newErrorSate);
      return;
    }

    //console.log(state);
    try {
      const endpoint = "http://localhost:8070/salary/add";
      const body = JSON.stringify(state);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.status === 200) {
        const responseBody = await response.json();
        swal("Successful!", "Data Recorded!", "success");
        // console.log(responseBody);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="spmain-contain">
      <div className="spcontainer">

        <form>
          <h1 className="sup-title">Employee Salaries</h1>

          <div className="sprow">
            <div className="spcsname">
              <p for="fname">Employee Name</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["customerName"]} 
              id="standard-basic" 
              label="Customer" 
              name="employeeName" 
              onChange={handleChange} />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Employee NIC</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["contactNumber"]} 
              id="standard-basic" 
              label="Contact Number" 
              name="nic" 
              onChange={handleChange} />
            </div>
          </div>


          <div className="sprow">
            <div className="spcsname">
             <p> Date</p>
            </div>
          <div style={{ width: 600, marginLeft:600, marginTop:-20}}>
          <TextField 
               type="date"
               error={errorState["firstInstallment"]} 
               id="standard-basic" 
               name="date" 
               onChange={handleChange} 
               >

               </TextField>
          </div>  
         </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Basic Salary</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["totalAmount"]} 
              id="standard-basic" label="LKR" 
              name="basicSalary" 
              onChange={handleChange} 
              type="number" />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Festival Allowance</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["firstInstallment"]} 
              id="standard-basic" label="LKR" 
              name="festivalAllowance" 
              onChange={handleChange} 
              type="number" />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Special Allowance</p>
            </div>
            <div className="spcsans">
              <TextField 
              
              error={errorState["secondInstallment"]} 
              id="standard-basic" label="LKR" 
              name="specialAllowance" 
              onChange={handleChange} 
              
              />

            </div>
          </div>
         
          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Medical Allowance</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["amountReceived"]} 
              id="standard-basic" 
              label="LKR" 
              name="medicalAllowance" 
              onChange={handleChange} type="number" />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Net Salary</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["amountDue"]} 
              id="standard-basic" 
              label="LKR" 
              name="netSalary" 
              onChange={handleChange} 
              type="number" />
            </div>
          </div>

          <div style={{ width: "10%", marginLeft: 500, marginTop: 10 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}
            //  disabled={!submitEnabled}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;