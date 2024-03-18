import { styled } from "@mui/material/styles";
import { Switch } from "@mui/material";

export const SwitchTheme = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZffV6c3LpUcWHswbAR62a6CMEAIcvS7Eng&usqp=CAU')`,
        backgroundSize: "cover",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "50%",
      backgroundImage: `url('https://media.istockphoto.com/id/880562092/vi/vec-to/v%C6%B0%C6%A1ng-qu%E1%BB%91c-anh-c%E1%BB%9D-v%C6%B0%C6%A1ng-qu%E1%BB%91c-anh.jpg?s=612x612&w=0&k=20&c=d8hz-lM3TN0q-RtDlXaRq3qIxF0nwtRLYxY1Zmy8U34=')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
