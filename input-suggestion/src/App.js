import { Input } from '@mui/material';
import { useState } from 'react';
import InputSuggestion from './InputSuggestion/InputSuggestion';

const COLUMNS = [
    { key: 'timestamp', desc: 'Item1' },
    { key: 'computer', desc: 'Item2' },
    { key: 'name', desc: 'Item3' },
    { key: 'description', desc: 'Item4' },
    { key: 'id', desc: 'Item4' },
    { key: 'id', desc: 'Item4' },
];

function App() {
    const [trigger, setTrigger] = useState(true);

    return (
        <div className='App'>
            <h1>Input suggestion</h1>
            <InputSuggestion placeholder='Search' category={2} numberField={[]} columns={COLUMNS} trigger={trigger} />
        </div>
    );
}

export default App;
