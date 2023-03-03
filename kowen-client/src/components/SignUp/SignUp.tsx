import React, { useState } from "react";
import { Carousel, Form, Button, ProgressBar } from "react-bootstrap";

const SignupForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const handleBack = () => {
    setActiveIndex(activeIndex - 1);
  };

  return (
    <div className="signup-form">
      <ProgressBar now={((activeIndex + 1) / 3) * 100} />
      <Carousel
        activeIndex={activeIndex}
        onSelect={(index) => setActiveIndex(index)}
      >
        <Carousel.Item>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            </Form.Group>
          </Form>
        </Carousel.Item>
        <Carousel.Item>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
            </Form.Group>
          </Form>
        </Carousel.Item>
        <Carousel.Item>
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
            </Form.Group>
          </Form>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default SignupForm;
