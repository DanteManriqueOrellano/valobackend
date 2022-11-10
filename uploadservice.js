var Service = require('node-windows').Service;

var svc = new Service({
  name: 'aaquaperuapi.com',
  description: 'api de aquaperu.com.pe .',
  script: 'C:\\Program Files\\iisnode\\www\\api\\main.js',
  execPath: 'C:\\Program Files\\nodejs\\node.exe',
  
});
svc.on('install', function () {
  svc.start();
  console.log('The service exists?: ',svc.exists);
});
svc.install();
