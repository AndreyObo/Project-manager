import { Document,
     Packer, 
     Paragraph, 
     AlignmentType, 
     convertInchesToTwip, 
     HeadingLevel,
     TextRun, 
     Table,
     TableRow,
     TableCell,
     WidthType,
     VerticalAlign } from "docx";
import { saveAs } from "file-saver";

export class DocxManager {
    constructor () {
        this.data = [
            {title:"cell 1"},
            {title:"cell 1"},
            {title:"cell 3"},
        ]
        this.rows=[]
    }

    GenerateRows(brekpoints) {
        console.log(brekpoints)
        this.rows.push(
            new TableRow({ 
                children: [
                    new TableCell({
                        width:{ size: 50, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:"Этапы", size:25, bold:true})]})],
                    }),
                    new TableCell({
                        width:{ size: 15, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:"Дата начала", size:25, bold:true})]
                    })],
                    }),
                    new TableCell({
                        width:{ size: 15, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:"Дата окончания", size:25, bold:true})]
                    })],
                    }), 
                    new TableCell({
                        width:{ size: 20, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:"Статус", size:25, bold:true})]
                    })],
                    }),
                ],
            })
        )

        if(brekpoints != null && brekpoints.length !=0) {
        for(let item of brekpoints) {
            this.rows.push(new TableRow({ 
                children: [
                    new TableCell({
                        width:{ size: 50, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:item.discription, size:25, bold:false})]
                        
                        })],
                    }),
                    new TableCell({
                        width:{ size: 15, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:item.startdata, size:25, bold:false})]
                        })],
                    }),
                    new TableCell({
                        width:{ size: 15, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:item.finishdata, size:25, bold:false})]
                        })],
                    }), 
                    new TableCell({
                        width:{ size: 20, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({alignment: AlignmentType.CENTER, children:[new TextRun({text:item.status, size:25, bold:false})]
                        })],
                    }),
                ],
            }))
        }
    }

    }

    CreateDocx(project) {

        const doc = new Document({
            sections:[{
                children:[
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children:[
                            new TextRun({
                                text:"Справка по проекту",
                                bold: true,
                                size:50,
                              }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            before: 300,
                            after:80,
                        },
                        children:[
                            new TextRun({
                                text:"Название проекта: "+project.name,
                                size:30,
                              }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            after:80,
                        },
                        children:[
                            new TextRun({
                                text:"Руководитель проекта: "+project.manager,
                                size:30,
                              }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            after:80,
                        },
                        children:[
                            new TextRun({
                                text:"Организация: "+project.org,
                                size:30,
                              }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            after:80,
                        },
                        children:[
                            new TextRun({
                                text:"Дата начала: "+project.startdate,
                                size:30,
                              }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            after:80,
                        },
                        children:[
                            new TextRun({
                                text:"Дата окончания: "+project.finishdate,
                                size:30,
                              }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            after:80,
                        },
                        children:[
                            new TextRun({
                                text:"Описание: "+project.discript,
                                size:30,
                              }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            before: 250,
                            after:100,
                        },
                        children:[
                            new TextRun({
                                text:"Этапы",
                                bold:true,
                                size:30,
                              }),
                        ]
                    }),
                    new Table({
                        rows: this.rows
                    })
                ]
            }]
        })

        Packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "example.docx");
        });
    }
}