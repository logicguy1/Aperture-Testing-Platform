import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";
import { useNavigate, Link } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/strings";

import config from "../../config";

const columns = [
  {
    field: 'benchmark_name',
    headerName: 'Navn',
    editable: false,
    flex: 1,
  },
  {
    field: 'avg',
    headerName: 'Avg',
    editable: false,
    flex: 0.5,
    renderCell: (params) => {
      if (params.aggregation && !params.aggregation.hasCellUnit) {
        return params.formattedValue;
      }
      return params.formattedValue != -1 ? parseInt(params.formattedValue) + " " + params.row.unit : "";
    },
  },
  {
    field: 'min',
    headerName: 'Min',
    editable: false,
    flex: 0.5,
    renderCell: (params) => {
      if (params.aggregation && !params.aggregation.hasCellUnit) {
        return params.formattedValue;
      }
      return params.formattedValue !== -1 ? parseInt(params.formattedValue) + " " + params.row.unit : "";
    },
  },
  {
    field: 'max',
    headerName: 'Max',
    editable: false,
    flex: 0.5,
    renderCell: (params) => {
      if (params.aggregation && !params.aggregation.hasCellUnit) {
        return params.formattedValue;
      }
      return params.formattedValue !== -1 ? parseInt(params.formattedValue) + " " + params.row.unit : "";
    },
  },
  {
    field: 'attempts',
    headerName: 'Attempts',
    editable: false,
    flex: 0.5,
    renderCell: (params) => {
      if (params.aggregation && !params.aggregation.hasCellUnit) {
        return params.formattedValue;
      }
      return params.formattedValue !== 0 ? parseInt(params.formattedValue) : "";
    },
  }
];
const columns2 = [
  {
    field: 'rank',
    headerName: 'Rank',
    editable: false,
    flex: 0.2,
  },
  {
    field: 'username',
    headerName: 'Navn',
    editable: false,
    flex: 1,
  },
  {
    field: 'normalised_value',
    headerName: 'Normalisation',
    editable: false,
    flex: 0.5,
  },
  {
    field: 'Reaction speed',
    headerName: 'Reaction speed',
    editable: false,
    flex: 0.5,
  },
  {
    field: 'Typing speed',
    headerName: 'Typing speed',
    editable: false,
    flex: 0.5,
  },
  {
    field: 'Word memory',
    headerName: 'Word memory',
    editable: false,
    flex: 0.5,
  },
  {
    field: 'Simon sais',
    headerName: 'Simon sais',
    editable: false,
    flex: 0.5,
  },
  {
    field: 'Aim speed',
    headerName: 'Aim speed',
    editable: false,
    flex: 0.5,
  },
  {
    field: 'Number memory',
    headerName: 'Number memory',
    editable: false,
    flex: 0.5,
  },
];


const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    head.setData({location: ["Dashboard"]});

    fetch(
      `${config.baseurl}/dashboard/get_data`,
      {
        credentials: 'include',
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response JSON
    })
    .then(data => {
      // Handle the response data here
      console.log(data);
      if (data.status) {
        setData(data.data)
      }
    })
  }, [])

  return (
    <>
      <Box
        height="15em"
        position="relative"
        borderBottom={`1px ${colors.borderColor} solid`}
        sx={{
          //background: "linear-gradient(142deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 38%, rgba(0,212,255,1) 100%)"
          background: "linear-gradient(142deg, rgba(191,10,185,1) 0%, rgba(113,67,200,1) 40%, rgba(14,157,204,1) 100%)"
          //background: "linear-gradient(142deg, rgba(166,0,160,1) 0%, rgba(86,16,210,1) 69%, rgba(0,185,246,1) 100%)"
        }}
      >
        <Box 
          position="absolute"
          left="15%"
          top="8em"
          display="flex"
          gap="2em"
          color={colors.grey[900]}
        >
          <Avatar
            alt={capitalizeFirstLetter(auth.token.user)}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 120, height: 120 }}
          />
          <Box mt="2.5em" display="flex" flexDirection="column" gap=".3em">
            <Typography variant="h3">
              {capitalizeFirstLetter(auth.token.user)}
            </Typography>
            <Typography variant="h5">
              Joined {data?.created}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        height="3.5em"
        borderBottom={`1px ${colors.borderColor} solid`}
        display="flex"
        flexDirection="row-reverse"
      >
        <Button 
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[900],
            padding: "0 4em",
            borderRadius: "0px"
          }}
          onClick={() => {navigate("/settings")}}
        >
          Friends
        </Button>
      </Box>
      <Box
        display="flex"
        width="100%"
        height="60%"
        gap="2em"
        p="1em"
      >
        <Box flex="1" height="100%">
          <Typography variant="h5" pb="1em">
            Overview
          </Typography>
          <DataGrid
            rows={data?.scores === undefined ? [] : data.scores}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            density="compact"
            pageSizeOptions={[20, 50, 100]}
            disableRowSelectionOnClick
            disableSelectionOnClick
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
              "& .empty": {
                backgroundColor: colors.primary[400]+"95",
              }
            }}
            getCellClassName={(params) => {
              if (["min", "max", "avg"].includes(params.field)) {
                return params.value == -1 || params.value === null ? 'empty' : '';
              }
              if (["attempts"].includes(params.field)) {
                return params.value == 0 || params.value === null ? 'empty' : '';
              }
            }}
          />
        </Box>
        <Box flex="1">
          <Typography variant="h5" pb="1em">
            Leaderboards
          </Typography>
          <DataGrid
            rows={data?.high_scores === undefined ? [] : data.high_scores}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            density="compact"
            pageSizeOptions={[20, 50, 100]}
            disableRowSelectionOnClick
            disableSelectionOnClick
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
              "& .empty": {
                backgroundColor: colors.primary[400]+"95",
                color: colors.primary[400]+"95",
              }
            }}
            getCellClassName={(params) => {
              return params.value == -1 || params.value === null ? 'empty' : '';
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Index;
