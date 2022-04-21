'use strict';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default function generateProjectReport(primary_data) {



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
                    values = userStories.map((element) => Object.values(element));
                    doc.autoTable({
                        startX: 20,
                        startY: 55,
                        fillColor: 'red',
                        head: [['AS A', 'I WANT TO', 'SO I CAN', 'PRIORITY', 'REL ESTIMATE', 'COST ESTIMATE']],
                        body: values,
                        headerStyles: {
                            fillColor: [25, 137, 144],
                            fontSize: 9,
                        },
                    });

                    for (var j = 0; j <= primary_data.sprints[i].userStories.length; j++) {
                        if (primary_data.sprints[i].userStories != undefined) {
                            var userStories = primary_data.sprints[i].userStories[j];
                            if (userStories != undefined) {
                                let tasks = userStories.tasks;
                                let values2 = [];
                                values2 = tasks.map((element) => Object.values(element));
                                doc.autoTable({
                                    startX: 20,
                                    startY: 150,
                                    fillColor: 'red',
                                    head: [['TASK DESCRIPTION', 'MEMBER', 'STATUS', 'HOURS WORKED']],
                                    body: values2,
                                    headerStyles: {
                                        fillColor: [25, 137, 144],
                                        fontSize: 9,
                                    },
                                });

                            }
                        }

                    }

                }
            }



        }
    }

    doc.save("invoice.pdf");

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