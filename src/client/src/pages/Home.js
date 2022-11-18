import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableFiles from '../components/Table';

const Home = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getFiles();
    }, [])

    const getFiles = async () => {
        const response = await axios.get("http://localhost:5000/files/data");
        if (response.status === 200) {
            setFiles(response.data);
        }
    }

    const search = async (data) => {
        let dataParse = data.toLowerCase();
        if (!dataParse) {
            getFiles();
        } else {
            const res = await axios.get(`http://localhost:5000/files/data?name=${dataParse}`);
            setFiles(res.data);
        }
    }

    return (
        <div className='d-flex flex-column mb-3 justify-content-center' style={{ marginTop: "2%" }} >
            <div className="col p-5">
                <div className='row'>
                    <input type="text"
                        name="search"
                        placeholder="Search.."
                        onChange={e => search(e.target.value)}
                    >
                    </input>
                </div>
                <TableFiles data={files} />
            </div>
        </div>
    )
}

export default Home;