import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFetch from "../helpers/useFetch";
import RoutePaths from "../helpers/RoutePaths";
import SelectField from "../helpers/SelectField";
import { selectGenderItems } from "../helpers/utils";
import BasicTable from "../helpers/BasicTable";

const Users = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [users, setUsers] = useState(null);

  const { isLoading, apiError, apiData } = useFetch("/");

  if (apiError) {
    toast.error(apiError.message);
  }

  useEffect(() => {
    if (!!apiData) {
      const filteredUsers = gender
        ? apiData.filter((user) => user.gender === gender)
        : apiData;
      setUsers(filteredUsers);
    }
  }, [apiData, gender]);

  const handleSelectChange = (e) => {
    setGender(e.target.value);
  };

  const handleRowClick = (row) => {
    navigate(RoutePaths.edit, { state: row });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {isLoading && <CircularProgress />}
      {users && !apiError && (
        <div>
          <Box sx={{ height: 400, width: "100%" }}>
            <SelectField
              value={gender}
              label="Gender"
              handleChange={handleSelectChange}
              menuItems={selectGenderItems}
            />
            <BasicTable rows={users} onRowClick={handleRowClick} />
          </Box>
        </div>
      )}
      <ToastContainer />
    </Box>
  );
};

export default Users;
