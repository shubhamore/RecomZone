import React, { useEffect, useState } from 'react';
import TableCsv from '../components/TableCsv';
import axios from 'axios';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [selectedID, setSelectedID] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [filteredCsvData, setFilteredCsvData] = useState([]);
  const [filteredSelectedRow, setFilteredSelectedRow] = useState([]);
  const [removedColumns, setRemovedColumns] = useState([]);
  const [idOfRecommendedRows, setIdOfRecommendedRows] = useState([]);

  useEffect(() => {
    if (csvData.length > 0) {
      const filteredCsvData = csvData.map(row => row.filter((_, index) => !removedColumns.includes(index)));
      setFilteredCsvData(filteredCsvData);
      const filteredSelectedRow = selectedRow.map(row => row.filter((_, index) => !removedColumns.includes(index)));
      setFilteredSelectedRow(filteredSelectedRow)
    }
  }, [csvData, removedColumns, selectedRow])

  const handleColumnRemoval = (index) => {
    if (removedColumns.includes(index)) {
      setRemovedColumns(removedColumns.filter(colIndex => colIndex !== index));
    } else {
      setRemovedColumns([...removedColumns, index]);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert("Please select a CSV file.");
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      setCsvData(rows);
      setFilteredCsvData(rows)
      setSelectedRow([rows[0], rows[1]])
      setFilteredSelectedRow([rows[0], rows[1]])
    };

    reader.readAsText(file);
  };

  const changeID = (e) => {
    let id = parseInt(e.target.value)
    if (id <= csvData.length && id > 0) {
      setSelectedID(id)
    } else {
      alert("Please enter a valid ID")
      setSelectedID(1)
    }
  };

  useEffect(() => {
    if (csvData.length > 0) {
      let row = []
      row.push(csvData[0])
      row.push(csvData[selectedID])
      setSelectedRow(row);
    }
  }, [selectedID])

  const handleClickChangeSelectedId = (index) =>{
    setSelectedID(idOfRecommendedRows[index]);
    getRecommendations();
  }


  const getRecommendations = async () => {
    console.log("selectedID=", selectedID);
    if (filteredCsvData.length === 0) {
      alert("Please upload a CSV file first.");
      return;
    }

    const filteredCsvBase64 = btoa(filteredCsvData.map(row => row.join(',')).join('\n'));

    const url = `http://localhost:5000/recommendations`;

    const dataToSend = {
      'csvData': filteredCsvBase64,
      'id': selectedID,
    };

    try {
      const res = await axios.post(url, dataToSend);
      let arr = [];
      arr.push(filteredCsvData[0]);
      res.data.similarDocuments.forEach((doc) => {
        arr.push(filteredCsvData[doc.id]);
      });
      setRecommendations(arr);
      setIdOfRecommendedRows(res.data.similarDocuments.map(doc => doc.id));
      console.log('Recommendations received successfully:', res.data);
    } catch (err) {
      console.error(err);
    }
  };


  // React.useEffect(() => {
  //   console.log("selectedID=", selectedID)
  // }, [selectedID]);

  return (
    <div className='bg-slate-900 text-white min-h-full flex-1 flex min-w-full justify-center flex-col pb-20'>
      {/* Upload CSV */}
      <div className='flex my-11 items-center flex-col text-center space-y-4'>
        <h2 className='text-5xl my-5 text-green-300'>Upload CSV File</h2>
        <div className="flex items-center justify-center">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 w-96">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              {file ? <p>{file.name}</p> : (
                <>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CSV only</p>
                </>
              )}
            </div>
            <input onChange={handleFileChange} id="dropzone-file" type="file" accept=".csv" className="hidden" />
          </label>
        </div>

        <button onClick={handleFileUpload} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Upload</button>
      </div>
      {csvData.length > 0 && (
        <>
          {/* Remove Columns */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-5xl my-5 text-green-300">Remove Columns</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {csvData[0].map((header, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={removedColumns.includes(index)}
                    onChange={() => handleColumnRemoval(index)}
                    className="form-checkbox h-5 w-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                  />
                  <label htmlFor={`checkbox-${index}`} className="text-gray-600">{header}</label>
                </div>
              ))}
            </div>
          </div>
          {/* Display CSV Data */}
          <div>
            <h2 className='text-5xl my-5 text-green-300 text-center'>CSV Data</h2>
            <TableCsv csvData={filteredCsvData} />
          </div>
          {/* Select id */}
          <div className='flex my-11 items-center flex-col text-center space-y-4'>
            <h2 className='text-5xl my-5 text-green-300'>Select ID of row you want recommendations</h2>
            <div className="flex items-center justify-center">
              <input
                type="number"
                className="w-20 h-10 border-2 border-gray-300 rounded-lg text-center text-black font-bold"
                placeholder="ID"
                value={selectedID}
                onChange={(e) => changeID(e)}
              />
            </div>
          </div>
          {selectedRow.length > 0 && <div>
            {/* <h2 className='text-5xl my-5 text-green-300'>Selected Row</h2> */}
            <TableCsv csvData={filteredSelectedRow} />
          </div>}
          <div className='text-center'>
            <button onClick={getRecommendations} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:text-white dark:hover:text-neutral-300 dark:hover:border-neutral-300">
              Get Recommendations
            </button>
          </div>
        </>
      )}
      {/* Recommendations */}
      {recommendations.length > 0 && (
        <>
          <div>
            <h2 className='text-5xl my-5 text-green-300 text-center'>Recommendations</h2>
            <TableCsv csvData={recommendations} isClickable={true} handleClickChangeSelectedId={handleClickChangeSelectedId} />
          </div>
        </>
      )}
    </div>
  );
}