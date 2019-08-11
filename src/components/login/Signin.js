import React, { useState } from 'react';

import { Segment, Message, Form } from 'semantic-ui-react';

const Signin = props => {
  const [errorText, setErrorText] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { onLoginUser } = props;

  const handleLoginUser = async ({ email, password }) => {
    const result = await onLoginUser({ email, password });
    if (result && result.text) {
      setErrorText(result.text);
    }
  };

  return (
    <Segment basic>
      <h1>Login</h1>
      <Form onSubmit={() => handleLoginUser({ email, password })}>
        {!!errorText ? (
          <Message negative>
            <p>{errorText}</p>
          </Message>
        ) : (
          ''
        )}

        <Form.Input
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e, { value }) => setEmail(value)}
        />

        <Form.Input
          placeholder="Password"
          name="password"
          value={password}
          type="password"
          onChange={(e, { value }) => setPassword(value)}
        />
        <Form.Button primary fluid content="Login" />
      </Form>
    </Segment>
  );
};

export default Signin;
