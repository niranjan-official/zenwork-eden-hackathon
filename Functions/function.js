import { auth, db } from "@/firebase/config";
import { doc, getDoc, writeBatch } from "firebase/firestore";

export const getData = async (collection, document) => {

  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}
export function findOptimalPair(pairs) {
  // Initialize variables to store the best idle time and workload found so far
  let bestIdle = pairs[0][0]; // Initialize with the first pair's idle time
  let bestWorkload = pairs[0][1]; // Initialize with the first pair's workload
  let bestPair = pairs[0]; // Initialize with the first pair
  let bestIndex = 0; // Initialize with the index of the first pair

  // Iterate through each pair in the list, starting from the second pair
  pairs.slice(1).forEach((pair, index) => {
    let [idle, workload] = pair;
    // Check if the current pair satisfies the additional condition
    if (workload < bestWorkload || (workload === bestWorkload && idle > bestIdle)) {
      bestIdle = idle;
      bestWorkload = workload;
      bestPair = pair;
      bestIndex = index + 1; // Add 1 to get the correct index in the main array
    }
  });

  // Return an object containing the best pair and its index in the main array
  return {
    bestPair: bestPair,
    bestIndex: bestIndex
  };
}

export function calculateNumber(lastTime) {
  const LastTime = new Date(lastTime)
  let currentTime = new Date().getTime();
  let difference = currentTime - LastTime;
  // Normalize the difference to be between 0 and 100
  let normalized = Math.max(0, Math.min(100, difference));
  return normalized;
}
export const assignTask = async (emp, taskData) => {
  const random = generateRandomSixDigitNumber();
  try {
    const batch = writeBatch(db);
    const taskRef = doc(db, "tasks", random.toString());
    batch.set(taskRef, {
      title: taskData.title,
      description: taskData.description,
      skill: taskData.skill,
      deadline: taskData.deadline,
      difficulty: taskData.difficulty,
      assignee: emp.name
    });

    const docRef = doc(db, "users", emp.email);
    batch.update(docRef, {
      active: false,
      lastWorkLevel: getWorkLevel(taskData.difficulty),
      taskId: random
    });
    await batch.commit();
    return true;
  } catch (error) {
      console.log(error.message);
  }
}
function generateRandomSixDigitNumber() {
  // Generate a random number between 100000 (inclusive) and 999999 (inclusive)
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}
const getWorkLevel = (difficulty) => {
  switch (difficulty) {
      case 'Easy':
          return 1;
      case 'Medium':
          return 2;
      case 'Hard':
          return 3;
      default:
          break;
  }
}