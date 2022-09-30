pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
  }
}
