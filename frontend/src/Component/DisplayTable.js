import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const DisplayTable = ({ orders }) => 
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>OrderId</TableCell>
          <TableCell>Product Name</TableCell>
          <TableCell>Customer Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders?.map(order => (
          <TableRow key={order._id}>
            <TableCell>{order._id}</TableCell>
            <TableCell>{order.products.name}</TableCell>
            <TableCell>{order.customers.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>

export default DisplayTable;
