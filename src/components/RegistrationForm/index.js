import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

class RegistrationForm extends Component {
  state = {
    username: '',
    password: '',
    isShowUsernameError: false,
    isShowPasswordError: false,
    isShowSubmitResult: false,
    message: '',
  };

  onBlurUsername = () => {
    const isValidUsername = this.validUsername();
    this.setState({ isShowUsernameError: !isValidUsername });
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  renderUsernameField = () => {
    const { username, isShowUsernameError } = this.state;
    const classname = isShowUsernameError
      ? 'name-input-field error-field'
      : 'name-input-field';
    return (
      <div className="input-container">
        <label className="label-input" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className={classname}
          id="username"
          value={username}
          placeholder="Username"
          onBlur={this.onBlurUsername}
          onChange={this.onChangeUsername}
        />
      </div>
    );
  };

  onBlurPassword = () => {
    const isValidPassword = this.validPassword();
    this.setState({ isShowPasswordError: !isValidPassword });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderPasswordField = () => {
    const { password, isShowPasswordError } = this.state;
    const classname = isShowPasswordError
      ? 'name-input-field error-field'
      : 'name-input-field';
    return (
      <div className="input-container">
        <label className="label-input" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className={classname}
          id="password"
          value={password}
          placeholder="Password"
          onBlur={this.onBlurPassword}
          onChange={this.onChangePassword}
        />
      </div>
    );
  };

  validUsername = () => {
    const { username } = this.state;
    return username.trim() !== '';
  };

  validPassword = () => {
    const { password } = this.state;
    return password.trim() !== '';
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const isValidUsername = this.validUsername();
    const isValidPassword = this.validPassword();

    if (isValidUsername && isValidPassword) {
      try {
        const { username, password } = this.state;
        const response = await axios.post('https://simpletodobackend-1.onrender.com/register', {
          username,
          password,
        });

        this.setState({
          message: response.data.message || 'Registration Successful!',
          isShowSubmitResult: true,
        });
      } catch (error) {
        console.error('Error registering user:', error);
        this.setState({
          message: 'Error registering user. Please check your backend server.',
          isShowSubmitResult: true,
        });
      }
    } else {
      this.setState({
        isShowUsernameError: !isValidUsername,
        isShowPasswordError: !isValidPassword,
        isShowSubmitResult: false,
      });
    }
  };

  renderSubmitForm = () => {
    const { isShowUsernameError, isShowPasswordError } = this.state;
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderUsernameField()}
        {isShowUsernameError && <p className="error-message">Required</p>}
        {this.renderPasswordField()}
        {isShowPasswordError && <p className="error-message">Required</p>}
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    );
  };

  renderSubmitResult = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="image"
      />
      <p>{this.state.message}</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.submitAnotherResponse}
      >
        Submit Another Response
      </button>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSignIn}
      >
        LogIn
      </button>
    </>
  );

  onClickSignIn = () => {
    const { navigate } = this.props;
    navigate('/login');
  };

  submitAnotherResponse = () => {
    this.setState({
      isShowSubmitResult: false,
      username: '',
      password: '',
      isShowUsernameError: false,
      isShowPasswordError: false,
      message: '',
    });
  };

  render() {
    const { isShowSubmitResult } = this.state;
    return (
      <div className="bg-container">
        <h1 className="registration-heading">Registration</h1>
        {isShowSubmitResult ? this.renderSubmitResult() : this.renderSubmitForm()}
      </div>
    );
  }
}

const RegistrationFormWithNavigate = (props) => {
  const navigate = useNavigate();
  return <RegistrationForm {...props} navigate={navigate} />;
};

export default RegistrationFormWithNavigate;
