import { Button, Container, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/features/todoSlice";
import { setLoading } from "../../redux/features/loadingSlice";

const Control: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const dispatch = useDispatch();

  const addTask = () => {
    if (onRequest) return;
    setOnRequest(true);
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(addTodo(text));
      setText("");
      setOnRequest(false);
      dispatch(setLoading(false));
    }, 2000);
  };

  // const getTasks = () => {
  //   dispatch(getList());
  // };

  return (
    <Container maxWidth="xs">
      <Stack direction="row" spacing={2}>
        <TextField
          variant="standard"
          placeholder="Enter todo"
          fullWidth
          value={text}
          onKeyDown={(e) => {
            if (e.keyCode === 13) addTask();
          }}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" onClick={addTask} disabled={!text}>
          Add
        </Button>
        {/* <Button variant="contained" onClick={getTasks}>
          Refresh
        </Button> */}
      </Stack>
    </Container>
  );
};

export default Control;
