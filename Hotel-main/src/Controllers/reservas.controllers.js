
const productos = require('./data/Productos.json')
const habitaciones = require('./data/Habitaciones.json')
const reservas = require("./data/Reservas.json")
//const reservaProdu = require('./data/Reservas.json')
const funcion = require('../help/funciones')
const clientes = require('./data/clientes.json')

const {Reservas} = require('../db/models')
const {Habitaciones} = require('../db/models')
const {Clientes} = require("../db/models")
//const {ReservaProdus} = require('../db/models')
const {Productos} = require("../db/models")
const { DATE, Model, Association } = require("sequelize")







Habitaciones.hasOne(Reservas,{
    foreignKey:"Habitacion",
    //sourcekey:"id"
});

Reservas.belongsTo(Habitaciones,{
   foreignKey:"Habitacion",
//   targetKey:"Habitacion" 
});

Clientes.hasOne(Reservas,{
    foreignKey:"dni",
    sourcekey:"dni"
});

Reservas.belongsTo(Clientes,{
    foreignKey:"dni",
    targetKey:"dni" 
});


Productos.hasOne(ReservaProdus,{
    foreignKey:"id",
    //sourcekey:"idProdu"
});

ReservaProdus.belongsTo(Productos,{
   foreignKey:"idProdu",
   //targetKey:"idProdu" 
});






const totalReservasHab = async (req, res) => {
   
  const datosres = await Reservas.findAll({
    
     include: [{
       model: Habitaciones,
       
       //model : Clientes,
     //   as: 'Habitaciones',
        //srequired: false,
       //attributes: ['Estrella','CantPersonas','Precio'],
     }],
     //include: [{model: Clientes}],
     
  });
  //console.log(datosres);
  if(datosres != null){  
    res.status(200).json(datosres);
  }else{
    res.status(200).json("No existen Reservas");
  }




    //if(reservas.length > 0){  
        
    //    const resultado = reservas.filter(i => funcion.fecha2(i.FechaEgreso)==0 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen reservas activas");
    //    }
        
    //}else{
    //    res.status(200).json("No existen reservas");
    //}
}


const reservasVencidasHab = async (req, res) => {
    
    const datosres = await Reservas.findAll(fecha2(FechaEgreso)==1);
    
    
    
    if(datosres != null){  
        
        //const resultado = reservas.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        //if(resultado.length > 0){
            res.status(200).json("Existen reservas vencidas");
        //}else{
        //    res.status(200).json("No existen reservas vencidas");
        //}
        
    }else{
        res.status(200).json("No existen reservas");
    }
}





