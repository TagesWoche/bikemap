const { deploy } = require('sftp-sync-deploy');
 
let config = {
  host: 'c160s.freistilbox.net',            // Required.
  username: 's1996',               // Required.
  privateKey: 'Users/felix/.ssh/palasthotel', // Optional.
  localDir: 'dist',               // Required, Absolute or relative to cwd.
  remoteDir: '/glfs/fbsites/c11000/s1996/shared/public/docroot/2018/bikemap'      // Required, Absolute path only.
};
 
let options = {
  dryRun: false,                  // Enable dry-run mode. Default to false
  exclude: [                      // exclude patterns (glob)
    'node_modules',
    '.DS_Store',
    '**/.DS_Store',
    '**/*.map'
  ],
  excludeMode: 'remove',          // Behavior for excluded files ('remove' or 'ignore'), Default to 'remove'.
  forceUpload: false              // Force uploading all files, Default to false(upload only newer files).
};
 
deploy(config, options).then(() => {
  console.log('success!');
}).catch(err => {
  console.error('error! ', err);
});
