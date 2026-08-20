function printStudentDetails() {

    const printDetailSearch = document.getElementById("printDetailSearch");
    const rollNo = printDetailSearch.value.trim();

    if (!rollNo) {
        alert("Please enter a Roll Number.");
        return;
    }

    const AllStudent = JSON.parse(localStorage.getItem("AllStudent")) || [];

    const student = AllStudent.find(function (item) {
        return String(item.rollno).trim() === rollNo;
    });

    if (!student) {
        alert("No student found with Roll Number: " + rollNo);
        return;
    }

    function field(label, value) {
        return `
            <div style="
                min-width:0;
                overflow-wrap:break-word;
            ">
                <p style="
                    margin:0;
                    font-size:14px;
                    font-weight:500;
                    line-height:1.45;
                    font-family:'Teachers', sans-serif;
                ">
                    ${label}:
                    <strong style="font-weight:600;">
                        ${value || "—"}
                    </strong>
                </p>
            </div>
        `;
    }

    const imgSrc =
        student.image && student.image !== ""
            ? student.image
            : "../files/assets/default.png";

    let socialLinksHTML = "";

    if (student.linkedin && student.linkedin.trim() !== "") {
        socialLinksHTML += `
            <span style="
                color:#008200;
                font-size:12px;
                margin-right:14px;
            ">
                LinkedIn: ${student.linkedin}
            </span>
        `;
    }

    if (student.github && student.github.trim() !== "") {
        socialLinksHTML += `
            <span style="
                color:#008200;
                font-size:12px;
                margin-right:14px;
            ">
                GitHub: ${student.github}
            </span>
        `;
    }

    if (student.leetcode && student.leetcode.trim() !== "") {
        socialLinksHTML += `
            <span style="
                color:#008200;
                font-size:12px;
            ">
                LeetCode: ${student.leetcode}
            </span>
        `;
    }

    const card = document.createElement("div");

    card.style.cssText = `
        position:fixed;
        top:-99999px;
        left:-99999px;
        width:794px;
        box-sizing:border-box;
        padding:35px 40px;
        background:#ffffff;
        border:2px solid #008200;
        border-radius:8px;
        font-family:'Teachers', sans-serif;
        color:#222;
    `;

    card.innerHTML = `
        <div style="
            width:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:5px;
            margin-bottom:26px;
        ">

            <img
                src="${imgSrc}"
                crossorigin="anonymous"
                style="
                    width:120px;
                    height:120px;
                    object-fit:cover;
                    border-radius:50%;
                    border:2px solid #008200;
                    display:block;
                "
            >

            <h2 style="
                margin:5px 0 0 0;
                font-family:'Teachers', sans-serif;
                font-size:22px;
                line-height:1.2;
                text-decoration:underline;
                text-decoration-color:#008200;
            ">
                ${student.name || "—"}
            </h2>

            <p style="
                margin:0;
                color:#008200;
                font-size:14px;
            ">
                Roll No: ${student.rollno || "—"}
            </p>

            <p style="
                margin:0;
                font-size:14px;
                font-weight:600;
            ">
                Semester: ${student.currentSem || "—"}
            </p>

            <div style="
                margin-top:7px;
                text-align:center;
                line-height:1.8;
            ">
                ${socialLinksHTML}
            </div>
        </div>

        <div style="
            display:grid;
            grid-template-columns:repeat(3, minmax(0, 1fr));
            column-gap:30px;
            row-gap:17px;
            width:100%;
        ">
            ${field("Enrollment Year", student.enrollmentYear)}
            ${field("Date of Birth", student.dob)}
            ${field("Blood Group", student.bloodGroup)}
            ${field("Phone No", student.phone)}
            ${field("Personal Email", student.personalEmail)}
            ${field("Emergency Contact", student.nameEmergency)}
            ${field("Relationship", student.relationship)}
            ${field("Emergency Phone", student.emergencyPhone)}
            ${field("College Email", student.collegeEmail)}
            ${field("Level", student.level)}
            ${field("Subject", student.subject)}
            ${field("Branch", student.branch)}
            ${field("CGPA", student.cgpa)}
            ${field("Skills", student.skills)}
            ${field("Certifications", student.certifications)}
            ${field("Internships", student.internships)}
            ${field("Projects", student.projects)}
            ${field("Career Goal", student.careerGoal)}
            ${field("Hobbies", student.hobbies)}
            ${field("Languages", student.languages)}
            ${field("Achievements", student.achievements)}
            ${field("Clubs", student.clubs)}
            ${field("Social Handles", student.socialHandles)}
        </div>
    `;

    document.body.appendChild(card);

    html2canvas(card, {
        scale:2,
        useCORS:true,
        allowTaint:false,
        backgroundColor:"#ffffff"
    })
    .then(function (canvas) {

        document.body.removeChild(card);

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation:"portrait",
            unit:"mm",
            format:"a4"
        });

        const pageWidth = 210;
        const pageHeight = 297;

        const marginLeft = 10;
        const marginRight = 10;
        const marginTop = 10;
        const footerSpace = 10;

        const availableWidth =
            pageWidth - marginLeft - marginRight;

        const availableHeight =
            pageHeight - marginTop - footerSpace;

        const canvasRatio =
            canvas.height / canvas.width;

        let imgWidth = availableWidth;
        let imgHeight = imgWidth * canvasRatio;

        if (imgHeight > availableHeight) {
            imgHeight = availableHeight;
            imgWidth = imgHeight / canvasRatio;
        }

        const x = (pageWidth - imgWidth) / 2;
        const y = marginTop;

        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(
            imgData,
            "PNG",
            x,
            y,
            imgWidth,
            imgHeight
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7);
        pdf.setTextColor(130, 130, 130);

        pdf.text(
            "Made by Nodus",
            pageWidth / 2,
            pageHeight - 4,
            {
                align:"center"
            }
        );

        const fileName =
            (student.name || "Student") +
            "_" +
            (student.rollno || "0") +
            "_Nodus.pdf";

        pdf.save(fileName);

    })
    .catch(function (err) {

        if (document.body.contains(card)) {
            document.body.removeChild(card);
        }

        console.error("PDF generation error:", err);
        alert("PDF generation failed. Check console for details.");
    });
}