const crearReservarHabi =  async (req, res) => {
    const data = req.body
    //const habRes = req.params.id;
    const habRes = req.body.Habitacion
    //const habRes = req.body.Habitacion;
    const reservada = await Reservas.findOne({where: {Habitacion:habRes}})
    setTimeout(()=>{},1000);
    const existehabi = await Habitaciones.findOne({where: {id:habRes}})
    setTimeout(()=>{},1000);
    const existecli = await Clientes.findOne({where: {dni:data.dni}})
    setTimeout(()=>{},1000); 
    
    
    //const indice = habitaciones.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    


    //if(reservada == null || existehabi ==null || existecli ==null){ 
       if(reservada != null){
           res.status(400).json("Habitacion N°" + habRes +" esta reservada");
       }else{
          if(existehabi == null){
              res.status(400).json("Habitacion N°" + habRes +" no existe");
          }else{
       
            if(existecli == null){
               res.status(400).json("Cliente N°" + data.dni +" no existe");
            }else{
                res.status(200).json("Creada reserva habitacion N°:" + habRes );
                const registro = await Reservas.create(data);
            } 
        }  
       }         
        //console.log(reservada);
        //console.log(existehabi);
        
       //if(habitaciones[indice].Habilitado == false){
       //   res.status(400).json("Habitacion N°:" + habRes + " ya esta reservada");     
       //}else{ 
         //if(habitaciones[indice].CantPersonas >= data.CantPersonas){

         //   const nres = reservas.map(i => i.id);
         //   if(reservas.length == 0){
         //       var maxi = 1;
         //   }else{
         //      maxi = Math.max(...nres) + 1;
         //   }   
         //      const fecha = new Date;
         //      const dia = fecha.getDate();
         //      const mes = fecha.getMonth() + 1;
         //      const ano = fecha.getFullYear();
         //      const hoy = ano + "/" + mes + "/" + dia;
               
                
         //      const reserva = {
         //       "id": maxi,
         //       "dni": data.dni,
         //       "Habitacion": habitaciones[indice].id,
         //       "Estrellas": habitaciones[indice].Estrellas,
         //       "CantPersonas": data.CantPersonas,
         //       "FechaIngreso": ano + "/" + mes + "/" + dia,
         //       "cantDias": data.cantDias,
         //       "FechaEgreso": funcion.acumulaDia(hoy,data.cantDias), 
         //       "Precio": data.cantDias * habitaciones[indice].Precio
         //   }
         //       habitaciones[indice].Habilitado = false;
         //       reservas.push(reserva);
         //       res.status(200).json("Creada reserva N°:" + maxi);
        // }
        // else{res.status(400).json("Cantidad de personas supera capacidad habitación N°" + habRes);}        
        //}     
    //}else{
        //res.status(200).json("Creada reserva habitacion N°:" + habRes );
        //const registro = await Reservas.create(data);
        //    if(existehabi == null ){res.status(400).json("Habitacion N°" + habRes +" no existe");}
        //if(reservada != null ){res.status(400).json("Habitacion N°" + habRes +" esta reservada");}
    //    if(existecli == null ){res.status(400).json("No existe cliente dni n°:" + data.dni);}
    //}       
}






