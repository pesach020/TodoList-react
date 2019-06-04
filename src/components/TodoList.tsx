import React from 'react';
import Todo from './Todo';
import {ITodo} from '../models/ITodo';

interface IProps  {
  todoCollection: any
  onCompletedToggle: any
  onFavoriteToggle: any
}

const TodoList: React.FC<IProps> = ({todoCollection, onCompletedToggle, onFavoriteToggle}) => {
  return (
    <ul>
      {todoCollection.map((todo: ITodo) =>
        <li key={todo.id}>
          <Todo id={todo.id} text={todo.text} completed={todo.completed} onCompletedToggle={onCompletedToggle} favorite={todo.favorite} onFavoriteToggle={onFavoriteToggle}/>
    </li>
      )}
    </ul>
  );
};
//

export default TodoList;