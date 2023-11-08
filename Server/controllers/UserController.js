const { Users } = require("../models/User");
const bcrypt = require("bcrypt");
const generateAuthToken = require("../common/auth");
const timezone = "Asia/Calcutta";
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");


const registerUser=async(req,res)=>{
    try {
        const { username, password } = req.body;
    
        // Check if the username already exists
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
          return res.status(403).send({msg:"Already registered. Please log in!"});
        }
    
        // Generate a unique ID using uuidv4
        const _id = uuidv4();
    
        // Hash the password asynchronously using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Create a new User object
        const user = new Users({
          _id,
          username,
          password: hashedPassword, // Store the hashed password
        });
    
        // Save the user in the database
        await user.save();
    
        // Generate an authentication token
        const payload = { username };
        const token = generateAuthToken({ payload });
        const UserObj={
          username:username,
          token:token
        }
    
        // Set the token in the response header and send the lowercase username in the response body
        res.status(200).header("x-auth-token", token).send(UserObj);
      } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send({msg:"Internal Server Error"});
      }
}


const userLogin=async(req,res)=>{
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await Users.findOne({ username });
  
      // If user does not exist, return an error response
      if (!user) {
        return res.status(403).send({msg:
           "Invalid username or password",
      });
      }
  
      // Compare the provided password with the user's stored password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords do not match, return an error response
      if (!passwordMatch) {
        return res.status(403).send({
          msg: "Invalid username or password",
        });
      }
  
  
      // Create a payload containing the username
      const payload = { username };
  
      // Generate an authentication token
      const token = generateAuthToken(payload);
  
      // Set the token in the response header and send a success response
      res.status(200).header("x-auth-token", token).send({
        username,
        token,
      });
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error(error);
      res.status(500).send({
        msg: "Internal server error",
      });
    }
}




module.exports = {
    registerUser,
    userLogin,

};