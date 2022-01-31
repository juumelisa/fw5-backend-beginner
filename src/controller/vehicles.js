const vehicleModel = require('../models/vehicles');

const getVehicles = (req, res)=>{
  vehicleModel.getVehicles(results=>{
    return res.json({
      success: true,
      message: 'List of Vehicles',
      results : results
    });

  });
};

const getVehicle = (req,res)=>{
  const {id} = req.params;
  vehicleModel.getVehicle(id, results=>{
    if(results.length>0){
      return res.json({
        success: true,
        message: 'Vehicle details',
        results: results[0]
      });
    }else{
      return res.status(404).send({
        success: false,
        message: 'Vehicle not found'
      });
    }
  });
};

const addVehicle = (req,res)=>{
  const data = [req.body.name, req.body.year, req.body.cost, req.body.available, req.body.type, req.body.seat, req.body.class, req.body.location];
  vehicleModel.checkVehicle(data[0], result=>{
    let isThere = 0;
    if(result.length>0){
      result.forEach(element=>{
        if(element.year===req.body.year && element.type===req.body.type && element.location===req.body.location){
          isThere++;
        }
      });
    }
    if(isThere==0){
      vehicleModel.addVehicle(data, results=>{
        return res.send({
          success: true,
          message: 'Success add vehicle',
          results: `Rows affected: ${results.affectedRows}`
        });
      });
    }else{
      return res.status(400).send({
        success: false,
        message: 'Vehicle already on the list'
      });
    }
  });
};

const updateVehicle = (req, res)=>{
  const {id} = req.params;
  const data = [req.body.name, req.body.year, req.body.cost, req.body.available, req.body.seat, req.body.type, req.body.class, req.body.location, id];
  vehicleModel.getVehicle(id, results=>{
    if(results.length>0){
      vehicleModel.checkVehicle(data[0], result=>{
        let yesThere = 0;
        if(result.length>0){
          result.forEach(element=>{
            if(element.year===req.body.year && element.type===req.body.type && element.location===req.body.location){
              if(element.id==req.params.id){
                yesThere = 0;
              }else{
                yesThere++;
              }
            }
            console.log(element);
          });
        }
        if(yesThere==0){
          vehicleModel.updateVehicle(data, result=>{
            return res.send({
              success: true,
              message: 'Success update vehicle',
              result: `Rows affected: ${result.affectedRows}`
            });
          });
        }else{
          return res.status(400).send({
            success: false,
            message: 'Vehicle already on the list'
          });
        }
      });
    }else{
      return res.status(404).send({
        success: false,
        message: 'Vehicle not found'
      });
    }
  });
};

const deleteVehicle = (req, res)=>{
  const {id} = req.params;
  vehicleModel.getVehicle(id, results=>{
    if(results.length>0){
      vehicleModel.deleteVehicle(id, result=>{
        return res.send({
          success: true,
          message: 'Deleted',
          result: `Affected ROows ${result.affectedRows}`
        });
      });
    }else{
      return res.status(404).send({
        success: false,
        message: 'Vehicle not found'
      });
    }
  });
};

module.exports = {getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle};