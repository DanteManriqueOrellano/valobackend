var Service = require('node-windows').Service;

var svc = new Service({
  name: 'aaquaperuapi.com',
  description: 'api de aquaperu.com.pe .',
  script: 'D:\\sistema documentario\\main.js',
  execPath: 'C:\\Program Files\\nodejs\\node.exe',
  
});
svc.on('install', function () {
  svc.start();
  console.log('The service exists?: ',svc.exists);
});
svc.install();
