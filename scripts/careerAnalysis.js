const GROQ_API_KEY = "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";

const GROQ_URL =
    "https://api.groq.com/openai/v1/chat/completions";

const MODEL = "openai/gpt-oss-20b";

// ============================================================
// GET STUDENT FROM ALLSTUDENT USING ROLL NUMBER
// ============================================================

function findStudent() {

    const rollInput =
        document.getElementById("rollNumberInput");

    const rollNo =
        rollInput.value.trim();

    if (!rollNo) {
        throw new Error("Please enter a Roll Number.");
    }

    const AllStudent =
        JSON.parse(localStorage.getItem("AllStudent"));

    if (!AllStudent || !Array.isArray(AllStudent)) {
        throw new Error("Student data not found.");
    }

    const student =
        AllStudent.find(
            student =>
                String(student.rollno).trim() === rollNo
        );

    if (!student) {
        throw new Error(
            "No student found with this Roll Number."
        );
    }

    return student;
}


// ============================================================
// CREATE STUDENT DATA FOR GROQ
// ============================================================

function prepareStudentData(student) {

    return {
        name: student.name || "",
        rollno: student.rollno || "",
        enrollmentYear: student.enrollmentYear || "",
        dob: student.dob || "",

        branch: student.branch || "",
        subject: student.subject || "",
        level: student.level || "",
        currentSem: student.currentSem || "",

        cgpa: student.cgpa || "",

        careerGoal: student.careerGoal || "",

        skills: student.skills || "",
        languages: student.languages || "",

        certifications:
            student.certifications || "",

        projects:
            student.projects || "",

        internships:
            student.internships || "",

        hobbies:
            student.hobbies || "",

        clubs:
            student.clubs || "",

        github:
            student.github || "",

        linkedin:
            student.linkedin || "",

        socialHandles:
            student.socialHandles || ""
    };
}


// ============================================================
// CREATE PROMPT
// ============================================================

function createCareerPrompt(student) {

    return `
You are an expert academic and career advisor.

Analyze the student's information and provide a personalized
career analysis.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do not return Markdown.
3. Do not add extra keys.
4. Do not add extra sections.
5. Do not invent information.
6. Use ONLY the information provided.
7. If a required piece of information is empty, missing,
   null, undefined, or unavailable, do NOT guess it.
8. When information required for a section is missing,
   write exactly:

"No enough data given"

9. Still analyze the other sections using the information
   that is available.
10. Do not assume that missing information means the student
    has no skill or experience.
11. Keep the analysis personalized and concise.

STUDENT DATA:

${JSON.stringify(student, null, 2)}


RETURN EXACTLY THIS JSON STRUCTURE:

{
    "bestCareer": {
        "title": "",
        "description": ""
    },

    "whyThisCareer": "",

    "careerCompatibility": {
        "score": 0,
        "description": ""
    },

    "alternativeCareers": [
        {
            "title": "",
            "score": 0,
            "description": ""
        },
        {
            "title": "",
            "score": 0,
            "description": ""
        },
        {
            "title": "",
            "score": 0,
            "description": ""
        }
    ],

    "academicStrengths": "",

    "academicWeaknesses": "",

    "skillProfile": "",

    "skillGaps": "",

    "careerRoadmap": [
        {
            "step": 1,
            "title": "",
            "description": ""
        },
        {
            "step": 2,
            "title": "",
            "description": ""
        },
        {
            "step": 3,
            "title": "",
            "description": ""
        }
    ],

    "majorRisk": "",

    "tipToConquer": "",

    "nextAction": ""
}

FINAL RULE:

Return ONLY the JSON object.
`;
}


// ============================================================
// CALL GROQ
// ============================================================
async function getCareerAnalysis(student) {

    const prompt = createCareerPrompt(student);

    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },

            body: JSON.stringify({

                model: "openai/gpt-oss-20b",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are an expert academic and career advisor. Return only valid JSON."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.3,

                max_completion_tokens: 1200,

                response_format: {
                    type: "json_object"
                }
            })
        }
    );


    if (!response.ok) {

        const errorData = await response.json();

        console.error("Groq Error:", errorData);

        throw new Error(
            `HTTP ${response.status}: ${errorData?.error?.message ||
            "Groq API request failed."
            }`
        );
    }


    const data = await response.json();

    const content =
        data?.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error("Groq returned an empty response.");
    }

    return JSON.parse(content);
}

