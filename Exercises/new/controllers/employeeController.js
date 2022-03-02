const request = require("supertest");
const { getServer,getDB } = require("../app");
let { db } = require("../db");
let server = null;

describe("api/employees",()=>{
    server = getServer();
    db = getDB();
    const Employee = db.Employee;

    describe("addEmployee", ()=>{
        const tmpEmp = {
            name: "nimasha madumali",
            address: "aaaaaaaaaaaaaaaaaaaaaaaa",
            dob: "22-11-2001",
            email: "test@gmail.com",
            contact_no: "0771597735"
        };

        it('should return 200 if create an employee with valid data',async()=>{
            const emp = {
                name: "nimasha madumali",
                address: "aaaaaaaaaaaaaaaaaaaaaaaa",
                dob: "22-11-2001",
                email: "test3@gmail.com",
                contact_no: "0771597736"
            };

            const result = await request(server).post("/api/employee").send(emp);
            expect(result.status).toBe(200);
        })
              
        it('should return 404 when creating another employee with same email',async()=>{
            const dbEmp= {
                name: "nimasha madumali",
                address: "aaaaaaaaaaaaaaaaaaaaaaaa",
                dob: "22-11-2001",
                email: "test@gmail.com",
                contact_no: "0771597734"
                };
        
              const Employee = db.Employee;
              const employee = await Employee.create(dbEmp);
        
              const result = await request(server).post("/api/employee").send(tmpEmp);
        
              await employee.destroy();
        
              expect(result.status).toBe(404);
        })

        it('should return 404 when creating another employee with same contact no',async()=>{
            const dbEmp= {
                name: "nimasha madumali",
                address: "aaaaaaaaaaaaaaaaaaaaaaaa",
                dob: "22-11-2001",
                email: "test5@gmail.com",
                contact_no: "0771597735"
                };
        
              const Employee = db.Employee;
              const employee = await Employee.create(dbEmp);
        
              const result = await request(server).post("/api/employee").send(tmpEmp);
        
              await employee.destroy();
        
              expect(result.status).toBe(404);
        })

        it('should return 404 when creating another employee with same id',async()=>{
            const dbEmp= {
                name: "nimasha madumali",
                address: "aaaaaaaaaaaaaaaaaaaaaaaa",
                dob: "22-11-2001",
                email: "test@gmail.com",
                contact_no: "0771597735"
                };
        
              const Employee = db.Employee;
              const employee = await Employee.create(dbEmp);
        
              const result = await request(server).post("/api/employee").send(tmpEmp);
        
              await employee.destroy();
        
              expect(result.status).toBe(404);
        })
        
    })

    describe("getEmployee", ()=>{
        it('should return 200 when attempting to read employees',async()=>{
            const result = await request(server).get("/api/employee").send();
            expect(result.status).toBe(200);
        })

        it("should return 404 when attempting to read an existing employeet with invalid id", async () => {
            const result = await request(server).get("/api/employee/100").send();
            expect(result.status).toBe(404);
          });

        it('should return 200 when attempting to read employee by given empId', async()=>{
            const result = await request(server).get("/api/employee/1").send();
            expect(result.status).toBe(200);
        })
    })
    
    describe("updateEmployee",()=>{
        const tmpEmp = {
            Name: "nimasha madumali",
            address: "aaaaaaaaaaaaaaaaaaaaaaaa",
            dob: "22-11-2001",
            Email: "test@gmail.com",
            ContactNo: "1231231244"
        };
        
        it('should return 200 when attempting to update an employee with a valid id',async()=>{
            const employee = await db.Employee.create(tmpEmp);
      
            //get the created employees id
            const employees = await db.Employee.find({
              limit: 1,
              order: [["id", "DESC"]],
            });
      
            const empID = employees[0].dataValues.id;
      
            const result = await request(server).get("/api/employee/" + empID)
            expect(result.status).toBe(200);
        })

        it('should return 404 when attempting to update an employee with a invalid id',async()=>{
            const result = await request(server).put("/api/employee/10")
            expect(result.status).toBe(404);
        })

        it('should return 404 when attempting to update an employee with another employees mail',async()=>{
            const emp1 = {
                Name: "upali ranawaka",
                address: "bbbbbbbbbbbbbbbbbbbbbbb",
                dob: "04-10-1966",
                Email: "test1@gmail.com",
                ContactNo: "0771109000"
            };
            const emp2 = {
                Name: "upali ranawaka",
                address: "bbbbbbbbbbbbbbbbbbbbbbb",
                dob: "04-10-1966",
                Email: "test2@gmail.com",
                ContactNo: "0771109000"
            };

            let employee = db.Employee.create(emp1);

            employee = db.Employee.create(emp2);

            //get the last employee id to update
            const employees = await db.Employee.find({
                limit: 1,
                order: [["id", "DESC"]],
            });
            const lastempID = employees[0].dataValues.id;

            const result = await request(server).put("/api/employee/" + lastempID)
            expect(result.status).toBe(404);
        })

        it('should return 404 when attempting to update an employee with another employees contact no',async()=>{
            const emp1 = {
                Name: "upali ranawaka",
                address: "bbbbbbbbbbbbbbbbbbbbbbb",
                dob: "04-10-1966",
                Email: "test1@gmail.com",
                ContactNo: "0771109000"
            };
            const emp2 = {
                Name: "upali ranawaka",
                address: "bbbbbbbbbbbbbbbbbbbbbbb",
                dob: "04-10-1966",
                Email: "test1@gmail.com",
                ContactNo: "0771108888"
            };

            let employee = db.Employee.create(emp1);

            employee = db.Employee.create(emp2);

            //get the last employee id to update
            const employees = await db.Employee.find({
                limit: 1,
                order: [["id", "DESC"]],
            });
            const lastempID = employees[0].dataValues.id;

            const result = await request(server).put("/api/employee/" + lastempID)
            expect(result.status).toBe(404);
        })

    })

    describe("deleteEmployee",()=>{
        it("should return 404 when attempting to delete a non exisiting employee", async () => {
            const result = await request(server).delete("/api/employee/15").send();
            expect(result.status).toBe(404);
          });
      
          it("should return 200 when attempting to delete an exisiting employee with a valid id", async () => {
            const tmpEmp= {
                name: "nimasha madumali",
                address: "aaaaaaaaaaaaaaaaaaaaaaaa",
                dob: 22-11-2001,
                email: "test@gmail.com",
                contact_no: "0771597735"
                };
        
            //insert a valid employee
            let employee = await db.Employee.create(tmpEmp);

            //read the last inserted employee
            let employees = await db.Employee.find({
                limit: 1,
                order: [["id", "DESC"]],
            });
            const id = employees[0].dataValues.id;

            const result = await request(server).delete("/api/employee/" + id)

            expect(result.status).toBe(200);
        });
    });
})
