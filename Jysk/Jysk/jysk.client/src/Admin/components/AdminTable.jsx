import React from 'react';
function AdminTable({ list, o_func, e_func, i_func}) {

    var t_table = [];
    var table = [];
    var h_table = [];

    const MapTable = () => {
        var index = 0;
        list.forEach(item => {
            t_table = [];
            if (index == 0) {
                MapHTable(item);
                index++;
            }
            for (var key in item) {
                if (typeof item[key] === 'boolean')
                {
                    t_table.push(<td>{item[key] ? 'Yes' : 'No'}</td>);
                }
                else if (key == "photoFile") {
                    var t;
                }
                else  if (key == "photo")
                {
                    var image = [];
                    image.push(<img src={"https://localhost:7196/images/" + item[key]} width="60px" height="60px" />)
                    t_table.push(<td>{image}</td>)
                    
                }
                else if (!key.includes("Id") || key == "Id") {
                    t_table.push(<td>{item[key]}</td>);
                }
            }
            t_table.push(<button onClick={() => o_func(item.id)} className="redact">X</button>)
            t_table.push(<button onClick={() => e_func(item.id)} className="redact">Edit</button>)
            table.push(<tr key={item.id}>{t_table}</tr>)
        });
    }

    const MapHTable = (item) => {
        for (var key in item) {
            if (key != "photoFile") {
                if (!key.includes("Id") || key == "Id") {
                    key = key.charAt(0).toUpperCase() + key.slice(1)
                    h_table.push(<th><button onClick={i_func}>{key}</button></th>);
                }
            }
        }
    }

    return (
        <table>
            {MapTable()}
            <tr>
                {h_table}
            </tr>
            {table}
        </table>
    );
}

export default AdminTable;