// ============================================================
// DISPLAY DATA
// ============================================================
function displayCareerAnalysis(result) {

    console.log("Groq Result:", result);

    // BEST CAREER
    document.getElementById("bestCareerTitle").textContent =
        result.bestCareer?.title || "No enough data given";

    document.getElementById("bestCareerDescription").textContent =
        result.bestCareer?.description || "No enough data given";


    // WHY THIS CAREER
    document.getElementById("whyThisCareer").textContent =
        result.whyThisCareer || "No enough data given";


    // CAREER COMPATIBILITY
    document.getElementById("careerScore").textContent =
        result.careerCompatibility?.score != null
            ? `${result.careerCompatibility.score}%`
            : "N/A";

    document.getElementById(
        "careerCompatibilityDescription"
    ).textContent =
        result.careerCompatibility?.description ||
        "No enough data given";


    // ALTERNATIVE CAREERS
    const alternatives =
        Array.isArray(result.alternativeCareers)
            ? result.alternativeCareers
            : [];

    for (let i = 0; i < 3; i++) {

        const career =
            alternatives[i] || {};

        const number = i + 1;

        document.getElementById(
            `alternativeCareer${number}Title`
        ).textContent =
            career.title || "No enough data given";

        document.getElementById(
            `alternativeCareer${number}Score`
        ).textContent =
            career.score != null
                ? `${career.score}%`
                : "N/A";

        document.getElementById(
            `alternativeCareer${number}Description`
        ).textContent =
            career.description ||
            "No enough data given";
    }


    // ACADEMIC
    document.getElementById(
        "academicStrengths"
    ).textContent =
        result.academicStrengths ||
        "No enough data given";


    document.getElementById(
        "academicWeaknesses"
    ).textContent =
        result.academicWeaknesses ||
        "No enough data given";


    // SKILLS
    document.getElementById(
        "skillProfile"
    ).textContent =
        result.skillProfile ||
        "No enough data given";


    document.getElementById(
        "skillGaps"
    ).textContent =
        result.skillGaps ||
        "No enough data given";


    // ROADMAP
    const roadmap =
        Array.isArray(result.careerRoadmap)
            ? result.careerRoadmap
            : [];

    for (let i = 0; i < 3; i++) {

        const step =
            roadmap[i] || {};

        const number = i + 1;

        document.getElementById(
            `roadmap${number}Title`
        ).textContent =
            step.title ||
            "No enough data given";

        document.getElementById(
            `roadmap${number}Description`
        ).textContent =
            step.description ||
            "No enough data given";
    }


    // MAJOR RISK
    document.getElementById(
        "majorRisk"
    ).textContent =
        result.majorRisk ||
        "No enough data given";


    // TIP TO CONQUER
    document.getElementById(
        "tipToConquer"
    ).textContent =
        result.tipToConquer ||
        "No enough data given";


    // NEXT ACTION
    document.getElementById(
        "nextAction"
    ).textContent =
        result.nextAction ||
        "No enough data given";
}

// ============================================================
// ERROR
// ============================================================

function showError(message) {

    const error =
        document.getElementById("careerError");

    if (error) {

        error.textContent = message;
        error.style.display = "block";
    }

    console.error(message);
}


// ============================================================
// MAIN
// ============================================================

async function generateCareerAnalysis() {

    const loading = document.getElementById("careerLoading");
    const result = document.getElementById("careerResult");
    const error = document.getElementById("careerError");

    // Clear previous state
    error.textContent = "";
    error.style.display = "none";

    result.style.display = "none";

    // SHOW LOADING BEFORE API CALL
    loading.style.display = "flex";

    try {

        const student = findStudent();

        const studentData = prepareStudentData(student);

        const analysis = await getCareerAnalysis(studentData);

        console.log(
            "========== GROQ RESPONSE =========="
        );

        console.log(
            JSON.stringify(result, null, 2)
        );

        console.log(
            "===================================="
        );
        
        displayCareerAnalysis(analysis);

        result.style.display = "flex";

    }

    catch (err) {

        console.error(err);

        error.style.display = "block";

        if (err.message.includes("429")) {

            error.textContent =
                "Too many requests. Please wait a few seconds and try again.";

        } else {

            error.textContent =
                err.message || "Something went wrong.";

        }
    }

    finally {

        // ALWAYS HIDE LOADING
        loading.style.display = "none";
    }
}
// ============================================================
// BUTTON
// ============================================================

document
    .getElementById("generateCareerBtn")
    .addEventListener(
        "click",
        generateCareerAnalysis
    );