import React from 'react';
import './Todo.css';

interface IProps {
    id: string
    text: string
    completed: boolean,
    favorite: boolean,
    onCompletedToggle: Function
    onFavoriteToggle: Function
}

const Todo: React.FC<IProps> = ({id, text, completed, onCompletedToggle, onFavoriteToggle, favorite}) => {
    function onChange() {
        onCompletedToggle(id, !completed);
    }

    function favoriteChange() {
        console.log("favoriteChange");
        onFavoriteToggle(id, !favorite)
    }

    return (
        <div>
            <input checked={completed} type="checkbox" onChange={onChange}/>
            <span>
        {text}
      </span>
            <input id={"favoriteIcon"}  className="favorite" checked={favorite}  type= 'checkbox' onChange={favoriteChange}/>
        </div>
    );
};

export default Todo;