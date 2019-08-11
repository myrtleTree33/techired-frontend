import React, { useState } from 'react';

import { Segment, Message, Form } from 'semantic-ui-react';

const Signup = props => {
  const [errorText, setErrorText] = useState();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCfm, setPasswordCfm] = useState();
  const [receivePromos, setReceivePromos] = useState(true);

  const { onCreateNewUser } = props;

  const handleCreateNewUser = async ({
    firstName,
    lastName,
    email,
    password,
    passwordCfm,
    receivePromos
  }) => {
    console.log(email, password, passwordCfm, receivePromos);
    const result = await onCreateNewUser({
      firstName,
      lastName,
      email,
      password,
      passwordCfm,
      receivePromos
    });

    if (result && result.text) {
      console.log(result);
      setErrorText(result.text);
    }
  };

  return (
    <Segment basic>
      <h1>Sign up</h1>
      <Form
        onSubmit={() =>
          handleCreateNewUser({
            firstName,
            lastName,
            email,
            password,
            passwordCfm,
            receivePromos
          })
        }
      >
        {!!errorText ? (
          <Message negative>
            <p>{errorText}</p>
          </Message>
        ) : (
          ''
        )}

        <Form.Input
          placeholder="Enter your first name"
          name="firstName"
          value={firstName}
          onChange={(e, { value }) => setFirstName(value)}
        />

        <Form.Input
          placeholder="Enter your last name"
          name="lastName"
          value={lastName}
          onChange={(e, { value }) => setLastName(value)}
        />

        <Form.Input
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e, { value }) => setEmail(value)}
        />

        <Form.Input
          placeholder="Enter your password"
          name="password"
          value={password}
          type="password"
          autocomplete="new-password"
          onChange={(e, { value }) => setPassword(value)}
        />

        <Form.Input
          placeholder="Confirm your password"
          name="passwordCfm"
          value={passwordCfm}
          type="password"
          autocomplete="new-password"
          onChange={(e, { value }) => setPasswordCfm(value)}
        />

        <Form.Checkbox
          defaultChecked
          name="receivePromos"
          label="By using this site, I agree to the terms and conditions.  I allow Techired.co to send me information, such as promotions and offers."
          value={receivePromos}
          onChange={() => setReceivePromos(!receivePromos)}
        />

        <Form.Button primary fluid content="Sign up" />
      </Form>
    </Segment>
  );
};

export default Signup;
