import React from 'react'
import {Link} from "react-router-dom";

const LinksList = ({links}) => (
    <table>
        <thead>
        <tr>
            <th>Номер</th>
            <th>Оригинал</th>
            <th>Новая</th>
            <th>Открыть</th>
        </tr>
        </thead>

        <tbody>
        {links.map((link, index) => {
            return (
                <tr key={link._id}>
                    <td>{index}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td><Link to={`/description/${link._id}`}>Открыть</Link></td>
                </tr>
            )
        })}
        </tbody>
    </table>
)

export default LinksList