const { setUser } = require("../middleWares/Auth");
const { Users, Projects } = require("../Model/Model");
const bcrypt = require('bcrypt')


const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
      const hashed = await bcrypt.hash(password, saltRounds);
      return hashed;
    } catch (err) {
      throw new Error('Error hashing password');
    }
  };
  
  // Compare plain password with hashed password
  const comparePassword = async (plainPassword, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (err) {
      throw new Error('Error comparing passwords');
    }
  };

  const handleSingUp = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await Users.findOne({ email });
  
      if (existingUser) {
        return res.json({
          success: false,
          message: 'Email already exists',
        });
      }
      const hashedPassword = await hashPassword(password)
      const newUser = new Users({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.json({
        success: true,
        message: 'Signup successful',
      });
  
    } catch (error) {
      res.json({
        success: false,
        message: error.message || 'Something went wrong',
      });
    }
  };

  const handleLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const loginUser = await Users.findOne({ email });
  
      if (!loginUser) {
        return res.json({
          success: false,
          message: 'Wrong email or password',
        });
      }
  
      const isMatch = await comparePassword(password, loginUser.password);
  
      if (!isMatch) {
        return res.json({
          success: false,
          message: 'Wrong email or password',
        });
      }
  
      const token = setUser(loginUser); // Assuming it returns a JWT token
       res.cookie('token', token, {
       secure: true,       // Ensures cookie is only sent over HTTPS
       sameSite: 'None',   // Enables cross-origin sharing
       partitioned: true,  // Adds the Partitioned attribute
       httpOnly: true,     // For security (optional, to prevent access from JS)
  });
  
      return res.json({
        success: true,
        message: 'Login successful',
        loginUser
      });
  
    } catch (error) {
      return res.json({
        success: false,
        message: error.message || 'Something went wrong',
      });
    }
  };

  const handleLogout = (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false, // true in production with HTTPS
    });
  
    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  };
  

  const handleAddProjectPost = async(req, res) => {
    const { title, id } = req.body
    try {
      const newTitle = new Projects({
        title,
        createdBy: id
      })

      await newTitle.save()
  
      if(newTitle) {
        res.json({
          'success': true,
          'message': 'Project add sucessfully'
        })
      }
    } catch (error) {
      res.json({
        'success': true,
        'message': error.message || 'Something went wrong'
      })
    }

  }

  const handleDeleteProject = async(req, res) => {
    const id = req.params.id
    
    try {
      const deletedProjects = await Projects.findByIdAndDelete(id)

    if(deletedProjects) {
      res.json({
        'success': true,
        'message': 'Project deleted successfully'
      })
    } else {
      res.json({
        'success': true,
        'message': 'Project not deleted'
      })
    }
    } catch (error) {
      res.json({
        'success': true,
        'message': error.message || 'Something went wrong'
      })
    }
  }

  const handleShowProjects = async(req, res) => {
    const id = req.params.id
    
    try {
      const projects = await Projects.find({ createdBy: id })
    res.json({
      projects
    })
    } catch (error) {
      res.json({
        'success': true,
        'message': error.message || 'Something went wrong'
      })
    }
  }

 
  
  

module.exports = {
    handleSingUp,
    handleLogin,
    handleAddProjectPost,
    handleDeleteProject,
    handleShowProjects,
    handleLogout
}
