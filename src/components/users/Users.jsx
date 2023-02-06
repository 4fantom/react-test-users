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
  const [totalAmount, setTotalAmount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { isLoading, apiError, apiData, headers } = useFetch(
    "/",
    {
      params: {
        gender: gender,
        page: page,
        per_page: rowsPerPage,
      },
    },
    [page, rowsPerPage, gender]
  );

  if (apiError) {
    toast.error(apiError.message);
  }

  useEffect(() => {
    if (!!apiData) {
      const filteredUsers = gender
        ? apiData.filter((user) => user.gender === gender)
        : apiData;
      setUsers(filteredUsers);
      setTotalAmount(headers["x-pagination-total"]);
    }
  }, [apiData, gender]);

  const handleSelectChange = (e) => {
    setPage(0);
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
            <BasicTable
              rows={users}
              onRowClick={handleRowClick}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalAmount={totalAmount}
            />
          </Box>
        </div>
      )}
      <ToastContainer />
    </Box>
  );
};

export default Users;
