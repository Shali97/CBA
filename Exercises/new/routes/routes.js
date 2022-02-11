const employeeController = require("../controllers/employeeController.js")

    const router = require("express").Router();
    
    // add new employee
    router.post("/addEmployee",  employeeController.policy, employeeController.addEmployee);
  
    // view all employees
    router.get("/allEmployees", employeeController.getAllEmployees);

    // view a employee
    router.get("/:id", employeeController.getOneEmployee);
  
    // update employee
    router.put("/:id", employeeController.updateEmployee);
  
    // remove a employee with id
    router.delete("/:id", employeeController.deleteEmployee);
  
    module.exports = router