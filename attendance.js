// Add event listeners for real-time input
document.getElementById("attendance").addEventListener("input", calculateAttendance);
document.getElementById("calculationType").addEventListener("change", calculateAttendance);

function calculateAttendance() {
    const totalClasses = 490;  // Total classes for the semester
    const completedClasses = 287;  // Classes completed so far
    const classesPerWeek = 29;  // Number of classes held per week
    const remainingMidWeeks = 2;  // Updated: Remaining weeks until the Midterm
    const remainingSemesterWeeks = 6;  // Updated: Remaining weeks until the Semester end

    // Get user inputs
    const userAttendance = parseFloat(document.getElementById("attendance").value);
    const calcType = document.getElementById("calculationType").value;

    // Ensure inputs are valid
    if (!userAttendance || isNaN(userAttendance) || userAttendance < 0 || userAttendance > 100) {
        document.getElementById("result").innerText = ""; // Clear result if invalid
        document.getElementById("expectedOutput").innerText = ""; // Clear additional output
        document.getElementById("incrementOutput").innerText = ""; // Clear increment output
        return;
    }

    if (!calcType) {
        document.getElementById("result").innerText = ""; // Clear result if invalid
        document.getElementById("expectedOutput").innerText = ""; // Clear additional output
        document.getElementById("incrementOutput").innerText = ""; // Clear increment output
        return;
    }

    // Calculate attended classes based on current attendance
    const attendedClasses = Math.ceil((userAttendance / 100) * completedClasses);

    let finalClasses;
    if (calcType === "M") {
        // Final classes for midterm (updated for 2 remaining weeks)
        finalClasses = completedClasses + (remainingMidWeeks * classesPerWeek);
    } else if (calcType === "S") {
        // Final classes for semester (updated for 6 remaining weeks)
        finalClasses = completedClasses + (remainingSemesterWeeks * classesPerWeek);
    }

    // Calculate final expected attendance if no classes are missed
    const finalAttendance = ((attendedClasses + (finalClasses - completedClasses)) / finalClasses) * 100;

    // Calculate attendance increment per class
    const remainingClasses = finalClasses - completedClasses;
    const attendanceIncrementPerClass = (100 / finalClasses);

    // Display the result
    document.getElementById("result").innerText = `Your expected final attendance is ${finalAttendance.toFixed(2)}%.`;

    // Detailed final output
    document.getElementById("expectedOutput").innerText = `Based on the current progress, you can aim for ${finalAttendance.toFixed(2)}% by the end of the ${calcType === 'M' ? 'Midterm' : 'Semester'}.`;

    // Display the increment per class
    document.getElementById("incrementOutput").innerText = `For each class you attend, your attendance will increase by approximately ${attendanceIncrementPerClass.toFixed(2)}%.`;
}