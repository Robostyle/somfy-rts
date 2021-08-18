import React, { ErrorBoundary, Suspense } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Fab,
  Toolbar,
  Typography,
  AppBar,
  TextField,
  IconButton,
  Tooltip,
  Grid,
  Paper
} from "@material-ui/core";
import { atom, selector, useRecoilValue, AtomEffect } from "recoil";
import "./styles.css";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import StopIcon from "@material-ui/icons/Stop";
import UpIcon from "@material-ui/icons/ExpandLess";
import DownIcon from "@material-ui/icons/ExpandMore";
import InfoIcon from "@material-ui/icons/Info";

const sleep = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

interface RemoteControl {
  name: string;
  rollingCode: number;
  id: number;
}

const Api = {
  getItem: async (): Promise<RemoteControl[]> => {
    console.log("get item");
    await sleep(1000);
    return [
      { name: "1e verdieping", id: 0xdadada, rollingCode: 7890 },
      { name: "2e verdieping", id: 0xadadad, rollingCode: 45678 }
    ];
  },

  setItem: async (remotes: RemoteControl[]) => {
    console.log("set item", remotes);
  }
};

// const localForageEffect: AtomEffect<RemoteControl[]> = ({ setSelf, onSet }) => {
//   // If there's a persisted value - set it on load
//   const loadPersisted = async () => {
//     const savedValue = await Api.getItem();
//     setSelf(savedValue);
//   };

//   // Load the persisted data
//   loadPersisted();

//   // Subscribe to state changes and persist them to localForage
//   onSet((newValue: RemoteControl[]) => {
//     Api.setItem(newValue);
//   });
// };

const x = selector<RemoteControl[]>({
  key: "X",
  get: async (): Promise<RemoteControl[]> => {
    await sleep(1000);
    return [] as RemoteControl[];
  }
});

// const remoteControllers = atom({
//   key: "RemoteControllers",
//   default: [] as RemoteControl[],
//   effects_UNSTABLE: [localForageEffect]
// });

type RemoteControllerProps = { remote: RemoteControl };
function RemoteController(props: RemoteControllerProps) {
  const { remote } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Remote name"
            disabled
            defaultValue={remote.name}
            sx={{ flexGrow: 1, mr: 2 }}
          />
          <Tooltip
            title={
              <>
                <Typography variant="body2" color="inherit">
                  ID: {remote.id}
                </Typography>
                <Typography variant="body2" color="inherit">
                  Rolling code: {remote.rollingCode}
                </Typography>
              </>
            }
          >
            <InfoIcon color="primary" />
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        <Tooltip title="Shutter up">
          <IconButton aria-label="shutter-up" size="large">
            <DownIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Shutter stop">
          <IconButton aria-label="shutter-stop" size="large">
            <StopIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Shutter down">
          <IconButton aria-label="shutter-down" size="large">
            <UpIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

type RemoteControllersProps = { remotes: RemoteControl[] };
function RemoteControllers(props: RemoteControllersProps) {
  const { remotes } = props;
  return null;
  //  (<>
  // {remotes.map((r) => (
  //               <Paper
  //                 key={r.id}
  //                 elevation={2}
  //                 sx={{ mb: 3, p: 2 }}
  //                 variant="outlined"
  //               >
  //                 <RemoteController remote={r} />
  //               </Paper>
  //             ))}</>)
}

export default function App() {
  const values = useRecoilValue(x);
  console.log("values:", values);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            ESP Somfy RTS remote
          </Typography>

          <IconButton></IconButton>
        </Toolbar>
      </AppBar>

      <main>
        <Box
          sx={{
            p: 2
          }}
        >
          <Container maxWidth="sm">
            <Suspense fallback={<div>Loading...</div>}>
              <Tooltip title="Add new remote">
                <Fab sx={{ position: "fixed", bottom: 32, right: 32 }}>
                  <AddIcon />
                </Fab>
              </Tooltip>

              {/* <RemoteControllers remotes={values} /> */}
            </Suspense>
          </Container>
        </Box>
      </main>
    </>
  );
}
