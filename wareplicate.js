//problem 1: 
class Employee {
    constructor(firstName, department, designation, salary, raiseEligible) {
        this.firstName = firstName;
        this.department = department;
        this.designation = designation;
        this.salary = salary;
        this.raiseEligible = raiseEligible;
        this.wfh = false; 
    }
//problem 5: 
    giveRaise() {
        if (this.raiseEligible) {
            this.salary *= 1.1; 
            this.raiseEligible = false; 
        }
    }
//problem 6: 
    setWfh(wfh) {
        this.wfh = wfh;
    }
}

//problem 2: 
class Company {
    constructor(companyName, website) {
        this.companyName = companyName;
        this.website = website;
        this.employees = [];
    }

    addEmployee(employee) {
        this.employees.push(employee);
    }
//problem 4
    calculateTotalSalary() {
        return this.employees.reduce((total, employee) => total + employee.salary, 0);
    }
//problem 5
    giveRaises() {
        this.employees.forEach(employee => employee.giveRaise());
    }

    updateWfhStatus(employeesWorkingFromHome) {
        this.employees.forEach(employee => {
            employee.setWfh(employeesWorkingFromHome.includes(employee.firstName));
        });
    }
}

//1st problem 
let sam = new Employee("Sam", "Tech", "Manager", 40000, true);
let mary = new Employee("Mary", "Finance", "Trainee", 18500, true);
let bill = new Employee("Bill", "HR", "Executive", 21200, false);
//2nd problem 
let company = new Company("Tech Stars", "www.techstars.site");
company.addEmployee(sam);
company.addEmployee(mary);
company.addEmployee(bill);

// problem 3
let anna = new Employee("Anna", "Tech", "Executive", 25600, false);
company.addEmployee(anna);

// problem 4
let totalSalary = company.calculateTotalSalary();

// problem 5
company.giveRaises();

// problem 6
let employeesWorkingFromHome = ['Anna', 'Sam'];
company.updateWfhStatus(employeesWorkingFromHome);

let outputDiv = document.getElementById('output');
outputDiv.innerHTML = `
    <h2>Total company salary: $${totalSalary}</h2>
    <h3>After giving raises:</h3>
    <pre>${JSON.stringify(company.employees, null, 2)}</pre>
    <h3>After updating WFH status:</h3>
    <pre>${JSON.stringify(company.employees, null, 2)}</pre>
`;
