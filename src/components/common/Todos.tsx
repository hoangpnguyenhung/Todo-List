import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Container,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  keyframes,
  useMediaQuery,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import RemoveDoneOutlinedIcon from "@mui/icons-material/RemoveDoneOutlined";
import { setLoading } from "../../redux/features/loadingSlice";
import {
  getTodoById,
  removeTodo,
  todo,
  updateTodo,
} from "../../redux/features/todoSlice";
import ModalTask from "./ModalTask";
import { todosFinished, todosNotFinished } from "../../utils/filterTodo";
import { useTheme } from "@emotion/react";

const finishedAnimation = keyframes`
  0%{
    transform: scaleX(0);
    width:0;
  }

  99%{
    transform: scaleX(1);
    width:100%;
  }

  100%{
    transform: scaleX(0);
    width:0;
  }
`;

const Todos: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todoSlice.todoList);
  const query = useSelector((state: RootState) => state.todoSlice.query);
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getIdRow, setGetIdRow] = useState<number | null>(null);
  const theme: any = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClose = () => setOpenModal(!openModal);

  const removeTask = (id: number) => {
    if (onRequest) return;
    setOnRequest(true);
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(removeTodo(id));
      dispatch(setLoading(false));
      setOnRequest(false);
    }, 2000);
  };

  const updateStateTask = (todo: todo, state: boolean) => {
    if (onRequest) return;
    setOnRequest(true);
    dispatch(setLoading(true));
    if (!state) setGetIdRow(todo.id);
    setTimeout(() => {
      dispatch(updateTodo({ ...todo, state: state }));
      dispatch(setLoading(false));
      setOnRequest(false);
      setGetIdRow(null);
    }, 2000);
  };

  const taskEdit = (id: number) => {
    dispatch(getTodoById(id));
    setOpenModal(true);
  };

  return (
    <>
      <ModalTask openModal={openModal} handleClose={handleClose} />
      <Container maxWidth="sm">
        {todosNotFinished(todos, query).length ? (
          <Table>
            <TableBody sx={{ position: "relative" }}>
              {todosNotFinished(todos, query).map((todo, index) => (
                <TableRow
                  sx={{
                    position: "relative",
                    "&::before": {
                      position: "absolute",
                      content: '""',
                      display: "block",
                      top: "50%",
                      left: "0",
                      transform: "translate(0,-50%)",
                      height: "2px",
                      bgcolor: "primary.contrastText",
                      transformOrigin: "left",
                      animation: `${
                        todo.id === getIdRow && finishedAnimation
                      } 2s forwards ease`,
                    },
                  }}
                  key={index}
                  hover={!matches}
                >
                  <TableCell onClick={() => !matches && taskEdit(todo.id)}>
                    <Typography
                      variant={matches ? "body1" : "body2"}
                      sx={{
                        width: { sm: "36ch", xs: "20ch" },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textTransform: "capitalize",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {todo.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => removeTask(todo.id)}
                      size={matches ? "medium" : "small"}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                    {matches && (
                      <IconButton
                        onClick={() => taskEdit(todo.id)}
                        size={matches ? "medium" : "small"}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    )}
                    {todo.state && (
                      <IconButton
                        onClick={() => updateStateTask(todo, false)}
                        size={matches ? "medium" : "small"}
                      >
                        <DoneOutlinedIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography align="center" mt={4}>
            No task
          </Typography>
        )}
        {todosFinished(todos).length > 0 && (
          <>
            <Divider sx={{ my: 3 }} textAlign="left">
              Done
            </Divider>
            <Table>
              <TableBody sx={{ position: "relative" }}>
                {todosFinished(todos).map((todo, index) => (
                  <TableRow
                    selected={!todo.state}
                    sx={{
                      position: "relative",
                      "&::before": {
                        position: "absolute",
                        content: '""',
                        display: "block",
                        top: "50%",
                        left: "0",
                        transform: "translate(0,-50%)",
                        height: "2px",
                        bgcolor: "palette.primary",
                        transformOrigin: "left",
                        // animation: `${
                        //   !todo.state && finishedAnimation
                        // } 2s forwards ease`,
                      },
                      "&.Mui-selected": {
                        opacity: "0.5",
                      },
                    }}
                    key={index}
                    hover={!matches}
                  >
                    <TableCell onClick={() => !matches && taskEdit(todo.id)}>
                      <Typography
                        variant={matches ? "body1" : "body2"}
                        sx={{
                          width: { sm: "36ch", xs: "20ch" },
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textTransform: "capitalize",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {todo.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => removeTask(todo.id)}
                        size={matches ? "medium" : "small"}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                      {matches && (
                        <IconButton
                          onClick={() => taskEdit(todo.id)}
                          size={matches ? "medium" : "small"}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                      )}
                      {!todo.state && (
                        <IconButton
                          onClick={() => updateStateTask(todo, true)}
                          size={matches ? "medium" : "small"}
                        >
                          <RemoveDoneOutlinedIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
};

export default Todos;
