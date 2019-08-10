import React, { useState } from 'react';

import { Container, Segment, Button, Checkbox, Form } from 'semantic-ui-react';

const Signin = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { onLoginUser } = props;

  return (
    <Segment
      style={{
        minWidth: '350px'
      }}
    >
      <h1>Sign in.</h1>
      <Form onSubmit={() => onLoginUser({ email, password })}>
        <Form.Input
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e, { value }) => setEmail(value)}
        />

        <Form.Input
          placeholder="Password"
          name="Password"
          value={password}
          onChange={(e, { value }) => setPassword(value)}
        />
        <Form.Button primary fluid content="Login" />
      </Form>
    </Segment>
  );
};

export default Signin;
