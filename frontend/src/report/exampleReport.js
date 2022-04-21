'use strict';
import { jsPDF } from "jspdf";

export default function generateReportList(data) {
    console.log(data)

    const doc = new jsPDF();

    //header
    doc.setFontSize(14)
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(142, 221, 226);
    doc.rect(20, 13, 58, 12, 'F');
    doc.text(25, 21, 'SPRINT COMPASS');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10)
    doc.text(140, 18, 'Project Name: ');
    doc.text(140, 25, 'Team Name: ');
    doc.text(170, 18, data.projectName);
    // doc.text(170, 18, data[0].deliveryDate.toString().slice(0, 10));
    doc.text(170, 25, data.teamName);


    //body
    for (var i = 0; i <= data.sprints.length; i++) {
        if (data.sprints[i] != undefined) {

            doc.line(20, 38 + (i * 80), 195, 38 + (i * 80));
            doc.text(100, 45 + (i * 80), 'Start Date: ');
            doc.text(125, 45 + (i * 80), `${data.sprints[i].startDate}`);
            doc.text(150, 45 + (i * 80), 'End Date: ');
            doc.text(175, 45 + (i * 80), `${data.sprints[i].endDate}`);

            for (var j = 0; j <= data.sprints[i].userStories.length; j++) {

                if (data.sprints[i].userStories != undefined) {
                    var userStories = data.sprints[i].userStories[j];
                    if(userStories!=undefined){
                            
                    doc.text(20, 55 + (i * 90), ` ${userStories.iWantTo}`);
                    doc.text(20, 65 + (i * 90), `${userStories.initialCostEstimate}`);
                    doc.text(25, 75 + (i * 90),`${ userStories.initialRelativeEstimate}`);
                    }
                }
            }
           
        } 
    }


    doc.setLineWidth(0.5);

    doc.save("exampleReport.pdf");




}
