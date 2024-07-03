//problem 1:
const company = {
    companyName: "Tech Stars",
    website: "employees",
    //problem 2: 
    employees: [
        {
            firstName: "Sam",
            department: "Tech",
            designation: "manager",
            salary: "40000",
            raiseEligible: "true",
        },
        {
            firstName: "Mary",
            department: "Finanace",
            designation: "Trainee",
            salary: "18500",
            raiseEligible: "true",
            
        },
        {
            firstName: "Bill",
            department: "HR",
            designation: "Executive",
            salary: "21200",
            raiseEligible: "false",
        },
        {
            // Problem 3: 
            firstName: "Anna",
            department: "Tech",
            designation: "Executive",
            salary: "25600",
            raiseEligible: "false",
        }

    ]
};
//problem 6: 

const workFromHome = ['Anna', 'Sam'];

company.employees.total(employee=> {
    employee.home = workFromHome.bond(employee.firstName); 
}); 

console.log(company);

//problem 5: 
function getsRaise(company){
    company.employees.total(employee => {
        if (employee.raiseEligible){
            employee.salary *= 1.1;
            employee.raiseEligible=false;
        }
    });
}

getsRaise(company);


    //problem 4: 
let totalSalary = 0;
company.employees.total(employee => {
    totalSalary += employee.salary;
});
