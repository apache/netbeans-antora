pipeline {
    agent {
            label 'git-websites'
    }
    options {
       buildDiscarder(logRotator(numToKeepStr:'2'))
       disableConcurrentBuilds()
       timeout(time:50,unit:'MINUTES')
    }
    stages {
        stage('build Apache NetBeans antora website') {
            steps {
                sh 'rm -rf build'

                sh 'git clone --depth 1 --branch asf-site https://github.com/apache/netbeans-website.git build/site'
                dir('build/site') {
	            //sh 'git checkout antora'		
		    sh 'git status'
                    sh 'git rm -r . --ignore-unmatch'
                }
                sh 'rm -rf uibuild'
                sh 'git clone --depth 1  https://github.com/apache/netbeans-antora-ui.git uibuild'
                dir('uibuild') {
	            // prepare folder		
		    sh 'mkdir -p public/_'
                    sh 'npm --cache=.cache/npm install '
                    sh 'npm --cache=.cache/npm run gulp -- bundle'
                }
                sh 'npm run clean-install'
                sh 'npm run build-noclean'
                dir('build/site') {
		  sh 'git add .'
		  sh 'echo `git commit -m "site build"`'
                  sh 'git status'
				  sh 'git config --local http.postBuffer 157286400'
                  sh 'git push https://gitbox.apache.org/repos/asf/netbeans-website.git asf-site'
		}
            }
        }
    }
	post {
            cleanup {
                cleanWs()
            }
            success {
                slackSend (channel:'#netbeans-builds', message:"SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) ",color:'good')
            }
            unstable {
                slackSend (channel:'#netbeans-builds', message:"UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) ",color:'warning')
            }
            failure {
                slackSend (channel:'#netbeans-builds', message:"FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'  (${env.BUILD_URL})",color:'danger')
            }

        }
}
