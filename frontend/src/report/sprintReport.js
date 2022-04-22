
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default function generateSprintReport(primary_data, sprint, projectName,sprintNum) {

    const doc = new jsPDF();

    //header
    doc.setFontSize(15)
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(25, 137, 144);
    doc.rect(130, 13, 70, 12, 'F');
    doc.text(140, 21, 'SPRINT COMPASS');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10)

    
    doc.text(20, 35, `Project Name:  ${projectName}`);
    doc.text(20, 40, `Sprint #:  ${sprintNum}`);


    doc.text(130, 35, `Start Date:  ${sprint.startDate}`);
    doc.text(130, 40, `End Date:  ${sprint.endDate}`);


    
    let values = []; //for userStory
    
    values = primary_data.map((element) => { return Object.values(element) });
    doc.autoTable({
        startX: 5,
        startY: 55,
        fillColor: 'red',
        head: [['UserStory Description', 'Relative ReEstimate', 'Cost ReEstimate']],
        body: values,
        headerStyles: {
            fillColor: [0, 0, 0],
            fontSize: 9,
        },
    });


    for (var j = 0; j <= primary_data.length; j++) {
        if (primary_data !== undefined) {
            let userStories = primary_data[j];
            if (userStories !== undefined) {
                let tasks = userStories.tasks;
                let values2 = [];//for tasks

                    values2 = tasks.map((element) => Object.values(element));

                    if (tasks.length > 0) {
                        let total_hour_worked = 0;
                        total_hour_worked += tasks.reduce((total, item) => item.hoursWorked + total, 0);

                        doc.setFillColor(183,218,220);
                         doc.rect(15, (78+ primary_data.length)+ (j * 60), 180, 12, 'F');
                        doc.text(20, (82+primary_data.length)+ (j * 60), `UserStory: ${userStories.iWantTo}`);
                        doc.autoTable({
                            startX: 20,
                            startY: (85+primary_data.length)+ (j * 60),
                            fillColor: 'red',
                            head: [['TASK DESCRIPTION', 'MEMBER', 'STATUS', 'HOURS WORKED']],
                            body: values2,
                            headerStyles: {
                                fillColor: [25, 137, 144],
                                fontSize: 9,
                            },
                        });

                        doc.text(140, (82+primary_data.length)+ (j * 60), `Total Hours Worked: ${total_hour_worked} hours`);
                    }

            }//end if

        }//end for
    }


    doc.save(`Sprint_${sprintNum}_report.pdf`);

}
