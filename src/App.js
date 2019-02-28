import React, { Component } from 'react';
import logo from './logo.svg';
import AntdSelect from 'antd/lib/select'
import './App.css';
class App extends Component {
  render() {
	  const Option = AntdSelect.Option
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
		  <AntdSelect value="whf" style={{ width: 200 }}>
			  <Option key="whf">whf</Option>
			  <Option key="zxj">zxj</Option>
		  </AntdSelect>
      </div>
    );
  }
}

export default App;
