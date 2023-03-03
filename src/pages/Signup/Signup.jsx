import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Button,
  Link,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function Signup() {
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [load, setload] = useState(false);
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  // all toasts are here
  const emailExist = () => {
    toast({
      title: "Email Already Exist.",
      description: "Please Enter New Email.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
  const signupSuccess = () => {
    toast({
      title: "Signup Successful.",
      description: "Thank You!!Login Now",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  // all toasts are here
  const postdata = async () => {
    setload(true);
    // for verify same email X
    try {
      let res = await fetch(`https://indiweb-api-json.vercel.app/users`);
      let data = await res.json();
      console.log(data);
      var mailAuth = false;
      for (let i in data) {
        if (data[i].email === email) {
          mailAuth = true;
          break;
        }
      }
      if (mailAuth === true) {
        // alert("Email already exist");
        emailExist();
        setload(false);
      }
    } catch (err) {
      console.log(err);
    }

    console.log("mailAuth", mailAuth);
    // for normal signup
    if (!mailAuth) {
      try {
        // let res = await fetch(`http://localhost:8080/users`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     name,
        //     email,
        //     password,
        //     mobile,
        //     gender,
        //     profile:
        //       "https://loopinfosol.in/themeforest/ekka-html-v33/ekka-admin/assets/img/vendor/u1.jpg",
        //     orders: [],
        //   }),
        // });
        // let data = await res.json();
        // console.log(data);
        let res;
        setTimeout(async () => {
          res = await axios.post(`https://indiweb-api-json.vercel.app/users`, {
            name,
            email,
            password,
            mobile,
            gender,
            profile:
              "https://loopinfosol.in/themeforest/ekka-html-v33/ekka-admin/assets/img/vendor/u1.jpg",
            orders: [],
          });
        }, 10000);
        setload(false);
        // alert("Signup Successfull!");
        signupSuccess();
        navigate("/login");
      } catch (error) {
        setload(false);
        signupSuccess();
      }

      setname("");
      setemail("");
      setPassword("");
    }
  };

  return (
    <div>
      <div className={styles.mainDiv}>
        <Heading
          fontFamily="cursive"
          textAlign="center"
          color="rgb(255, 81, 0)"
        >
          Sign up
        </Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
          />
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Select Your Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="female">Female</option>
          </Select>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Your Phone Number"
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Your Email Address"
          />
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <FormLabel>Re-Enter Password</FormLabel>
          <Input placeholder="Re-Enter Your Password" type="password" />
          <FormHelperText>
            We'll never share your Email & Password.
          </FormHelperText>
          <FormHelperText>
            If have an account click{" "}
            <Link color="rgb(255, 81, 0)" href="/login">
              Log in
            </Link>
          </FormHelperText>
          {load ? (
            <Button
              isLoading
              w="10%"
              marginLeft="42%"
              marginTop="30px"
              color="white"
              background="rgb(255, 81, 0)"
              colorScheme="teal"
              variant="solid"
            >
              Email
            </Button>
          ) : (
            <Button
              onClick={postdata}
              loadingText="Submitting"
              w="20%"
              marginLeft="42%"
              marginTop="30px"
              color="white"
              background="rgb(255, 81, 0)"
              _hover={{
                bg: "blue.500",
              }}
            >
              <span className={styles.signupButton}>Sign up</span>
            </Button>
          )}
        </FormControl>
      </div>
    </div>
  );
}

export default Signup;
