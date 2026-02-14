export const formatDate = (data: any): string => {
    if (!data && data !== 0) return '-';
    
    try {
        let date: Date;
        const dataStr = String(data);
        
        // Check if data is a Unix timestamp (numeric)
        if (/^\d+$/.test(dataStr)) {
            const timestamp = parseInt(dataStr);
            // If timestamp is in seconds (10 digits), convert to milliseconds
            // If timestamp is in milliseconds (13 digits), use as is
            date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
        } else {
            // It's a date string
            date = new Date(data);
        }
        
        // Check if date is valid
        if (isNaN(date.getTime())) return dataStr;
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}-${month}-${year} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
        return String(data);
    }
};