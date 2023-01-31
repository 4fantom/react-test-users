import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RoutePaths from "../helpers/RoutePaths";
import SelectField from "../helpers/SelectField";
import { selectGenderItems, selectStatusItems } from "../helpers/utils";
import { UsersClient } from "../helpers/useFetch";

const EditUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate(RoutePaths.root);
  }

  const [formValues, setFormValues] = useState({
    email: state?.email,
    gender: state?.gender,
    name: state?.name,
    status: state?.status,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const notifyError = (message) => toast.error(message);
  const notifySuccess = () => toast.success("You edited user successfully");

  const onTextChange = (e, key) => {
    setFormValues({
      ...formValues,
      [key]: e.target.value,
    });
  };

  const onSave = async () => {
    setIsButtonDisabled(true);
    try {
      await UsersClient.put(`/${state.id}`, {
        ...formValues,
      });
      notifySuccess();
      setTimeout(() => navigate(RoutePaths.users), 3000);
    } catch (e) {
      let message = `${e?.message}; `;
      if (e.response.data?.length) {
        e.response.data.forEach((el) => {
          message += `${el.field} ${el.message}; `;
        });
      }
      notifyError(message);
      setIsButtonDisabled(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
      <Paper>
        <Typography variant="h5">Edit User</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { m: 2, width: 500 },
          }}
        >
          <TextField
            key="name"
            id="name"
            label="Name"
            value={formValues.name}
            variant="outlined"
            onChange={(e) => onTextChange(e, "name")}
          />
          <TextField
            key="email"
            id="email"
            label="Email"
            value={formValues.email}
            variant="outlined"
            onChange={(e) => onTextChange(e, "email")}
          />
          <SelectField
            name="gender"
            label="Gender"
            handleChange={(e) => onTextChange(e, "gender")}
            defaultValue={formValues.gender}
            value={formValues.gender}
            menuItems={selectGenderItems}
          />
          <SelectField
            name="status"
            label="Status"
            defaultValue={formValues.status}
            value={formValues.status}
            handleChange={(e) => onTextChange(e, "status")}
            menuItems={selectStatusItems}
          />
          <Box m={2}>
            <Button
              variant="outlined"
              sx={{ width: 200 }}
              onClick={onSave}
              disabled={isButtonDisabled}
            >
              Save
            </Button>
          </Box>
        </Box>
        <ToastContainer />
      </Paper>
    </Box>
  );
};

export default EditUser;
