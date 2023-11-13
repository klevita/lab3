/* eslint-disable quotes, no-console */
/**
 * @source https://blog.logrocket.com/build-deploy-vue-js-app-github-pages/
 * @modified by https://github.com/dazecoop/github-page-deploy
 */

// UPDATE THE FOLLOWING TO YOUR PROJECT NAME WITHIN GITHUB
// eg https://dazecoop.github.io/PROJECT_NAME/ <- This bit

const execa = require('execa');
const fs = require('fs');

// List of files, regex find & replaces to perform for Github pages

(async () => {
  try {
    // Perform file replaces in prep for GitHub page deploy

    await execa('git', ['checkout', '--orphan', 'gh-pages']);
    // eslint-disable-next-line no-console
    console.log('Building started...');
    await execa('npm', ['run', 'build']);
    // Understand if it's dist or build folder
    const folderName = fs.existsSync('dist') ? 'dist' : 'build';
    await execa('git', ['--work-tree', folderName, 'add', '--all']);
    await execa('git', ['--work-tree', folderName, 'commit', '-m', 'gh-pages']);
    console.log('Pushing to gh-pages...');
    await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
    await execa('git', ['checkout', '-f', 'master']);
    await execa('git', ['branch', '-D', 'gh-pages']);

    // Revert file replaces that we did earlier


    console.log('Successfully deployed, check your settings');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();