import React from 'react';
import { Graph } from 'react-d3-graph';

const GraphEl = () => {
    const data = {
        nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }, { id: 'Sid' }],
        links: [
            { source: 'Harry', target: 'Sally' },
            { source: 'Harry', target: 'Alice' },
            { source: 'Sid', target: 'Alice' },
            { source: 'Sid', target: 'Harry' },
            { source: 'Sid', target: 'Sally' },
        ],
    };

    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: 'lightgreen',
            size: 180,
            highlightStrokeColor: 'blue',
        },
        link: {
            highlightColor: 'lightblue',
        },
    };

    return (
        <div>
            Llll
            <Graph
                id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
            />
        </div>
    );
};

export default GraphEl;
