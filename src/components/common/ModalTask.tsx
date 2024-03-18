import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateTodo } from "../../redux/features/todoSlice";
import { setLoading } from "../../redux/features/loadingSlice";

interface ModalProps {
  openModal: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: { md: "400px", xs: "250px" },
  bgcolor: "background.paper",
  p: 4,
};

const ModalTask: React.FC<ModalProps> = ({ openModal, handleClose }) => {
  const todo = useSelector((state: RootState) => state.todoSlice.todo);
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const handleUpdateTodo = (text: string) => {
    if (text && todo) {
      if (onRequest) return;
      setOnRequest(true);
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(updateTodo({ ...todo, name: text }));
        dispatch(setLoading(false));
        setOnRequest(false);
        handleClose();
      }, 2000);
    } else handleClose();
  };

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={style}>
        <Typography mb={2} variant="h6" align="center">
          Update todo
        </Typography>
        <TextField
          placeholder="Enter todo"
          fullWidth
          autoFocus={openModal}
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
          defaultValue={todo?.name}
          sx={{ textTransform: "capitalize" }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) handleUpdateTodo(text);
          }}
        />

        <Stack direction="row" justifyContent="space-between" pt={2}>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={() => handleUpdateTodo(text)}>update</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalTask;
