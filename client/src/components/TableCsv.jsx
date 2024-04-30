import React, { useState } from 'react';

export default function TableCsv({ csvData,isClickable=false,handleClickChangeSelectedId }) {
    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null); // State to store the selected row index
    const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
    const columnHeaders = csvData.length > 0 ? Object.keys(csvData[0]) : [];
    const totalPages = Math.ceil((csvData.length - 1) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1; // Start from index 1 to skip headers
    const endIndex = startIndex + itemsPerPage;
    const slicedData = csvData.slice(startIndex, endIndex);

    // Function to handle page navigation
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    // const handleRowClick = (index) => {
    //     if (isClickable) {
    //         handleClickChangeSelectedId(index);
    //     }
    // };

    const handleRowClick = (index) => {
        if (isClickable) {
            setSelectedRowIndex(index);
            setShowModal(true);
        }
    };

    const handleGetRecommendation = () => {
        handleClickChangeSelectedId(selectedRowIndex);
        setShowModal(false);
    };

    return (
        <div className='px-10'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {csvData[0].map((header, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {slicedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => handleRowClick(rowIndex)}>
                                {columnHeaders.map((header, colIndex) => (
                                    <td key={colIndex} className={`px-6 py-4 ${isClickable ? 'cursor-pointer' : ''}`}>
                                        {row[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {/* Pagination */}
                <nav className="flex items-center justify-between pt-4 overflow-x-auto" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">
                            {startIndex}-{endIndex - 1}
                        </span> of <span className="font-semibold text-gray-900 dark:text-white">{csvData.length - 1}</span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 ${
                                    currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                                } border border-gray-300 rounded-s-lg`}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map((page) => (
                            <li key={page}>
                                <button
                                    onClick={() => goToPage(page + 1)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${
                                        currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
                                    } border border-gray-300`}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${
                                    currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                                } border border-gray-300 rounded-e-lg`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Get Recommendation</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Do you want to get a recommendation for the selected row?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={handleGetRecommendation}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Get Recommendation
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
