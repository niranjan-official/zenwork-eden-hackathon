# ZenWork

### Assigning work to the right people at the right time

![Next.js](https://img.shields.io/badge/Next.js-14.2-blue?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-13.8.0-orange?style=for-the-badge&logo=firebase)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/Hackathon-EDEN%203.0-brightgreen?style=for-the-badge)
![Award](https://img.shields.io/badge/Award-2nd%20Place-silver?style=for-the-badge)

## 📜 Problem Statement
Create a dynamic work allocation algorithm that optimizes the task assignment process within a software development team. The algorithm should consider various factors such as team members' skills, availability, and workload to ensure fair distribution of work and minimize bottlenecks.

## 🏆 Hackathon
**Name:** EDEN 3.0  
**Host:** Marian College of Engineering, Trivandrum  
**Duration:** 24-hour hackathon held from May 13-14, 2024

**Achievement:** Awarded the **Second Position** at the hackathon!

## 💡 About the Project
Our software automates the employee work management system in companies, applicable to both technical and non-technical environments. It has the capability to assign tasks to the right employees by considering their availability, required skills, and, most importantly, their workload. The app has two divisions: the employer side and the employee side. Tasks created by the employer will be assigned to one of the employees considering the aforementioned factors.

## 🔑 Key Features
- **Framework:** Built using Next.js
- **Authentication & Database:** Utilized Firebase for user authentication and as the database
- **Algorithm:** Implemented a special mathematical algorithm for understanding the workload of each employee
- **Task Progress:** Feature for monitoring the progress level of tasks

## 🔍 Workload Algorithm
**Algorithm Description:** We achieve proper work allocation by assigning tasks to the employees with the highest idle time and the least workload.

**Algorithm:**
1. For each pair, extract the idle time, workload, availability, and skill set of the employee.
2. Check if the employee is available (`availability == True`) and has the necessary skill set (`skill_set >= required_skill_set`).
3. Also, check if the current pair satisfies the workload and idle time constraints:
   - If the workload of the current pair is less than the best workload found so far (`workload < best_workload`), or
   - If the workload of the current pair is equal to the best workload found so far, but the idle time is greater (`workload == best_workload and idle > best_idle`).

## 🚀 Features to be Implemented
- **Hierarchical Functioning Structure:** For various employer levels
- **Group Chat Feature:** To facilitate better communication among team members
