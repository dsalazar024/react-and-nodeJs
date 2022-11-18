import React from 'react';
import Table from 'react-bootstrap/Table';

const TableFiles = ({ data }) => {
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Text</th>
                    <th>Number</th>
                    <th>Hex</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <th scope='row'> {index + 1} </th>
                            <td> {item.file} </td>
                            <td> {item.lines[0].text} </td>
                            <td> {item.lines[0].number} </td>
                            <td> {item.lines[0].hex} </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableFiles;