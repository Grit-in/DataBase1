
const mongoose = require("mongoose")
var a = mongoose.Schema({

   
   
     
      brend: {
        type: String
        ,required:true
      },
      model: {
        type: String
        ,required:true
      },
      phoneImage: {
        type: String
        ,required:true
      },
      cena: {
        type: Number
        ,required:true
      },
      datum_izlaska: {
        type: String
        ,required:true
      },
      Snaga_brzog_punjaca: {
        type: String
        ,required:true
      },
      ekran: {
        type: Number,
        required:true
      },
      rezolucija: {
        type: String,
        required:true
      },
      Operativni_sistem: {
        type: String,
        required:true
      },
      procesor: {
        type: String,
        required:true
      },
      boje:[String],
      
      osvezavanje: {
        type: String,
        required:true
      },
      WiFi: {
        type: String,
        required:true
      },
      Bluetooth: {
        type: String,
        required:true
      },
      broj_jezgara_procesora: {
        type: Number,
        required:true
      },
      rom:[Number],
          
      ram: {
        type: Number,
        required:true 
      },
      Zadnja_kamera: {
        type: Number,
        required:true
      },
      Prednja_kamera: {
        type: String,
        required:true
      },
      baterija: {
        type: String,
        required:true
      },
      iframe: {
        type: String,
        required:true
      },
      ocene:{
        type:[Number],
        default:[5],
        required:true
      },
      komentari:[{
        name: {
          type: String,
          required:true
        },
        tekst: {
          type: String,
          required:true
        },
        likes: {
          type: String,
          default:0,
          required:true
        },
        dislikes: {
          type: String,
          default:0,
          required:true
        },
        ocena:{
            type:Number,
            default:5,
            required:true
        },
        replies:[{
          name: {
            type: String,
            required:true
          },
          tekst: {
            type: String,
            required:true
          }

        }]
      }]
            
            
              
     }
    
)
module.exports = mongoose.model("telefon",a,"baza_telefona")
  
