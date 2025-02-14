import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import PropTypes from 'prop-types';

const getAge = (birth) => {
  const birthday = new Date(birth);
  const today = new Date();
  const age = today.getFullYear() - birthday.getFullYear();
  return age;
}

const DEMO_COLUMNS = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'birthday', headerName: 'Birthday', width: 160 },
  {
    field: 'age',
    headerName: 'Age',
    width: 90,
    type: 'number',
    valueGetter: (value, row) => { return getAge(row.birthday) },
  }
];

const DEMO_ROWS = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', birthday: '2004-01-01' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', birthday: '1993-01-01' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', birthday: '1976-01-01' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', birthday: '1976-01-01' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', birthday: '1988-01-01' },
  { id: 6, lastName: 'Melisandre', firstName: 'kae', birthday: '1991-01-01' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', birthday: '1992-01-01' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', birthday: '1959-01-01' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', birthday: '1963-01-01' },
];

const DataTable = ({checkboxSelection = true, columns = DEMO_COLUMNS, rows = DEMO_ROWS, minHeight = 300}) => {
  // Docs: https://mui.com/x/react-data-grid/row-selection

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  return (
    <Paper sx={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        sx={{ '--DataGrid-overlayHeight': `${minHeight}px` }}
      />
    </Paper>
  );
};

DataTable.propTypes = {
  checkboxSelection: PropTypes.bool,
  columns: PropTypes.array,
  rows: PropTypes.array,
  minHeight: PropTypes.number
};

export default DataTable;
