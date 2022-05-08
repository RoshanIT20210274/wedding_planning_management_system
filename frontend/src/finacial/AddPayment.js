
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
    customerName:"",
    contactNumber:"",
    paymentId:uuidv4(),
    // paymentDate:"",
    totalAmount:0,
    firstInstallment:0,
    firstInstallmentDate:"",
    secondInstallment:0,
    secondInstallmentDate:0,
    amountReceived:0,
    amountDue:0,
  })

  const [errorState, setErrorState] = useState({ 
    
    customerName:false,
    contactNumber:false,
    paymentId:false,
    // paymentDate:false,
    totalAmount:false,
    firstInstallment:false,
    firstInstallmentDate:false,
    secondInstallment:false,
    secondInstallmentDate:false,
    amountReceived:false,
    amountDue:false,

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

    customerName:false,
    contactNumber:false,
    paymentId:false,
    totalAmount:false,
    firstInstallment:false,
    firstInstallmentDate:false,
    secondInstallment:false,
    secondInstallmentDate:false,
    amountReceived:false,
    amountDue:false,

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
      const endpoint = "http://localhost:8070/payment/add";
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
          <h1 className="sup-title">Customer Payments</h1>

          <div className="sprow">
            <div className="spcsname">
              <p for="fname">Name</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["customerName"]} 
              id="standard-basic" 
              label="Customer" 
              name="customerName" 
              onChange={handleChange} />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Contact Number</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["contactNumber"]} 
              id="standard-basic" 
              label="Contact Number" 
              name="contactNumber" 
              onChange={handleChange} />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Payment ID</p>
            </div>
            <div className="spcsans">
              <TextField  
              error={errorState["paymentId"]}  
              id="standard-basic" 
              label="ID" 
              name="paymentId" 
              onChange={handleChange} 
              value={state.paymentId} />
            </div>
          </div>

          {/* <div className="sprow">
            <div className="spcsname">
             <p>Payment Date</p>
            </div>
          <div style={{ width: 200, marginLeft:540, marginTop:-20}}>
              <DatePickerComponent 
              placeholder="MM/DD/YYYY" 
              name="paymentDate" 
              onChange={handleChange} >
              </DatePickerComponent>
          </div>  
         </div> */}

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Total Amount</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["totalAmount"]} 
              id="standard-basic" label="LKR" 
              name="totalAmount" 
              onChange={handleChange} 
              type="number" />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">First Installment</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["firstInstallment"]} 
              id="standard-basic" label="LKR" 
              name="firstInstallment" 
              onChange={handleChange} 
              type="number" />
               <TextField style={{ width: "30%", marginLeft: 20, marginTop: 15 }}
               type="date"
               error={errorState["firstInstallment"]} 
               id="standard-basic" 
               name="firstInstallmentDate" 
               onChange={handleChange} 
               >

               </TextField>
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Second Installment</p>
            </div>
            <div className="spcsans">
              <TextField 
              
              error={errorState["secondInstallment"]} 
              id="standard-basic" label="LKR" 
              name="secondInstallment" 
              onChange={handleChange} 
              
              />
              <TextField style={{ width: "30%", marginLeft: 20, marginTop: 15 }}
               type={"date"}
               error={errorState["secondInstallment"]} 
               id="standard-basic" 
               name="secondInstallmentDate" 
               onChange={handleChange} 
               >
              </TextField>

            </div>
          </div>
         
          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Amount Received</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["amountReceived"]} 
              id="standard-basic" 
              label="LKR" 
              name="amountReceived" 
              onChange={handleChange} type="number" />
            </div>
          </div>

          <div className="sprow">
            <div className="spcsname">
              <p for="lname">Amount Due</p>
            </div>
            <div className="spcsans">
              <TextField 
              error={errorState["amountDue"]} 
              id="standard-basic" 
              label="LKR" 
              name="amountDue" 
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