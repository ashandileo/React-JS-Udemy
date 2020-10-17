import React, { useState } from 'react';

import './AddPerson.css';

const addPerson = (props) => {
    const [state, setState] = useState({
        name: '',
        age: null
    })

    const nameChangeHandler = (event) => {
        setState({
            ...state,
            name: event.target.value
        })
    }

    const ageChangeHandler = (event) => {
        setState({
            ...state,
            age: event.target.value
        })
    }

    return (
        <div className="AddPerson">
            <input 
                type="text"
                placeholder="Name"
                onChange={nameChangeHandler}
                value={state.name}
            />
            <input
                type="number"
                placeholder="Age"
                onChange={ageChangeHandler}
                value={state.age}
            />
            <button onClick={() => props.personAdded(state.name, state.age)}>Add Person</button>
        </div>
    );
}

export default addPerson;