import React from "react";

type DateFormatterProps = {
    dateString: string;
};

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits

    return `${year}-${month}-${day}`;
};

const DateFormatter: React.FC<DateFormatterProps> = ({ dateString }) => {
    return <span>{formatDate(dateString)}</span>;
};

export default DateFormatter;
