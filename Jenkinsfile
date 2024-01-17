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

                sh 'git clone --depth 1 --branch asf-site https://gitbox.apache.org/repos/asf/netbeans-website.git build/site'
                dir('build/site') {
	            //sh 'git checkout antora'		
		    sh 'git status'
                    sh 'git rm -r . --ignore-unmatch'
                }
                sh 'rm -rf uibuild'
                sh 'git clone --depth 1  https://github.com/main/netbeans-antora-ui.git uibuild'
                dir('uibuild') {
                    sh 'npm --cache=.cache/npm install '
                    sh 'npm --cache=.cache/npm run gulp -- bundle'
                }
                sh 'npm run clean-install'
                sh 'npm run build-noclean'
                dir('build/site') {
		  sh 'git add .'
		  sh 'echo `git commit -m "site build"`'
                  sh 'git status'			  
                  sh 'git push https://gitbox.apache.org/repos/asf/netbeans-website.git asf-site'
		}
            }
        }
    }
}
