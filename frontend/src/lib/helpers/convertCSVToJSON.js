/*
 * Convert CSV data or file to JSON data or file
 *
 *
 * */
const convertCSVToJSON = (csv) => {
	const rows = csv.split('\n')
	const data = [];
	const headers = formatHeaders(rows[0].split(','));
    rows.splice(0,1);
	rows.map(row => {
		const obj = {}
		const columns = row.split(',')
        
		headers.map((header, index) => {
            obj[header] = columns[index];
		})

		data.push(obj)
	});
    
	return data;
}

const formatHeaders = (headers) => {
    const formattedHeaders = [];
    headers.map((header,index) => {
        formattedHeaders.push(header.replace(/[^a-zA-Z0-9]/g,''));
    })
    return formattedHeaders;
}


export default convertCSVToJSON;




