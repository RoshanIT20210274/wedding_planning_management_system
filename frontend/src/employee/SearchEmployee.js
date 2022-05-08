import React, { useState } from "react";
import "./styles/searchemployee.css";
import SearchBar from "./components/SearchBar";
import SearchResultsModal from "./components/SearchResultsModal";
import TextField from "@material-ui/core/TextField";

export default function SearchEmployee() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const search = (keyPhrase) => {
    sendSearchRequest(keyPhrase);
  };

  const sendSearchRequest = async (fullName) => {
    try {
      const endpoint = `http://localhost:8070/employee/find/?name=${fullName}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseBody = await response.json();
        setSearchResults(responseBody);
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHide = () => setModalVisible(false);
  const handleSearchResultClick = (item) => {
    onHide();
    setSelectedEmployee(item);
  };

  return (
    <div className="Details-background">
      {SearchResultsModal({
        modalVisible,
        onHide,
        data: searchResults,
        onClick: handleSearchResultClick,
      })}
      <div className="Details-card">
        <div className={"dform1"}>
          <h2>Employee Details</h2>
          {SearchBar(search)}
          <div className={"dform-group1 w-100"}>
            <TextField
              type="text"
              className="dform-control1"
              variant="standard"
              label="Employee ID"
              readOnly={true}
              value={selectedEmployee ? selectedEmployee.employeeID : ""}
            />
          </div>
          <div className={"dform-group1 w-100"}>
            <TextField
              className="dform-control1"
              type="text"
              variant="standard"
              label="Employee name"
              readOnly={true}
              value={selectedEmployee ? selectedEmployee.fullName : ""}
            />
          </div>
          <div className={"dform-group1 w-100"}>
            <TextField
              className="dform-control1"
              type="text"
              variant="standard"
              label="Employee Type"
              readOnly={true}
              value={selectedEmployee ? selectedEmployee.employeeType : ""}
            />
          </div>
          <div className={"dform-group1 w-100"}>
            <TextField
              className="dform-control1"
              type="text"
              variant="standard"
              label="Joining date"
              readOnly={true}
              value={selectedEmployee ? selectedEmployee.date : ""}
            />
          </div>
          <div className={"dform-group1 w-100"}>
            <TextField
              className="dform-control1"
              type="text"
              variant="standard"
              label="Department"
              readOnly={true}
              value={selectedEmployee ? selectedEmployee.department : ""}
            />
          </div>
          <div className={"dform-group1 w-100"}>
            <TextField
              className="dform-control1"
              type="text"
              variant="standard"
              label="NIC"
              readOnly={true}
              value={selectedEmployee ? selectedEmployee.nic : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
