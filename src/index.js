import React, { Component } from 'react';
import { render } from 'react-dom';
// import Flatpickr from 'flatpickr';
import { Button } from 'ap-components-react';
import Drawer from './components/drawer/Drawer';
import DatePicker from './components/datePicker/DatePicker';
import DatePickerInput from './components/datePicker/DatePickerInput';
// import Flatpickr from './components/drawer/Drawer';
// import 'flatpickr/dist/themes/material_green.min.css'

import styles from './index.scss';
// import './components/datePicker/datePicker.scss';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onClick() {
    console.log('clicked');
  }
  onChange() {
    console.log('changed');
  }
  render() {
    return (
      <div className={styles.container}>
        <DatePicker id="date-picker" onChange={(e) => this.onChange(e)} datePickerType="single">
          <DatePickerInput
            className="some-class"
            labelText="Select a date"
            onClick={(e) => this.onClick(e)}
            onChange={(e) => this.onChange(e)}
            placeholder="mm/dd/yyyy"
            id="date-picker-input-id"
          />
        </DatePicker>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
// =======================
// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import Badge from './components/badge/Badge';
// import Header from './components/header/Header';
// function showAlert() {
//   alert('messages');
// }

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       number: ' ',
//       value: 'top-right',
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }
//   increase() {
//     this.setState({ number: this.state.number + 1 });
//   }
//   decrease() {
//     if (this.state.number > 0) {
//       this.setState({ number: this.state.number - 1 });
//     }
//   }
//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }
//   mainMenuConfig = {
//     title: 'Main menu',
//     mainMenuFields: [{ name: 'action A', onClickFunc: this.onMenuClick },
//     { name: 'action B', onClickFunc: this.onMenuClick }],
//   };
//   notificationMenuConfig = {
//     title: 'Notification',
//     link: '',
//     mainMenuFields: [{ name: 'Attention required', onClickFunc: this.onMenuClick }, { name: 'Asset and approvals', onClickFunc: this.onMenuClick }, { name: 'Approved assets', onClickFunc: this.onMenuClick }],
//   }
//   accountMenuConfig = {
//     title: 'Account',
//     link: '',
//     mainMenuFields: [{ name: 'Preferences', link: '' },
//     { name: 'Tutorial', link: '' },
//     { name: 'What\'s new', link: '' },
//     { name: 'About', link: '' },
//     { name: 'Logout', link: '' }],
//   };
//   render() {
//     const num = this.state.number;
//     const props1 = {
//       count: 1,
//       radius: 8,
//       position:
//       this.state.value,
//       size: 'auto',
//       onRequestAction: () => showAlert(),
//       isEnableHide: true,

//     };
//     return (
//       <div className="App" >
//         <div>
//           <h1>Badge integration with IBM Header Component </h1>
//           <Header mainMenuConfig={this.mainMenuConfig} notificationMenuConfig={this.notificationMenuConfig} accountMenuConfig={this.accountMenuConfig} number={num} ></Header>
//           <br /><br /><br />
//           <div>
//             <button type="button" onClick={() => { this.increase(); }}>increase</button>
//             <button type="button" onClick={() => { this.decrease(); }}>decrease</button>
//           </div>
//         </div>
//         <hr />
//         <h1>Badge  with Text</h1>
//         <br /><br />
//         <div style={{ textAlign: 'center' }}>
//           <Badge {...props1}>
//             Sample Text
//           </Badge>
//         </div>
//         <br /><br />
//         <div style={{ textAlign: 'center' }}>
//           <label htmlFor>
//             Pick your Badge position:
//           <select value={this.state.value} onChange={this.handleChange}>
//             <option value="top-right">Top-right</option>
//             <option value="top-left">Top-left</option>
//             <option value="bottom-left">Bottom-left</option>
//             <option value="bottom-right">Bottom-right</option>
//           </select>
//           </label>
//         </div>
//       </div >


//     );
//   }
// }

// render(<App />, document.getElementById('app'));
