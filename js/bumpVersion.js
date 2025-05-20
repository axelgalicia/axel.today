const fs = require('node:fs');
const path = require('node:path');

const versionFilePath = path.join(__dirname, 'version.json');

function bumpVersion(type) {
  const versionData = JSON.parse(fs.readFileSync(versionFilePath, 'utf8'));
  const [major, minor, patch] = versionData.version.split('.').map(Number);

  let newVersion;
  switch (type) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    default:
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
  }

  versionData.version = newVersion;
  versionData.lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2));
  console.log(`Version bumped to ${newVersion}`);
}

const type = process.argv[2] || 'patch';
bumpVersion(type);