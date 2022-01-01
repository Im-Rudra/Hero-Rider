import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Name', width: 70 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 }
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
];

const rows = [
  { id: 1, name: 'Admin', email: 'admin@admin.com', phone: '+8801707935995' },
  { id: 2, name: 'Admin', email: 'admin@admin.com', phone: '+8801707935995' },
  { id: 3, name: 'Admin', email: 'admin@admin.com', phone: '+8801707935995' }
];

console.log(rows);

export default function AllUsers() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
