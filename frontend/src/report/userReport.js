
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default function generateProjectReport(email,primary_data) {

    const doc = new jsPDF();

    //header
    doc.setFontSize(15)
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(25, 137, 144);
    doc.rect(130, 13, 70, 12, 'F');
    doc.text(140, 21, 'SPRINT COMPASS');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10)

    doc.text(130, 35, `Project Name:  ${primary_data.projectName}`);
    doc.text(130, 40, `Team Name:  ${primary_data.teamName}`);

    //body
    for (var i = 0; i <= primary_data.sprints.length; i++) {
        if (primary_data.sprints[i] != undefined) {

            if (primary_data.sprints[i].userStories != undefined) {

                var userStories = primary_data.sprints[i].userStories;

                if (userStories != undefined) {


                    for (var j = 0; j <= primary_data.sprints[i].userStories.length; j++) {
                        if (primary_data.sprints[i].userStories != undefined) {
                            var userStories = primary_data.sprints[i].userStories[j];
                            if (userStories != undefined) {
                                let tasks = userStories.tasks;
                                let values2 = [];

                                doc.setFillColor(183,218,220);
                                doc.rect(15, 48 + (i * 100), 180, 12, 'F');
                                doc.text(20, 53 + (i * 100), `User Story: ${userStories.iWantTo}`);
                                let taskCopy = [...tasks];
                                taskCopy = tasks.filter(item => item.member === email);
                                values2 = taskCopy.map((element) => Object.values(element));

                                if (taskCopy.length>0) {
                                    let total_hour_worked = 0;
                                    total_hour_worked += taskCopy.reduce((total, item) => item.hoursWorked + total, 0);
                                    doc.autoTable({
                                        startX: 20,
                                        startY: 55 + (i * 100),
                                        fillColor: 'red',
                                        head: [['TASK DESCRIPTION', 'MEMBER', 'STATUS', 'HOURS WORKED']],
                                        body: values2,
                                        headerStyles: {
                                            fillColor: [25, 137, 144],
                                            fontSize: 9,
                                        },
                                    });
                                    
                                    doc.text(140, 53 + (i * 100), `Total Hours Worked: ${total_hour_worked} hours`);
                                }


                            }

                        }//end if

                    }//end for


                }
            }



        }
    }

    doc.save(`${primary_data.projectName}_report.pdf`);

}