const borrarReservaHab = async (req,res) => {
    const idx = req.params.id;
    
    const reservada = await Reservas.findOne({where: {id:idx}})
    setTimeout(()=>{},1000);

    //const indice = reservas.findIndex(i => i.id == idx)
       if(reservada == null){
          res.status(400).json("Reserva N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        //const resultado = reservas.splice(indice,1);
        const modi = await Habitaciones.findOne({where: {id:reservada.Habitacion}})
        const modi2 =  Habitaciones.update({Habilitado:true},{where:{id:reservada.Habitacion}} )
        //modi.update({where: {habilitado:true}});
        setTimeout(()=>{},1000);
        const registro = await Reservas.destroy({where: {id:idx}})
        setTimeout(()=>{},1000);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   
       

}


const modiReservaHab = async(req, res) => {
    const idx = req.params.id;
    const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx)
    const reservada = await Reservas.findOne({where: {id:idx}})
    setTimeout(()=>{},1000);
       if(reservada != null){
        const habi2 =  await Habitaciones.findOne({where: {id:data.Habitacion}})
        setTimeout(()=>{},1000);   
        
        if(habi2.Habilitado == true){
            
            fecha = reservada.FechaIngreso;
               const reserby = {
                   "dni": data.dni,
                   "Habitacion": data.Habitacion,
                   //"Estrellas": reservada.Estrellas,
                   "CantPersonas": reservada.CantPersonas,
                   "FechaIngreso": reservada.FechaIngreso,
                   "FechaIngreso": fecha,
                   "CantDias": data.CantDias,
                   "FechaEgreso": funcion.acumulaDia(data.FechaEgreso,data.CantDias), 
                   "Precio": data.CantDias * habi2.Precio
               }
               console.log(funcion.acumulaDia(data.FechaEgreso,data.CantDias))
               //const modi2 =  await Reservas.update({dni: data.dni},{where:{id:reservada.Habitacion}} )
               //setTimeout(()=>{},1000); 
               const modi3 =  Reservas.update(reserby,{where:{Habitacion:reservada.Habitacion}} )
               setTimeout(()=>{},1000); 
               //, Habitacion: data.Habitacion,Estrellas: reservada.Estrellas,
               //CantPersonas: reservada.CantPersonas,
               //FechaIngreso: reservada.FechaIngreso,
               //CantDias: data.CantDias,
               //FechaEgreso: reserby.FechaEgreso, 
               //Precio: reserby.Precio},{where:{id:reservada.Habitacion}} )
                         
           //const egre = reservas[indice].FechaEgreso;
           //reservas[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
           //reservas[indice].cantDias = reservas[indice].cantDias + data.cantDias;
           //reservas[indice].Precio = reservas[indice].cantDias * habitaciones[reservas[indice].Habitacion-1].Precio;
           res.status(200).json(reserby);
        }else{
          res.status(200).json("Habitacion n°"+habi2.id+" reservada");  
        }

       }
       else{
          res.status(400).json("No existe la reserva N°:" + idx);
       }
}






const totalReservasProdu = async (req, res) => {
    const datosres2 = await ReservaProdus.findAll({
        include: [{
            model: Productos,
        }],    
    });
    
    if(datosres2 != ""){  
      res.status(200).json(datosres2);
    }else{
      res.status(200).json("No existen Reservas de Productos");
    }





    //if(reservaProdu.length > 0){  
        
    //    const resultado = reservaProdu.filter(i => funcion.fecha2(i.FechaReserva)==0 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen reservas activas");
    //    }
        
    //}else{
    //    res.status(200).json("No existen reservas");
    //}
}

const reservasVencidasProdu = async(req, res) => {

       const datosres = await ReservaProdus.findAll(fecha2(FechaReserva)==1);
        
        
        
        if(datosres != null){  
            
            //const resultado = reservas.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
            //if(resultado.length > 0){
                res.status(200).json("Existen reservas vencidas");
            //}else{
            //    res.status(200).json("No existen reservas vencidas");
            //}
            
        }else{
            res.status(200).json("No existen reservas vencidas");
        }
    


    //if(reservaProdu.length > 0){  
    //    const resultado = reservaProdu.filter(i => funcion.fecha2(i.FechaReserva)==1 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen reservas vencidas");
    //    }
        
    //}else{
    //    res.status(200).json("No existen reservas");
    //}
}


const borrarReservaProdu = async(req, res) => {
    
    
    const idx = req.params.id;
    
    const reservada = await ReservaProdus.findOne({where: {id:idx}})
    setTimeout(()=>{},1000);
    console.log(idx)
    //const indice = reservas.findIndex(i => i.id == idx)
       if(reservada == null){
          res.status(400).json("Reserva N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        //const resultado = reservas.splice(indice,1);
        //const modi = await Habitaciones.findOne({where: {id:reservada.Habitacion}})
        //const modi2 =  Habitaciones.update({Habilitado:true},{where:{id:reservada.Habitacion}} )
        //modi.update({where: {habilitado:true}});
        //setTimeout(()=>{},1000);
        const registro = await ReservaProdus.destroy({where: {id:idx}})
        setTimeout(()=>{},1000);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   
       
    
    
    
    
    
    
    
    
    //const idx = req.params.id;

    //const indice = reservaProdu.findIndex(i => i.id == idx)
      // if(indice < 0){
      //    res.status(400).json("Reserva N°:" + idx + " no existe")
      // }else{  
       // const resultado = reservaProdu.splice(indice,1);
       //   res.status(200).json("Se eliminó la reserva N°: " + idx);
       //}   


}


const modiReservaProd = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = reservaProduseservaProdu.findIndex(i => i.id == idx)
       if(indice >=0){
           const egre = reservaProdu[indice].FechaReserva;
           reservaProdu[indice].FechaReserva = data.FechaReserva;
           reservaProdu[indice].CantPersonas = data.CantPersonas;
           reservaProdu[indice].Precio = reservaProdu[indice].CantPersonas * productos[reservaProdu[indice].idProdu-1].Precio;
           res.status(200).json(reservaProdu[indice]);
       }
       else{
          res.status(400).json("No existe la reserva N°:" + idx);
       }
}




module.exports = {modiReservaHab, borrarReservaHab, crearReservarHabi, reservasVencidasHab, totalReservasHab, totalReservasProdu, reservasVencidasProdu, borrarReservaProdu, modiReservaProd}