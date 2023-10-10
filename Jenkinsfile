pipeline {
    agent {
            label 'git-websites'
    }
    options {
       buildDiscarder(logRotator(numToKeepStr:'6'))
       disableConcurrentBuilds()
       timeout(time:50,unit:'MINUTES')
    }
    stages {
        stage('build Apache NetBeans antora website') {
            steps {
                sh 'rm -rf build'
//
//                sh 'git clone --depth 1 --branch asf-site https://gitbox.apache.org/repos/asf/netbeans-site-pub.git build/site'
//                dir('build/site') {
//                    sh 'git rm -r .'
//                }

                sh 'npm run plain-install'
                sh 'npm run build-noclean'
                zip zipFile:'site.zip', dir:'build/site', archive:'true'
//                dir('build/site') {
//		  sh 'git add .'
//		  sh 'echo `git commit -m "site build"`'
//                  sh 'git push https://gitbox.apache.org/repos/asf/netbeans-site-pub.git asf-site'
//		}
            }
        }
    }
}
