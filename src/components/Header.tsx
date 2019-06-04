import React, {SyntheticEvent} from 'react';
import {ViewFilterMode} from '../App';

interface IProps {
  onAdd: Function
  onViewFilterChange: Function
}

interface IState {
  value: string
  viewFilterValue: ViewFilterMode
  buttonEnabled: boolean
}

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: '',
      viewFilterValue: ViewFilterMode.All,
      buttonEnabled: false
    };
  }
  
  handleViewChange = (event: SyntheticEvent) => {
    console.log('event '+ event);
    const value = parseInt((event.target as HTMLSelectElement).value);

    this.setState({
      viewFilterValue: value as unknown as ViewFilterMode
    });
    console.log('value2 '+ value as unknown as ViewFilterMode);
    this.props.onViewFilterChange(value);
  };
  
  
  handleChange = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement).value;
    this.setState({
      value,
      buttonEnabled: (value.length > 0)
    });
  };
  
  handleClick = () => {
    if (this.state.buttonEnabled) {
      this.props.onAdd(this.state.value)
    }
  };
  
  render(): React.ReactElement {
    return (
      <header>
        <h1>My Todo list</h1>
        <input value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.handleClick}
                disabled={!this.state.buttonEnabled}>Add
        </button>
        
        <div>
          <p>View Filter</p>
          <select value={this.state.viewFilterValue} onChange={this.handleViewChange}>
            <option value={ViewFilterMode.All}>All</option>
            <option value={ViewFilterMode.Completed}>Completed</option>
            <option value={ViewFilterMode.favorite}>Favorite</option>
          </select>
        </div>
      </header>
    )
  }
}

export default Header;