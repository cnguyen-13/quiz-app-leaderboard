import React from "react";

interface Props {
    columns: string[];
}

function TableHeaders(props: Props) {
    const { columns } = props;

    return (
        <thead className="thead-light">
            <tr>
                {columns.map((column, idx) => {
                    return (
                        <th key={`${column}_${idx + 1}`} scope="col">
                            {column}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

export default TableHeaders;
