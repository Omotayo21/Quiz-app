
export async function getQuizData() {
  try {
    const res = await fetch("/data.json");
    if (!res.ok) {
      throw new Error("Failed in fetching data"); // Use `new Error` for better error handling
    }
    const data = await res.json(); // Await the parsed JSON data
    return data.quizzes;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for further handling in the component
  }
}
