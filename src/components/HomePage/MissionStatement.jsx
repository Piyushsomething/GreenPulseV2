import React from 'react';
import { Fieldset } from 'primereact/fieldset';

const MissionStatement = ({ statement }) => (
 <div className="m-2 p-4  rounded-lg">
    <h2 className="text-2xl font-bold mb-4 ">Mission Statement</h2>
    <p className="text-lg ">{statement}</p>
 </div>
);

export default MissionStatement;