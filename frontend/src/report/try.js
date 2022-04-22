'use strict';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default function generateProjectReport(email,primary_data) {

    let data_member = "dc@gmail.com";
    //var total_hour_worked=0;
    /************************************************************************************************** MOCK DATA *********************************************************************************** */
    let primary_data2 = {
        projectName: "Test Project 2",
        sprints: [
            {
                startDate: "2022/06/19",
                endDate: "2022/06/19",
                userStories: [
                    {
                        asA: "Team Member",
                        iWanTo: "Generate summary report",
                        initialCostEstimate: 250.00,
                        initialRelativeEstimate: 6,
                        relativeReEstimate: 2,
                        costReEstimate: 500.00,
                        priority: 1,
                        tasks: [{
                            description: "[Chore] create 1st task function",
                            member: "dc@gmail.com",
                            status: "Closed",
                            hoursWorked: 7
                        },
                        {
                            description: "[Chore] 2nd task using JSPDF",
                            member: "test@yahoo.com",
                            status: "Closed",
                            hoursWorked: 8
                        },
                        {
                            description: "[Chore] create another function",
                            member: "dc@gmail.com",
                            status: "Closed",
                            hoursWorked: 10
                        },
                        {
                            description: "[Chore] create another 2 function",
                            member: "dc@gmail.com",
                            status: "Closed",
                            hoursWorked: 7
                        },
                        {
                            description: "[Chore] gen pdf using JSPDF",
                            member: "test@yahoo.com",
                            status: "Closed",
                            hoursWorked: 8
                        },
                        ]

                    },

                ]
            },
            {
                startDate: "2019/11/11",
                endDate: "2019/12/12",
                userStories: [
                    {
                        asA: "Team Member",
                        iWanTo: "Copy user something",
                        initialCostEstimate: 400.00,
                        initialRelativeEstimate: 6,
                        relativeReEstimate: 2,
                        costReEstimate: 800.00,
                        priority: 1,
                        tasks: [{
                            description: "[Chore] add a service file",
                            member: "test@yahoo.com",
                            status: "Closed",
                            hoursWorked: 10
                        },
                        {
                            description: "[Chore] create a alert button",
                            member: "dc@gmail.com",
                            status: "Closed",
                            hoursWorked: 8
                        }
                        ]

                    }
                ]
            }


        ]
    };


    /************************************************************************************************** MOCK DATA *********************************************************************************** */


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

            /* doc.line(20, 38 + (i * 80), 195, 38 + (i * 80));
            doc.text(100, 45 + (i * 80), 'Start Date: ');
            doc.text(125, 45 + (i * 80), `${primary_data.sprints[i].startDate}`);
            doc.text(150, 45 + (i * 80), 'End Date: ');
            doc.text(175, 45 + (i * 80), `${primary_data.sprints[i].endDate}`); */

            if (primary_data.sprints[i].userStories != undefined) {

                let values = []; //userStories
                var userStories = primary_data.sprints[i].userStories;


                if (userStories != undefined) {
                    /*  values = userStories.map((element) => Object.values(element));
                     doc.autoTable({
                         startX: 20,
                         startY: 55+(i*40)+(userStories.length),
                         fillColor: 'red',
                         head: [['AS A', 'I WANT TO', 'SO I CAN', 'PRIORITY', 'REL ESTIMATE', 'COST ESTIMATE']],
                         body: values,
                         headerStyles: {
                             fillColor: [25, 137, 144],
                             fontSize: 9,
                         },
                     }); */

                    for (var j = 0; j <= primary_data.sprints[i].userStories.length; j++) {
                        if (primary_data.sprints[i].userStories != undefined) {
                            var userStories = primary_data.sprints[i].userStories[j];
                            if (userStories != undefined) {
                                let tasks = userStories.tasks;
                                let values2 = [];

                                doc.setFillColor(183,218,220);
                                doc.rect(15, 48 + (i * 100), 180, 12, 'F');
                                doc.text(20, 53 + (i * 100), `User Story: ${userStories.iWanTo}`);
                                // values2 = tasks.filter(item=>item.member === data_member).map((element) => Object.values(element));
                                //total_hour_worked=tasks.filter(item=>item.member === data_member).reduce((total, item) => item.hoursWorked + total, 0);
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


/* for (var j = 0; j <= primary_data.sprints[i].userStories.length; j++) {
    //console.log(primary_data.sprints[i].userStories)
     //   doc.text(20,250,primary_data.sprints[i].userStories);
    let values2 = []; //userStories subtasks
    var tasks = primary_data.sprints[i].userStories[j].tasks;
    if(tasks!=undefined){
        values2=tasks.map((element) => Object.values(element));       
        doc.autoTable({
            startX: 20,
            startY: 150,
            fillColor: 'red',
            head: [['DESCRIPTION', 'MEMBER', 'STATUS','HOURS WORKED']],
            body: values2,
            headerStyles: {
                fillColor: [25,137,144],
                fontSize: 9,
            },
        });
        }

} */