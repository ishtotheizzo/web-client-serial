var rigPrefix = "mixamorig";

function calibrate()
{
    var keys = Object.keys(mac2Bones);
    for(var i = 0; i < keys.length; i++){
      mac2Bones[keys[i]].calibration.x = mac2Bones[keys[i]].last.x;
      mac2Bones[keys[i]].calibration.y = mac2Bones[keys[i]].last.y;
      mac2Bones[keys[i]].calibration.z = mac2Bones[keys[i]].last.z;
      mac2Bones[keys[i]].calibration.w = mac2Bones[keys[i]].last.w;
      console.log(mac2Bones[keys[i]])
    }
}

function handleWSMessage(obj)
{
      mac2Bones[obj.id].last.x = obj.x;
      mac2Bones[obj.id].last.y = obj.y;
      mac2Bones[obj.id].last.z = obj.z;
      mac2Bones[obj.id].last.w = obj.w;
      var bone = mac2Bones[obj.id].id;
      var x = model.getObjectByName(rigPrefix + bone);
      var q = new Quaternion(obj.x, obj.y, obj.z, obj.w);
      var qC = new Quaternion(mac2Bones[obj.id].calibration.x,mac2Bones[obj.id].calibration.y,mac2Bones[obj.id].calibration.z,mac2Bones[obj.id].calibration.w).inverse()
      var qR = q.mul(qC);
      var qF;


      switch(bone){
        case 'LeftArm':
          qF = qR;
          x.quaternion.set(-qF.y, qF.x, -qF.z, qF.w);
          break;
       
        case 'LeftForeArm':
         // console.log(bone, obj,qR);
         /*
          var q = new Quaternion(qR.x, qR.y, qR.z, qR.w);
          var qC = new Quaternion(mac2Bones["LeftArm"].actual.x,mac2Bones["LeftArm"].actual.y,mac2Bones["LeftArm"].actual.z,mac2Bones["LeftArm"].calibration.w).inverse()
          qF = q.mul(qC);
          */
          qF = qR;
          x.quaternion.set(qF.z, -qF.x, qF.y, qF.w);
          break;
       
        default:
         qF = qR;
         x.quaternion.set(qF.y, -qF.x, -qF.z, qF.w);
         break;
      }
      mac2Bones[obj.id].actual.x = qF.x;
      mac2Bones[obj.id].actual.y = qF.y;
      mac2Bones[obj.id].actual.z = qF.z;
      mac2Bones[obj.id].actual.w = qF.w;
}
