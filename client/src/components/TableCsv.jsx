import React, { useState } from 'react';

export default function TableCsv({ csvData }) {
    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Extract column headers from the first row
    const columnHeaders = csvData.length > 0 ? Object.keys(csvData[0]) : [];
    // console.log("csvData[0]=",csvData[0])
    // console.log("columnHeaders=",columnHeaders)

    // Calculate total number of pages
    const totalPages = Math.ceil((csvData.length - 1) / itemsPerPage);

    // Slice data based on current page
    const startIndex = (currentPage - 1) * itemsPerPage + 1; // Start from index 1 to skip headers
    const endIndex = startIndex + itemsPerPage;
    const slicedData = csvData.slice(startIndex, endIndex);

    // Function to handle page navigation
    const goToPage = (page) => {
        setCurrentPage(page);
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
                            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {columnHeaders.map((header, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4">
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
                <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
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
        </div>
    );
}
