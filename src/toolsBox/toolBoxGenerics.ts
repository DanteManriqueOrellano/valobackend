import * as fs from 'fs'
import * as PDFDocument from 'pdfkit';
import { zip, COMPRESSION_LEVEL } from 'zip-a-folder';  

export function generateFoldersInFolderProjects({pathAbsolute,nickNameProject}:{pathAbsolute:any[],nickNameProject:any}){

   pathAbsolute.map((val)=>{
    fs.mkdirSync(`${__dirname}/projects/${nickNameProject}${val}`,{recursive:true});
    
   })
        
}

export function generateTemplateFromIndex({typePage,pathAbsolute,nickNameProject}:{typePage:string ,dirFont:string,dirTemplate:string,pathAbsolute:any[],nickNameProject:string}){
    

    //plantilla
    //const googleDocTemplate = DriveApp.getFileById('1DCPjeQjZ7RWw8BUtWu_NDQTKe6-suNoBGdNSmjjGuLk');
    let newString:any[] 
    const doc = new PDFDocument({
      size: typePage
    });
    pathAbsolute.map((val:string)=>{
      newString = val.split("/")
      doc.pipe(fs.createWriteStream(`${__dirname}/projects/${nickNameProject}${val}/${newString[newString.length - 1]}.pdf`));
    })
    

    doc.font(`${__dirname}/assets/megalona.otf`).fontSize(25)
    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image(`${__dirname}/assets/plantilla.png`,0,0,{width:842});
    
    doc.fontSize(60).text(`${newString[newString.length - 1]}`,20,265,{align:"center"})
    
    doc.end()
    
    
  }
  export class compressIntereFolder{
    
    static nickNameProject: string ;
    static async main(){
      await zip(`${__dirname}/projects/${this.nickNameProject}`,`${__dirname}/projects/${this.nickNameProject}.zip`,{compression:COMPRESSION_LEVEL.high})
    }

  }
